import { NextResponse } from "next/server";

import nodemailer from "nodemailer";

export async function POST(req: Request) {
  if (req.method === "POST") {

    try {

    const body = await req.json();
    const {
      first_name,
      last_name,
      email,
      phone,
      job_title,
      company_name,
      help,
      services,
      service,
      info,
      message,
      terms,
    } = body;

    const resolvedServices = service ?? services;
    const resolvedInfo = message ?? info;


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
                    ${phone ? `<p>Phone: ${phone}</p>` : ""}
                    <p>Job Title: ${job_title ?? ""}</p>
                    <p>Company Name: ${company_name ?? ""}</p>
                    <p>Services: ${resolvedServices ?? ""}</p>
                    <p>Help: ${help ?? ""}</p>
                    <p>Info: ${resolvedInfo ?? ""}</p>
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
