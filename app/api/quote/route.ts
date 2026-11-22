import { NextResponse } from "next/server";
import { quoteRequestSchema } from "@/lib/api-schemas";
import { isSmtpConfigured, sendStudioEmail } from "@/lib/mailer";
import { checkRateLimit, escapeHtml, getClientIp } from "@/lib/security";

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rateLimit = checkRateLimit(`quote:${ip}`, {
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

  const parsed = quoteRequestSchema.safeParse(rawBody);
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
          "Service d'envoi de devis temporairement indisponible. Merci de nous contacter directement par email ou téléphone.",
      },
      { status: 503 }
    );
  }

  const data = parsed.data;

  try {
    await sendStudioEmail({
      replyTo: data.email,
      subject: `Nouvelle demande de devis - ${data.first_name} ${data.last_name}`,
      html: `
        <h1>Nouvelle demande de devis</h1>

        <h2>Informations personnelles</h2>
        <p><strong>Prénom :</strong> ${escapeHtml(data.first_name)}</p>
        <p><strong>Nom :</strong> ${escapeHtml(data.last_name)}</p>
        <p><strong>Email :</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Téléphone :</strong> ${escapeHtml(data.phone)}</p>
        ${data.company_name ? `<p><strong>Entreprise :</strong> ${escapeHtml(data.company_name)}</p>` : ""}
        ${data.job_title ? `<p><strong>Poste :</strong> ${escapeHtml(data.job_title)}</p>` : ""}

        <h2>Détails du projet</h2>
        <p><strong>Service demandé :</strong> ${escapeHtml(data.service)}</p>
        <p><strong>Type de projet :</strong> ${escapeHtml(data.project_type)}</p>
        <p><strong>Budget estimé :</strong> ${escapeHtml(data.budget_range)}</p>
        <p><strong>Délai souhaité :</strong> ${escapeHtml(data.timeline)}</p>

        <h2>Description du projet</h2>
        <p>${escapeHtml(data.project_description).replace(/\n/g, "<br/>")}</p>

        ${data.features
          ? `<h2>Fonctionnalités spécifiques</h2><p>${escapeHtml(data.features).replace(/\n/g, "<br/>")}</p>`
          : ""
        }

        ${data.additional_info
          ? `<h2>Informations complémentaires</h2><p>${escapeHtml(data.additional_info).replace(/\n/g, "<br/>")}</p>`
          : ""
        }

        <p><strong>Conditions acceptées :</strong> Oui</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Demande de devis envoyée avec succès",
    });
  } catch (error) {
    console.error("Quote email send error:", error);
    return NextResponse.json(
      { success: false, error: "Erreur lors de l'envoi de la demande" },
      { status: 500 }
    );
  }
}
