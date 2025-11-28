import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface InvoiceData {
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
  tax?: number;
  discount?: number;
  total: number;
  dueDate: string;
  notes?: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: InvoiceData = await request.json();

    // Validation
    if (!data.clientName || !data.clientEmail || !data.items || data.items.length === 0) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      );
    }

    // Générer le numéro de facture s'il n'existe pas
    if (!data.invoiceNumber) {
      data.invoiceNumber = `INV-${Date.now()}`;
    }

    // Calculer le total si non fourni
    if (!data.total) {
      const subtotal = data.items.reduce((sum, item) => sum + item.total, 0);
      const taxAmount = data.tax ? (subtotal * data.tax) / 100 : 0;
      const discountAmount = data.discount ? (subtotal * data.discount) / 100 : 0;
      data.total = subtotal + taxAmount - discountAmount;
    }

    // Envoyer l'email de confirmation au client
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const invoiceHTML = generateInvoiceHTML(data);

    // Email au client
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: data.clientEmail,
      subject: `Facture ${data.invoiceNumber} - digitalpro solutions`,
      html: invoiceHTML,
      attachments: [
        {
          filename: `facture-${data.invoiceNumber}.html`,
          content: invoiceHTML,
        },
      ],
    });

    // Email à l'équipe
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `Nouvelle facture générée: ${data.invoiceNumber}`,
      html: `
        <h2>Nouvelle facture générée</h2>
        <p><strong>Numéro:</strong> ${data.invoiceNumber}</p>
        <p><strong>Client:</strong> ${data.clientName}</p>
        <p><strong>Email:</strong> ${data.clientEmail}</p>
        <p><strong>Total:</strong> ${data.total.toLocaleString('fr-FR')} FCFA</p>
      `,
    });

    return NextResponse.json({
      success: true,
      invoiceNumber: data.invoiceNumber,
      message: 'Facture générée et envoyée avec succès',
    });
  } catch (error) {
    console.error('Erreur lors de la génération de la facture:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la génération de la facture' },
      { status: 500 }
    );
  }
}

function generateInvoiceHTML(data: InvoiceData): string {
  const subtotal = data.subtotal || data.items.reduce((sum, item) => sum + item.total, 0);
  const taxAmount = data.tax ? (subtotal * data.tax) / 100 : 0;
  const discountAmount = data.discount ? (subtotal * data.discount) / 100 : 0;
  const total = data.total || subtotal + taxAmount - discountAmount;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          border-bottom: 3px solid #8b5cf6;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #8b5cf6;
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
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #f8f9fa;
          font-weight: bold;
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
          width: 150px;
          text-align: right;
          margin-right: 20px;
        }
        .total-value {
          width: 150px;
          text-align: right;
          font-weight: bold;
        }
        .grand-total {
          font-size: 20px;
          color: #8b5cf6;
          border-top: 2px solid #8b5cf6;
          padding-top: 10px;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          text-align: center;
          color: #666;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">digitalpro solutions</div>
        <h1>FACTURE</h1>
        <p><strong>Numéro:</strong> ${data.invoiceNumber}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
        ${data.dueDate ? `<p><strong>Date d'échéance:</strong> ${new Date(data.dueDate).toLocaleDateString('fr-FR')}</p>` : ''}
      </div>

      <div class="invoice-info">
        <div class="client-info">
          <h3>Facturé à:</h3>
          <p><strong>${data.clientName}</strong></p>
          ${data.clientEmail ? `<p>${data.clientEmail}</p>` : ''}
          ${data.clientPhone ? `<p>${data.clientPhone}</p>` : ''}
          ${data.clientAddress ? `<p>${data.clientAddress}</p>` : ''}
        </div>
        <div class="company-info">
          <h3>digitalpro solutions</h3>
          <p>Bvd Koffi Gadaud, Cocody</p>
          <p>Abidjan, Côte d'Ivoire</p>
          <p>Email: digitalprosolutions27@gmail.com</p>
          <p>Tél: +225 07 48 97 60 31</p>
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
          ${data.items.map(item => `
            <tr>
              <td>${item.description}</td>
              <td>${item.quantity}</td>
              <td>${item.unitPrice.toLocaleString('fr-FR')} FCFA</td>
              <td>${item.total.toLocaleString('fr-FR')} FCFA</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="totals">
        <div class="total-row">
          <span class="total-label">Sous-total:</span>
          <span class="total-value">${subtotal.toLocaleString('fr-FR')} FCFA</span>
        </div>
        ${data.tax ? `
          <div class="total-row">
            <span class="total-label">TVA (${data.tax}%):</span>
            <span class="total-value">${taxAmount.toLocaleString('fr-FR')} FCFA</span>
          </div>
        ` : ''}
        ${data.discount ? `
          <div class="total-row">
            <span class="total-label">Remise (${data.discount}%):</span>
            <span class="total-value">-${discountAmount.toLocaleString('fr-FR')} FCFA</span>
          </div>
        ` : ''}
        <div class="total-row grand-total">
          <span class="total-label">TOTAL:</span>
          <span class="total-value">${total.toLocaleString('fr-FR')} FCFA</span>
        </div>
      </div>

      ${data.notes ? `
        <div style="margin-top: 30px;">
          <h3>Notes:</h3>
          <p>${data.notes}</p>
        </div>
      ` : ''}

      <div class="footer">
        <p>Merci pour votre confiance!</p>
        <p>digitalpro solutions - Agence d'intelligence numérique</p>
      </div>
    </body>
    </html>
  `;
}


