import { NextResponse } from "next/server";

import nodemailer from "nodemailer";

export async function POST(req: Request) {
  if (req.method === "POST") {

    try {

    const {
      first_name,
      last_name,
      email,
      job_title,
      company_name,
      help,
      services,
      info,
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
        subject: "Contact Form Submission",
        html: `
                    <h1>Contact Form</h1>
                    <p>First Name: ${first_name}</p>
                    <p>Last Name: ${last_name}</p>
                    <p>Email: ${email}</p>
                    <p>Job Title: ${job_title}</p>
                    <p>Company Name: ${company_name}</p>
                    <p>Services: ${services}</p>
                    <p>Help: ${help}</p>
                    <p>Info: ${info}</p>
                    <p>Terms Accepted: ${terms}</p>
                `,
      };

 
      await transporter.sendMail(mailOptions);

      return NextResponse.json("l'email a été envoyé");
    } catch (_error) {
      return NextResponse.json("l'email n'a pas été envoyé");
    }
  } else {
    return NextResponse.json('méthode non autorisée');
  }
}
