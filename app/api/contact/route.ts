import { NextResponse } from "next/server";
import { contactRequestSchema } from "@/lib/api-schemas";
import { isSmtpConfigured, sendStudioEmail } from "@/lib/mailer";
import { checkRateLimit, escapeHtml, getClientIp } from "@/lib/security";

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rateLimit = checkRateLimit(`contact:${ip}`, {
    limit: 5,
    windowMs: 10 * 60_000,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, error: "Trop de requêtes. Veuillez réessayer plus tard." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSec) },
      }
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Corps de requête JSON invalide" },
      { status: 400 }
    );
  }

  const parsed = contactRequestSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Données invalides",
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  if (!isSmtpConfigured()) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Service d'envoi temporairement indisponible. Merci de nous contacter par email ou téléphone.",
      },
      { status: 503 }
    );
  }

  const data = parsed.data;
  const resolvedService = data.service ?? data.services ?? "";
  const resolvedMessage = (data.message ?? data.info ?? "").trim();

  try {
    await sendStudioEmail({
      replyTo: data.email,
      subject: `Nouveau message contact - ${data.first_name} ${data.last_name}`,
      html: `
        <h1>Nouveau message de contact</h1>
        <p><strong>Prénom :</strong> ${escapeHtml(data.first_name)}</p>
        <p><strong>Nom :</strong> ${escapeHtml(data.last_name)}</p>
        <p><strong>Email :</strong> ${escapeHtml(data.email)}</p>
        ${data.phone ? `<p><strong>Téléphone :</strong> ${escapeHtml(data.phone)}</p>` : ""}
        ${data.job_title ? `<p><strong>Poste :</strong> ${escapeHtml(data.job_title)}</p>` : ""}
        ${data.company_name ? `<p><strong>Entreprise :</strong> ${escapeHtml(data.company_name)}</p>` : ""}
        ${resolvedService ? `<p><strong>Service :</strong> ${escapeHtml(resolvedService)}</p>` : ""}
        ${data.help ? `<p><strong>Objet :</strong> ${escapeHtml(data.help)}</p>` : ""}
        <p><strong>Message :</strong></p>
        <p>${escapeHtml(resolvedMessage).replace(/\n/g, "<br/>")}</p>
        <p><strong>Conditions acceptées :</strong> Oui</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Message envoyé avec succès",
    });
  } catch (error) {
    console.error("Contact email send error:", error);
    return NextResponse.json(
      { success: false, error: "Erreur lors de l'envoi du message" },
      { status: 500 }
    );
  }
}
