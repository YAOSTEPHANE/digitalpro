import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const {
        first_name,
        last_name,
        email,
        phone,
        company_name,
        service,
        preferred_date,
        preferred_time,
        message,
      } = await req.json();

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "digitalproslutions01@gmail.com",
          pass: "glla okbr gnjv ujqw",
        },
      });

      // Formatage de la date
      const appointmentDate = new Date(preferred_date);
      const formattedDate = appointmentDate.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      const mailOptions = {
        from: email,
        to: "digitalproslutions01@gmail.com",
        subject: `Nouvelle demande de rendez-vous - ${first_name} ${last_name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
              Nouvelle demande de rendez-vous
            </h2>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin-top: 0;">Informations personnelles</h3>
              <p><strong>Nom complet:</strong> ${first_name} ${last_name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Téléphone:</strong> ${phone}</p>
              ${company_name ? `<p><strong>Entreprise:</strong> ${company_name}</p>` : ''}
            </div>

            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin-top: 0;">Détails du rendez-vous</h3>
              <p><strong>Service:</strong> ${service}</p>
              <p><strong>Date préférée:</strong> ${formattedDate}</p>
              <p><strong>Heure préférée:</strong> ${preferred_time}</p>
              ${message ? `<p><strong>Message:</strong><br>${message}</p>` : ''}
            </div>

            <div style="background-color: #e0e7ff; padding: 15px; border-radius: 8px; margin-top: 20px;">
              <p style="margin: 0; color: #4338ca;">
                <strong>Action requise:</strong> Veuillez confirmer ce rendez-vous avec le client.
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
        subject: "Confirmation de votre demande de rendez-vous - digitalpro solutions",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #6366f1;">Merci pour votre demande de rendez-vous !</h2>
            
            <p>Bonjour ${first_name},</p>
            
            <p>Nous avons bien reçu votre demande de rendez-vous pour le <strong>${formattedDate} à ${preferred_time}</strong>.</p>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin-top: 0;">Récapitulatif</h3>
              <p><strong>Service:</strong> ${service}</p>
              <p><strong>Date:</strong> ${formattedDate}</p>
              <p><strong>Heure:</strong> ${preferred_time}</p>
            </div>

            <p>Notre équipe va examiner votre demande et vous contactera dans les plus brefs délais pour confirmer ce rendez-vous.</p>
            
            <p>En attendant, n&apos;hésitez pas à nous contacter si vous avez des questions :</p>
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
        message: "Demande de rendez-vous envoyée avec succès" 
      });
    } catch (error) {
      console.error("Appointment API error:", error);
      return NextResponse.json(
        { error: "Une erreur est survenue lors de l'envoi de la demande" },
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






