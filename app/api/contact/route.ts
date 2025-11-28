import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const body = await req.json();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { terms: _terms, ...rest } = body;
      const {
        first_name,
        last_name,
        email,
        phone,
        company_name,
        job_title,
        service,
        help,
        message,
      } = rest;

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "digitalproslutions01@gmail.com",
          pass: "glla okbr gnjv ujqw",
        },
      });

      // Email à l'équipe
      const mailOptions = {
        from: email,
        to: "digitalproslutions01@gmail.com",
        subject: `Nouveau message de contact - ${first_name} ${last_name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
              Nouveau message de contact
            </h2>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin-top: 0;">Informations personnelles</h3>
              <p><strong>Nom complet:</strong> ${first_name} ${last_name}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${phone ? `<p><strong>Téléphone:</strong> ${phone}</p>` : ''}
              ${company_name ? `<p><strong>Entreprise:</strong> ${company_name}</p>` : ''}
              ${job_title ? `<p><strong>Poste:</strong> ${job_title}</p>` : ''}
            </div>

            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin-top: 0;">Détails du projet</h3>
              <p><strong>Service:</strong> ${service}</p>
              <p><strong>Type de demande:</strong> ${help}</p>
              <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
            </div>

            <div style="background-color: #e0e7ff; padding: 15px; border-radius: 8px; margin-top: 20px;">
              <p style="margin: 0; color: #4338ca;">
                <strong>Action requise:</strong> Veuillez répondre à ce message dans les 24 heures.
              </p>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);

      // Email de confirmation au client
      const confirmationMailOptions = {
        from: "digitalproslutions01@gmail.com",
        to: email,
        subject: "Confirmation de réception - digitalpro solutions",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #6366f1;">Merci pour votre message !</h2>
            
            <p>Bonjour ${first_name},</p>
            
            <p>Nous avons bien reçu votre message concernant <strong>${service}</strong>.</p>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin-top: 0;">Récapitulatif de votre demande</h3>
              <p><strong>Service:</strong> ${service}</p>
              <p><strong>Type de demande:</strong> ${help}</p>
            </div>

            <p>Notre équipe va examiner votre demande et vous contactera dans les plus brefs délais, généralement sous 24 heures.</p>
            
            <p>En attendant, n&apos;hésitez pas à nous contacter si vous avez des questions urgentes :</p>
            <ul>
              <li>Email: digitalprosolutions27@gmail.com</li>
              <li>Téléphone: +225 07 48 97 60 31</li>
            </ul>

            <p>Cordialement,<br>L&apos;équipe digitalpro solutions</p>
          </div>
        `,
      };

      await transporter.sendMail(confirmationMailOptions);

      return NextResponse.json({ 
        success: true,
        message: "Message envoyé avec succès" 
      });
    } catch (error) {
      console.error("Contact API error:", error);
      return NextResponse.json(
        { error: "Une erreur est survenue lors de l'envoi du message" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { error: "Méthode non autorisée" },
      { status: 405 }
    );
  }
}
