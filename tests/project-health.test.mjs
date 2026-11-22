import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  checkRateLimit,
  escapeHtml,
  getClientIp,
  resetRateLimitStore,
  sanitizeHeaderValue,
} from "../lib/security.ts";
import {
  appointmentRequestSchema,
  chatRequestSchema,
  contactRequestSchema,
  invoiceRequestSchema,
  quoteRequestSchema,
} from "../lib/api-schemas.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function walkFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(full, out);
    } else {
      out.push(full);
    }
  }
  return out;
}

test("security helpers escape HTML and sanitize headers", () => {
  assert.equal(escapeHtml(null), "");
  assert.equal(escapeHtml(undefined), "");
  assert.equal(
    escapeHtml(`<script>alert("x&'y")</script>`),
    "&lt;script&gt;alert(&quot;x&amp;&#39;y&quot;)&lt;/script&gt;"
  );
  assert.equal(
    sanitizeHeaderValue("Client\r\nBcc: attacker@example.com\n"),
    "Client Bcc: attacker@example.com"
  );

  const req = new Request("https://www.digitalpro-solutions.com/api/contact", {
    headers: { "x-forwarded-for": "203.0.113.10, 10.0.0.1" },
  });
  assert.equal(getClientIp(req), "203.0.113.10");
});

test("rate limiter enforces threshold and resets cleanly", () => {
  resetRateLimitStore();
  const key = "test:127.0.0.1";

  const first = checkRateLimit(key, { limit: 2, windowMs: 60_000 });
  assert.equal(first.allowed, true);
  assert.equal(first.remaining, 1);

  const second = checkRateLimit(key, { limit: 2, windowMs: 60_000 });
  assert.equal(second.allowed, true);
  assert.equal(second.remaining, 0);

  const third = checkRateLimit(key, { limit: 2, windowMs: 60_000 });
  assert.equal(third.allowed, false);
  assert.equal(third.remaining, 0);
  assert.ok(third.retryAfterSec >= 1);

  resetRateLimitStore();
});

test("API Zod schemas accept valid inputs and reject invalid payloads", () => {
  assert.equal(
    contactRequestSchema.safeParse({
      first_name: "Awa",
      last_name: "Kone",
      email: "awa@example.com",
      message: "Bonjour, nous souhaitons refondre notre site vitrine.",
      terms: true,
    }).success,
    true
  );
  assert.equal(
    contactRequestSchema.safeParse({
      first_name: "A",
      last_name: "Kone",
      email: "not-an-email",
      message: "Court",
      terms: false,
    }).success,
    false
  );

  assert.equal(
    appointmentRequestSchema.safeParse({
      first_name: "Kouassi",
      last_name: "Yao",
      email: "yao@example.com",
      phone: "+22507000000",
      service: "Développement de site web",
      preferred_date: "2026-12-01",
      preferred_time: "10:00",
    }).success,
    true
  );
  assert.equal(
    appointmentRequestSchema.safeParse({
      first_name: "Kouassi",
      last_name: "Yao",
      email: "yao@example.com",
      phone: "+22507000000",
      service: "Développement de site web",
      preferred_date: "2026-02-31",
      preferred_time: "10:00",
    }).success,
    false
  );

  assert.equal(
    quoteRequestSchema.safeParse({
      first_name: "Mariam",
      last_name: "Diallo",
      email: "mariam@example.com",
      phone: "+22507000001",
      service: "E-commerce",
      project_type: "Nouveau projet",
      budget_range: "À discuter",
      timeline: "1-3 mois",
      project_description: "Création d'une boutique e-commerce avec paiement Mobile Money.",
      terms: true,
    }).success,
    true
  );

  assert.equal(
    invoiceRequestSchema.safeParse({
      clientName: "Client Test",
      clientEmail: "client@example.com",
      items: [{ description: "Site vitrine", quantity: 1, unitPrice: 200000 }],
    }).success,
    true
  );
  assert.equal(
    invoiceRequestSchema.safeParse({
      clientName: "Client Test",
      clientEmail: "client@example.com",
      items: [{ description: "Invalide", quantity: 1, unitPrice: -10 }],
    }).success,
    false
  );

  assert.equal(chatRequestSchema.safeParse({ message: "Bonjour" }).success, true);
  assert.equal(chatRequestSchema.safeParse({ message: "   " }).success, false);
});

test("API routes contain no hardcoded credentials or typo recipient address", () => {
  const apiFiles = walkFiles(path.join(ROOT, "app", "api"));
  assert.ok(apiFiles.length >= 6);

  for (const file of apiFiles) {
    const content = fs.readFileSync(file, "utf8");
    assert.equal(
      /digitalproslutions/i.test(content),
      false,
      `Found recipient typo in ${file}`
    );
    assert.equal(
      /pass\s*:\s*['"][^'"]+['"]/i.test(content),
      false,
      `Found hardcoded password in ${file}`
    );
  }
});

test("Repository cleanup, optimized logo, and referenced public assets are intact", () => {
  const logoStat = fs.statSync(path.join(ROOT, "public", "logo", "logo.png"));
  assert.ok(
    logoStat.size < 100 * 1024,
    `Expected compressed logo.png under 100 KB, got ${logoStat.size} bytes`
  );

  assert.equal(fs.existsSync(path.join(ROOT, "app", "api", "ia-site")), false);
  assert.equal(fs.existsSync(path.join(ROOT, "erreur.php")), false);
  assert.equal(fs.existsSync(path.join(ROOT, "tailwind.config.ts")), false);

  const nextConfigText = fs.readFileSync(path.join(ROOT, "next.config.ts"), "utf8");
  assert.ok(nextConfigText.includes("outputFileTracingRoot"));
  assert.ok(nextConfigText.includes("headers()"));

  const codeFiles = [
    ...walkFiles(path.join(ROOT, "app")),
    ...walkFiles(path.join(ROOT, "components")),
    ...walkFiles(path.join(ROOT, "lib")),
  ].filter((f) => /\.(ts|tsx)$/.test(f));

  const missingAssets = [];
  for (const file of codeFiles) {
    const content = fs.readFileSync(file, "utf8");
    const matches = content.match(
      /\/(?:images|realisations|demos|logo)\/[A-Za-z0-9_./%-]+\.(?:webp|png|jpe?g|svg|mp4)/g
    );
    if (!matches) continue;
    for (const assetUrl of matches) {
      const rel = decodeURIComponent(assetUrl.slice(1)).replace(/\//g, path.sep);
      if (!fs.existsSync(path.join(ROOT, "public", rel))) {
        missingAssets.push(`${file} -> ${assetUrl}`);
      }
    }
  }
  assert.deepEqual(missingAssets, []);
});
