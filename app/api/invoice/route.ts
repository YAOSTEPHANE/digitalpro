import { NextRequest, NextResponse } from "next/server";
import { invoiceRequestSchema } from "@/lib/api-schemas";
import { isSmtpConfigured, sendStudioEmail } from "@/lib/mailer";
import { checkRateLimit, escapeHtml, getClientIp } from "@/lib/security";

interface NormalizedInvoice {
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  clientAddress?: string;
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountRate: number;
  discountAmount: number;
  total: number;
  dueDate?: string;
  notes?: string;
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(`invoice:${ip}`, {
    limit: 10,
    windowMs: 10 * 60_000,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Trop de requêtes. Veuillez réessayer plus tard." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSec) },
      }
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête JSON invalide" }, { status: 400 });
  }

  const parsed = invoiceRequestSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données manquantes ou invalides", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const input = parsed.data;
  const invoiceNumber = input.invoiceNumber || `INV-${Date.now()}`;
  const normalizedItems = input.items.map((item) => ({
    description: item.description,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    total: Math.round(item.quantity * item.unitPrice),
  }));

  const subtotal = normalizedItems.reduce((sum, item) => sum + item.total, 0);
  const taxRate = input.tax ?? 0;
  const discountRate = input.discount ?? 0;
  const taxAmount = Math.round((subtotal * taxRate) / 100);
  const discountAmount = Math.round((subtotal * discountRate) / 100);
  const total = Math.max(0, subtotal + taxAmount - discountAmount);

  const normalizedInvoice: NormalizedInvoice = {
    invoiceNumber,
    clientName: input.clientName,
    clientEmail: input.clientEmail,
    clientPhone: input.clientPhone,
    clientAddress: input.clientAddress,
    items: normalizedItems,
    subtotal,
    taxRate,
    taxAmount,
    discountRate,
    discountAmount,
    total,
    dueDate: input.dueDate,
    notes: input.notes,
  };

  const invoiceHTML = generateInvoiceHTML(normalizedInvoice);

  let clientEmailSent = false;
  if (isSmtpConfigured()) {
    const configuredSecret = process.env.INVOICE_EMAIL_SECRET?.trim();
    const providedToken = request.headers.get("x-invoice-token")?.trim();
    const allowExternalClientEmail = Boolean(
      configuredSecret && providedToken && providedToken === configuredSecret
    );

    try {
      if (allowExternalClientEmail) {
        await sendStudioEmail({
          to: normalizedInvoice.clientEmail,
          subject: `Facture ${invoiceNumber} - digitalpro solutions`,
          html: invoiceHTML,
          attachments: [
            {
              filename: `facture-${invoiceNumber}.html`,
              content: invoiceHTML,
            },
          ],
        });
        clientEmailSent = true;
      }

      await sendStudioEmail({
        subject: `Nouvelle facture générée : ${invoiceNumber}`,
        html: `
          <h2>Nouvelle facture générée</h2>
          <p><strong>Numéro :</strong> ${escapeHtml(invoiceNumber)}</p>
          <p><strong>Client :</strong> ${escapeHtml(normalizedInvoice.clientName)}</p>
          <p><strong>Email :</strong> ${escapeHtml(normalizedInvoice.clientEmail)}</p>
          <p><strong>Total :</strong> ${total.toLocaleString("fr-FR")} FCFA</p>
        `,
        attachments: [
          {
            filename: `facture-${invoiceNumber}.html`,
            content: invoiceHTML,
          },
        ],
      });
    } catch (emailError) {
      console.error("Erreur lors de l'envoi de la facture:", emailError);
    }
  }

  return NextResponse.json({
    success: true,
    invoiceNumber,
    clientEmailSent,
    message: clientEmailSent
      ? "Facture générée et envoyée au client avec succès"
      : isSmtpConfigured()
        ? "Facture générée et transmise au studio avec succès"
        : "Facture générée avec succès (prête au téléchargement)",
    invoiceHTML,
  });
}

function formatOptionalDate(rawDate?: string): string {
  if (!rawDate) return "";
  const parsed = new Date(rawDate);
  if (Number.isNaN(parsed.getTime())) {
    return rawDate;
  }
  return parsed.toLocaleDateString("fr-FR");
}

function generateInvoiceHTML(data: NormalizedInvoice): string {
  const formattedDueDate = formatOptionalDate(data.dueDate);

  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #0f172a;
          max-width: 800px;
          margin: 0 auto;
          padding: 24px;
        }
        .header {
          border-bottom: 3px solid #516699;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #516699;
        }
        .badge-accent {
          display: inline-block;
          margin-top: 6px;
          font-size: 11px;
          font-weight: bold;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #CC2628;
        }
        .invoice-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
        }
        .client-info, .company-info {
          flex: 1;
        }
        .client-info {
          margin-right: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #e2e8f0;
        }
        th {
          background-color: #f7f9fc;
          font-weight: bold;
          color: #0f172a;
        }
        .totals {
          margin-top: 20px;
          text-align: right;
        }
        .total-row {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 10px;
        }
        .total-label {
          width: 160px;
          text-align: right;
          margin-right: 20px;
        }
        .total-value {
          width: 160px;
          text-align: right;
          font-weight: bold;
        }
        .grand-total {
          font-size: 20px;
          color: #516699;
          border-top: 2px solid #516699;
          padding-top: 10px;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
          text-align: center;
          color: #475569;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">digitalpro solutions</div>
        <div class="badge-accent">Studio d'ingénierie digitale</div>
        <h1>FACTURE</h1>
        <p><strong>Numéro :</strong> ${escapeHtml(data.invoiceNumber)}</p>
        <p><strong>Date :</strong> ${new Date().toLocaleDateString("fr-FR")}</p>
        ${formattedDueDate ? `<p><strong>Date d'échéance :</strong> ${escapeHtml(formattedDueDate)}</p>` : ""}
      </div>

      <div class="invoice-info">
        <div class="client-info">
          <h3>Facturé à :</h3>
          <p><strong>${escapeHtml(data.clientName)}</strong></p>
          ${data.clientEmail ? `<p>${escapeHtml(data.clientEmail)}</p>` : ""}
          ${data.clientPhone ? `<p>${escapeHtml(data.clientPhone)}</p>` : ""}
          ${data.clientAddress ? `<p>${escapeHtml(data.clientAddress)}</p>` : ""}
        </div>
        <div class="company-info">
          <h3>digitalpro solutions</h3>
          <p>Bvd Koffi Gadaud, Cocody</p>
          <p>Abidjan, Côte d'Ivoire</p>
          <p>Email : digitalprosolutions27@gmail.com</p>
          <p>Tél : +225 07 48 97 60 31</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantité</th>
            <th>Prix unitaire</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${data.items
            .map(
              (item) => `
            <tr>
              <td>${escapeHtml(item.description)}</td>
              <td>${item.quantity}</td>
              <td>${item.unitPrice.toLocaleString("fr-FR")} FCFA</td>
              <td>${item.total.toLocaleString("fr-FR")} FCFA</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>

      <div class="totals">
        <div class="total-row">
          <span class="total-label">Sous-total :</span>
          <span class="total-value">${data.subtotal.toLocaleString("fr-FR")} FCFA</span>
        </div>
        ${
          data.taxRate
            ? `
          <div class="total-row">
            <span class="total-label">TVA (${data.taxRate}%) :</span>
            <span class="total-value">${data.taxAmount.toLocaleString("fr-FR")} FCFA</span>
          </div>
        `
            : ""
        }
        ${
          data.discountRate
            ? `
          <div class="total-row">
            <span class="total-label">Remise (${data.discountRate}%) :</span>
            <span class="total-value">-${data.discountAmount.toLocaleString("fr-FR")} FCFA</span>
          </div>
        `
            : ""
        }
        <div class="total-row grand-total">
          <span class="total-label">TOTAL :</span>
          <span class="total-value">${data.total.toLocaleString("fr-FR")} FCFA</span>
        </div>
      </div>

      ${
        data.notes
          ? `
        <div style="margin-top: 30px;">
          <h3>Notes :</h3>
          <p>${escapeHtml(data.notes).replace(/\n/g, "<br/>")}</p>
        </div>
      `
          : ""
      }

      <div class="footer">
        <p>Merci pour votre confiance !</p>
        <p>digitalpro solutions — Agence d'intelligence numérique</p>
      </div>
    </body>
    </html>
  `;
}
