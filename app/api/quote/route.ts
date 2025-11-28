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

      // Email à l'équipe
      const mailOptions = {
        from: email,
        to: "digitalproslutions01@gmail.com",
        subject: `Nouvelle demande de devis - ${first_name} ${last_name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
            <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
              Nouvelle demande de devis
            </h2>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin-top: 0;">Informations personnelles</h3>
              <p><strong>Nom complet:</strong> ${first_name} ${last_name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Téléphone:</strong> ${phone}</p>
              ${company_name ? `<p><strong>Entreprise:</strong> ${company_name}</p>` : ''}
              ${job_title ? `<p><strong>Poste:</strong> ${job_title}</p>` : ''}
            </div>

            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin-top: 0;">Détails du projet</h3>
              <p><strong>Service:</strong> ${service}</p>
              <p><strong>Type de projet:</strong> ${project_type}</p>
              <p><strong>Budget estimé:</strong> ${budget_range}</p>
              <p><strong>Délai souhaité:</strong> ${timeline}</p>
            </div>

            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin-top: 0;">Description du projet</h3>
              <p style="white-space: pre-wrap;">${project_description.replace(/\n/g, '<br>')}</p>
            </div>

            ${features ? `
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin-top: 0;">Fonctionnalités spécifiques</h3>
              <p style="white-space: pre-wrap;">${features.replace(/\n/g, '<br>')}</p>
            </div>
            ` : ''}

            ${additional_info ? `
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin-top: 0;">Informations complémentaires</h3>
              <p style="white-space: pre-wrap;">${additional_info.replace(/\n/g, '<br>')}</p>
            </div>
            ` : ''}

            <div style="background-color: #e0e7ff; padding: 15px; border-radius: 8px; margin-top: 20px;">
              <p style="margin: 0; color: #4338ca;">
                <strong>Action requise:</strong> Veuillez préparer un devis détaillé et le envoyer dans les 24 heures.
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
        subject: "Confirmation de votre demande de devis - digitalpro solutions",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #6366f1;">Merci pour votre demande de devis !</h2>
            
            <p>Bonjour ${first_name},</p>
            
            <p>Nous avons bien reçu votre demande de devis pour <strong>${service}</strong>.</p>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin-top: 0;">Récapitulatif de votre demande</h3>
              <p><strong>Service:</strong> ${service}</p>
              <p><strong>Type de projet:</strong> ${project_type}</p>
              <p><strong>Budget estimé:</strong> ${budget_range}</p>
              <p><strong>Délai souhaité:</strong> ${timeline}</p>
            </div>

            <p>Notre équipe va analyser votre projet en détail et vous préparer un devis personnalisé. 
            Vous recevrez votre devis dans les plus brefs délais, généralement sous 24 heures.</p>
            
            <div style="background-color: #e0e7ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #4338ca; margin-top: 0;">Prochaines étapes</h3>
              <ul style="color: #4338ca; padding-left: 20px;">
                <li>Analyse de votre projet par notre équipe</li>
                <li>Préparation d&apos;un devis détaillé et personnalisé</li>
                <li>Envoi du devis par email sous 24h</li>
                <li>Possibilité de discuter du devis et d&apos;ajuster si nécessaire</li>
              </ul>
            </div>

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
        message: "Demande de devis envoyée avec succès" 
      });
    } catch (error) {
      console.error("Quote API error:", error);
      return NextResponse.json(
        { error: "Une erreur est survenue lors de l'envoi de la demande de devis" },
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


