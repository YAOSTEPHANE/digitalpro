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
        job_title,
        service,
        project_type,
        budget_range,
        timeline,
        features,
        project_description,
        additional_info,
        terms,
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
        subject: "Nouvelle demande de devis",
        html: `
          <h1>Nouvelle demande de devis</h1>
          
          <h2>Informations personnelles</h2>
          <p><strong>Prénom:</strong> ${first_name}</p>
          <p><strong>Nom:</strong> ${last_name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Téléphone:</strong> ${phone}</p>
          ${company_name ? `<p><strong>Entreprise:</strong> ${company_name}</p>` : ''}
          ${job_title ? `<p><strong>Poste:</strong> ${job_title}</p>` : ''}
          
          <h2>Détails du projet</h2>
          <p><strong>Service demandé:</strong> ${service}</p>
          <p><strong>Type de projet:</strong> ${project_type}</p>
          <p><strong>Budget estimé:</strong> ${budget_range}</p>
          <p><strong>Délai souhaité:</strong> ${timeline}</p>
          
          <h2>Description du projet</h2>
          <p>${project_description}</p>
          
          ${features ? `
          <h2>Fonctionnalités spécifiques</h2>
          <p>${features}</p>
          ` : ''}
          
          ${additional_info ? `
          <h2>Informations complémentaires</h2>
          <p>${additional_info}</p>
          ` : ''}
          
          <p><strong>Conditions acceptées:</strong> ${terms ? 'Oui' : 'Non'}</p>
        `,
      };

      await transporter.sendMail(mailOptions);

      return NextResponse.json({ success: true, message: "Demande de devis envoyée avec succès" });
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
