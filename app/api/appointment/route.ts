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

      const mailOptions = {
        from: email,
        to: "digitalproslutions01@gmail.com",
        subject: "Nouvelle demande de rendez-vous",
        html: `
          <h1>Nouvelle demande de rendez-vous</h1>
          <h2>Informations personnelles</h2>
          <p><strong>Prénom:</strong> ${first_name}</p>
          <p><strong>Nom:</strong> ${last_name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Téléphone:</strong> ${phone}</p>
          ${company_name ? `<p><strong>Entreprise:</strong> ${company_name}</p>` : ''}
          
          <h2>Détails du rendez-vous</h2>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Date préférée:</strong> ${new Date(preferred_date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
          <p><strong>Heure préférée:</strong> ${preferred_time}</p>
          ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
        `,
      };

      await transporter.sendMail(mailOptions);

      return NextResponse.json({ success: true, message: "Demande de rendez-vous envoyée avec succès" });
    } catch (_error) {
      return NextResponse.json(
        { success: false, error: "Erreur lors de l'envoi de la demande" },
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
