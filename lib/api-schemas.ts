import { z } from "zod";

const trimmedString = (min: number, max: number, label: string) =>
  z
    .string()
    .trim()
    .min(min, `${label} doit contenir au moins ${min} caractères`)
    .max(max, `${label} ne doit pas dépasser ${max} caractères`);

const optionalTrimmedString = (max: number) =>
  z.string().trim().max(max).optional();

export const contactRequestSchema = z
  .object({
    first_name: trimmedString(2, 100, "Le prénom"),
    last_name: trimmedString(2, 100, "Le nom"),
    email: z.string().trim().email("Adresse email invalide").max(200),
    phone: z
      .string()
      .trim()
      .max(40)
      .optional()
      .refine((v) => !v || v.length >= 8, "Numéro de téléphone invalide"),
    company_name: optionalTrimmedString(150),
    job_title: optionalTrimmedString(150),
    service: optionalTrimmedString(150),
    services: optionalTrimmedString(150),
    help: optionalTrimmedString(200),
    message: optionalTrimmedString(5000),
    info: optionalTrimmedString(5000),
    terms: z.literal(true, {
      error: "Vous devez accepter les conditions pour continuer",
    }),
  })
  .refine(
    (data) => {
      const content = (data.message ?? data.info ?? "").trim();
      return content.length >= 10;
    },
    {
      message: "Le message doit contenir au moins 10 caractères",
      path: ["message"],
    }
  );

export const appointmentRequestSchema = z.object({
  first_name: trimmedString(2, 100, "Le prénom"),
  last_name: trimmedString(2, 100, "Le nom"),
  email: z.string().trim().email("Adresse email invalide").max(200),
  phone: trimmedString(8, 40, "Le numéro de téléphone"),
  company_name: optionalTrimmedString(150),
  service: trimmedString(2, 150, "Le service"),
  preferred_date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Format de date invalide (AAAA-MM-JJ)")
    .refine(
      (value) => {
        const parsed = new Date(`${value}T00:00:00Z`);
        return (
          !Number.isNaN(parsed.getTime()) &&
          parsed.toISOString().startsWith(value)
        );
      },
      { message: "Date invalide" }
    ),
  preferred_time: z.enum([
    "09:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ]),
  message: optionalTrimmedString(3000),
});

export const quoteRequestSchema = z.object({
  first_name: trimmedString(2, 100, "Le prénom"),
  last_name: trimmedString(2, 100, "Le nom"),
  email: z.string().trim().email("Adresse email invalide").max(200),
  phone: trimmedString(8, 40, "Le numéro de téléphone"),
  company_name: optionalTrimmedString(150),
  job_title: optionalTrimmedString(150),
  service: trimmedString(2, 150, "Le service"),
  project_type: trimmedString(2, 120, "Le type de projet"),
  budget_range: trimmedString(2, 120, "La fourchette budgétaire"),
  timeline: trimmedString(2, 120, "Le délai souhaité"),
  features: optionalTrimmedString(3000),
  project_description: trimmedString(20, 5000, "La description du projet"),
  additional_info: optionalTrimmedString(3000),
  terms: z.literal(true, {
    error: "Vous devez accepter les conditions pour continuer",
  }),
});

export const invoiceItemSchema = z.object({
  description: trimmedString(1, 300, "La description"),
  quantity: z.number().finite().positive().max(10000),
  unitPrice: z.number().finite().nonnegative().max(1_000_000_000),
  total: z.number().finite().nonnegative().max(10_000_000_000).optional(),
});

export const invoiceRequestSchema = z.object({
  invoiceNumber: z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9_-]{3,40}$/, "Numéro de facture invalide")
    .optional(),
  clientName: trimmedString(2, 150, "Le nom du client"),
  clientEmail: z.string().trim().email("Email client invalide").max(200),
  clientPhone: optionalTrimmedString(40),
  clientAddress: optionalTrimmedString(300),
  items: z.array(invoiceItemSchema).min(1).max(50),
  subtotal: z.number().finite().nonnegative().optional(),
  tax: z.number().finite().min(0).max(100).optional(),
  discount: z.number().finite().min(0).max(100).optional(),
  total: z.number().finite().nonnegative().optional(),
  dueDate: optionalTrimmedString(40),
  notes: optionalTrimmedString(2000),
});

export const chatRequestSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, "Message requis")
    .max(2000, "Le message est trop long"),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(2000),
      })
    )
    .max(10)
    .optional(),
});
