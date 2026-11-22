import { NextResponse } from "next/server";
import { appointmentRequestSchema } from "@/lib/api-schemas";
import { isSmtpConfigured, sendStudioEmail } from "@/lib/mailer";
import { checkRateLimit, escapeHtml, getClientIp } from "@/lib/security";

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rateLimit = checkRateLimit(`appointment:${ip}`, {
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

  const parsed = appointmentRequestSchema.safeParse(rawBody);
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
          "Service de réservation par email temporairement indisponible. Merci de nous contacter directement par téléphone ou email.",
      },
      { status: 503 }
    );
  }

  const data = parsed.data;
  const formattedDate = new Date(`${data.preferred_date}T00:00:00Z`).toLocaleDateString(
    "fr-FR",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }
  );

  try {
    await sendStudioEmail({
      replyTo: data.email,
      subject: `Nouvelle demande de rendez-vous - ${data.first_name} ${data.last_name}`,
      html: `
        <h1>Nouvelle demande de rendez-vous</h1>
        <h2>Informations personnelles</h2>
        <p><strong>Prénom :</strong> ${escapeHtml(data.first_name)}</p>
        <p><strong>Nom :</strong> ${escapeHtml(data.last_name)}</p>
        <p><strong>Email :</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Téléphone :</strong> ${escapeHtml(data.phone)}</p>
        ${data.company_name ? `<p><strong>Entreprise :</strong> ${escapeHtml(data.company_name)}</p>` : ""}

        <h2>Détails du rendez-vous</h2>
        <p><strong>Service :</strong> ${escapeHtml(data.service)}</p>
        <p><strong>Date préférée :</strong> ${escapeHtml(formattedDate)}</p>
        <p><strong>Heure préférée :</strong> ${escapeHtml(data.preferred_time)}</p>
        ${data.message ? `<p><strong>Message :</strong> ${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>` : ""}
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Demande de rendez-vous envoyée avec succès",
    });
  } catch (error) {
    console.error("Appointment email send error:", error);
    return NextResponse.json(
      { success: false, error: "Erreur lors de l'envoi de la demande" },
      { status: 500 }
    );
  }
}
