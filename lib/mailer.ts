import * as fs from "fs";
import * as path from "path";
import nodemailer from "nodemailer";
import { sanitizeHeaderValue } from "./security";
import { siteConfig } from "./seo";

function stripSurroundingQuotes(value: string): string {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

/**
 * Reads `.env.local` in development when the running dev server hasn't picked up recent edits yet.
 */
function readDevEnvLocal(): Record<string, string> {
  if (process.env.NODE_ENV === "production") {
    return {};
  }
  try {
    const envPath = path.join(process.cwd(), ".env.local");
    if (!fs.existsSync(envPath)) {
      return {};
    }
    const raw = fs.readFileSync(envPath, "utf8").replace(/^\uFEFF/, "");
    const parsed: Record<string, string> = {};
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) {
        continue;
      }
      const key = trimmed.slice(0, eqIdx).trim();
      const val = stripSurroundingQuotes(trimmed.slice(eqIdx + 1).trim());
      if (key) {
        parsed[key] = val;
      }
    }
    return parsed;
  } catch {
    return {};
  }
}

function readSmtpConfig() {
  const hasEnvUser = Boolean(process.env.SMTP_USER?.trim());
  const hasEnvPass = Boolean(
    process.env.SMTP_PASSWORD?.trim() || process.env.SMTP_PASS?.trim()
  );
  const devFallback = !hasEnvUser || !hasEnvPass ? readDevEnvLocal() : {};

  const readVar = (key: string): string =>
    process.env[key]?.trim() || devFallback[key]?.trim() || "";

  const host = readVar("SMTP_HOST") || "smtp.gmail.com";
  const parsedPort = Number.parseInt(readVar("SMTP_PORT") || "465", 10);
  const port = Number.isFinite(parsedPort) && parsedPort > 0 ? parsedPort : 465;
  const secureEnv = readVar("SMTP_SECURE").toLowerCase();
  const secure =
    secureEnv === "true" ? true : secureEnv === "false" ? false : port === 465;

  const user = readVar("SMTP_USER");
  const pass = readVar("SMTP_PASSWORD") || readVar("SMTP_PASS");
  const defaultTo = readVar("SMTP_TO") || siteConfig.contact.email;

  return { host, port, secure, user, pass, defaultTo };
}

/**
 * Returns true when SMTP credentials are available (env vars or `.env.local` in dev).
 */
export function isSmtpConfigured(): boolean {
  const { user, pass } = readSmtpConfig();
  return Boolean(user && pass);
}

/**
 * Returns the primary studio email recipient configured for incoming forms.
 */
export function getStudioRecipientEmail(): string {
  return readSmtpConfig().defaultTo;
}

export interface StudioEmailOptions {
  to?: string;
  replyTo?: string;
  subject: string;
  html: string;
  attachments?: Array<{ filename: string; content: string }>;
}

/**
 * Sends an email through the configured SMTP transport without hardcoded credentials.
 */
export async function sendStudioEmail(options: StudioEmailOptions): Promise<void> {
  const { host, port, secure, user, pass, defaultTo } = readSmtpConfig();

  if (!user || !pass) {
    throw new Error("SMTP credentials are not configured");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  await transporter.sendMail({
    from: `"digitalpro solutions" <${sanitizeHeaderValue(user)}>`,
    to: sanitizeHeaderValue(options.to ?? defaultTo),
    replyTo: options.replyTo ? sanitizeHeaderValue(options.replyTo) : undefined,
    subject: sanitizeHeaderValue(options.subject),
    html: options.html,
    attachments: options.attachments,
  });
}
