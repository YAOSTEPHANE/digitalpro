"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Mail,
  Phone,
  Building,
  User,
  MessageSquare,
  CheckCircle2,
  Send,
  MapPin,
  Clock,
  Facebook,
  Copy,
  Check,
  MessageCircle,
} from "lucide-react";
import LuxPageLayout from "@/components/lux-page-layout";
import LuxSectionHeader from "@/components/lux-section-header";
import LuxReveal from "@/components/lux-reveal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const luxInput =
  "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400";
const luxSelectContent = "bg-white border-slate-200";

const FormSchema = z.object({
  first_name: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  last_name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().min(8, "Numéro de téléphone invalide").optional().or(z.literal("")),
  company_name: z.string().optional(),
  job_title: z.string().optional(),
  service: z.enum([
    "Développement de site web",
    "Développement d'application mobile",
    "SEO & Référencement",
    "Marketing sur les médias sociaux",
    "Conception UI/UX",
    "Conception d'identité visuelle",
    "Maintenance informatique",
    "E-commerce",
    "Autre",
  ]),
  help: z.enum([
    "Évaluer digitalpro solutions pour mon entreprise",
    "En savoir plus sur nos services",
    "Obtenir un devis",
    "Demander une consultation",
    "Autre",
  ]),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
  terms: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les conditions pour continuer",
  }),
});

type FormValues = z.infer<typeof FormSchema>;

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      company_name: "",
      job_title: "",
      service: "Développement de site web",
      help: "En savoir plus sur nos services",
      message: "",
      terms: false,
    },
  });

  const handleCopy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      toast.success("Copié dans le presse-papier !");
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      toast.error("Copie impossible");
    }
  };

  async function onSubmit(data: FormValues) {
    try {
      setLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Une erreur est survenue");
      }

      setSubmitted(true);
      toast.success("Message envoyé avec succès !");
      form.reset();
    } catch {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <LuxPageLayout breadcrumb="Contact">
      <LuxSectionHeader
        indexLabel="01"
        label="Contact"
        title="Parlons de votre projet"
        description="Décrivez vos objectifs ci-dessous : notre équipe vous répond sous 24 heures ouvrées avec une première orientation concrète."
        align="center"
      />

      <section className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Ce que vous obtenez",
              text: "Un échange structuré, un cadrage clair de vos besoins et un plan d'action réaliste.",
            },
            {
              title: "Délai de réponse",
              text: "Réponse initiale sous 24h ouvrées, puis proposition de créneau selon votre urgence.",
            },
            {
              title: "Préparer votre message",
              text: "Indiquez vos objectifs, votre audience, vos échéances et des références que vous appréciez.",
            },
          ].map((item, index) => (
            <LuxReveal key={item.title} delay={index * 0.06}>
              <article className="lux-card-interactive p-5 h-full">
                <span className="font-mono text-[10px] font-semibold text-[var(--brand-blue)] block mb-1.5">
                  0{index + 1}
                </span>
                <h2 className="text-lg font-semibold lux-heading mb-1.5">{item.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
              </article>
            </LuxReveal>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-5">
          <div className="lux-card-interactive p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold lux-heading">Nos coordonnées</h2>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Studio actif
              </span>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="lux-icon-badge p-2.5 shrink-0">
                    <Mail className="w-4 h-4 text-[var(--brand-blue)]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-semibold text-slate-900 mb-0.5">Email</h3>
                    <a
                      href="mailto:digitalprosolutions27@gmail.com"
                      className="text-xs text-slate-600 hover:text-[var(--brand-blue)] transition-colors block truncate"
                    >
                      digitalprosolutions27@gmail.com
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("email", "digitalprosolutions27@gmail.com")}
                  className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-500 hover:text-slate-900 transition-colors shrink-0"
                  aria-label="Copier l'adresse email"
                >
                  {copiedKey === "email" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
                <div className="flex items-start gap-3">
                  <div className="lux-icon-badge p-2.5 shrink-0">
                    <Phone className="w-4 h-4 text-[var(--brand-blue)]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-slate-900 mb-0.5">Téléphone</h3>
                    <a
                      href="tel:+2250748976031"
                      className="text-xs text-slate-600 hover:text-[var(--brand-blue)] transition-colors"
                    >
                      +225 07 48 97 60 31
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("phone", "+2250748976031")}
                  className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-500 hover:text-slate-900 transition-colors shrink-0"
                  aria-label="Copier le téléphone"
                >
                  {copiedKey === "phone" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
                <div className="lux-icon-badge p-2.5 shrink-0">
                  <MapPin className="w-4 h-4 text-[var(--brand-blue)]" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-slate-900 mb-0.5">Adresse</h3>
                  <p className="text-xs text-slate-600">
                    Bvd Koffi Gadaud, Cocody
                    <br />
                    Abidjan, Côte d&apos;Ivoire
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
                <div className="lux-icon-badge p-2.5 shrink-0">
                  <Clock className="w-4 h-4 text-[var(--brand-blue)]" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-slate-900 mb-0.5">Horaires</h3>
                  <p className="text-xs text-slate-600">Lun - Ven : 9h - 18h · Sam : 9h - 13h</p>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2.5">
              <a
                href="https://wa.me/2250748976031"
                target="_blank"
                rel="noopener noreferrer"
                className="lux-btn-ghost !px-3 !py-2 text-xs gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                WhatsApp
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61574110564242"
                target="_blank"
                rel="noopener noreferrer"
                className="lux-btn-ghost !px-3 !py-2 text-xs gap-1.5"
              >
                <Facebook className="w-3.5 h-3.5 text-[var(--brand-blue)]" />
                Facebook
              </a>
            </div>
          </div>

          <div className="lux-section-premium !p-6">
            <h3 className="text-lg font-semibold lux-heading mb-4">Pourquoi nous choisir ?</h3>
            <ul className="space-y-2.5">
              {[
                "Réponse garantie sous 24h",
                "Consultation stratégique offerte",
                "Architecture & design sur mesure",
                "Support dédié & maintenance",
              ].map((label) => (
                <li key={label} className="flex items-start gap-2.5 text-slate-600 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[var(--brand-blue)] mt-0.5 flex-shrink-0" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-2">
          {!submitted ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 lux-form-panel">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold lux-heading flex items-center gap-2.5 mb-4">
                    <span className="lux-icon-badge">
                      <User className="w-5 h-5 text-[var(--brand-blue)]" />
                    </span>
                    Vos coordonnées
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-800">Prénom *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Votre prénom" className={luxInput} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="last_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-800">Nom *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Votre nom" className={luxInput} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-800 flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email *
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="votre@email.com"
                              className={luxInput}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-800 flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Téléphone
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="tel"
                              placeholder="+225 XX XX XX XX XX"
                              className={luxInput}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="company_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-800 flex items-center gap-2">
                            <Building className="w-4 h-4" />
                            Entreprise
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Nom de votre entreprise"
                              className={luxInput}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="job_title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-800">Poste</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Votre poste" className={luxInput} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-200">
                  <h2 className="text-xl font-semibold lux-heading flex items-center gap-2.5 mb-4">
                    <span className="lux-icon-badge">
                      <MessageSquare className="w-5 h-5 text-[var(--brand-blue)]" />
                    </span>
                    Objet de votre demande
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-800">Service concerné *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className={luxInput}>
                                <SelectValue placeholder="Sélectionnez un service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className={luxSelectContent}>
                              <SelectItem value="Développement de site web">
                                Développement de site web
                              </SelectItem>
                              <SelectItem value="Développement d'application mobile">
                                Développement d&apos;application mobile
                              </SelectItem>
                              <SelectItem value="SEO & Référencement">SEO &amp; Référencement</SelectItem>
                              <SelectItem value="Marketing sur les médias sociaux">
                                Marketing sur les médias sociaux
                              </SelectItem>
                              <SelectItem value="Conception UI/UX">Conception UI/UX</SelectItem>
                              <SelectItem value="Conception d'identité visuelle">
                                Conception d&apos;identité visuelle
                              </SelectItem>
                              <SelectItem value="Maintenance informatique">
                                Maintenance informatique
                              </SelectItem>
                              <SelectItem value="E-commerce">E-commerce</SelectItem>
                              <SelectItem value="Autre">Autre</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="help"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-800">Nature de la demande *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className={luxInput}>
                                <SelectValue placeholder="Sélectionnez une option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className={luxSelectContent}>
                              <SelectItem value="Évaluer digitalpro solutions pour mon entreprise">
                                Évaluer digitalpro solutions
                              </SelectItem>
                              <SelectItem value="En savoir plus sur nos services">
                                En savoir plus sur nos services
                              </SelectItem>
                              <SelectItem value="Obtenir un devis">Obtenir un devis</SelectItem>
                              <SelectItem value="Demander une consultation">
                                Demander une consultation
                              </SelectItem>
                              <SelectItem value="Autre">Autre</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-800">Message *</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Décrivez votre projet, vos besoins ou posez-nous vos questions..."
                            className={`${luxInput} min-h-[130px]`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-0.5 border-slate-300 data-[state=checked]:bg-[var(--brand-blue)] data-[state=checked]:border-[var(--brand-blue)] bg-white"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-snug">
                        <FormLabel className="text-xs md:text-sm text-slate-700 cursor-pointer font-normal">
                          J&apos;accepte que digitalpro solutions traite mes données personnelles
                          uniquement pour répondre à ma demande. *
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={loading} className="w-full lux-btn-primary !py-6 text-base">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer le message
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          ) : (
            <div className="lux-form-panel p-10 md:p-14 text-center">
              <div className="max-w-md mx-auto">
                <div className="lux-success-badge">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold lux-heading mb-3">Message envoyé avec succès !</h2>
                <p className="text-slate-600 mb-7 text-sm md:text-base">
                  Merci pour votre message. Notre équipe vous répondra sous 24 heures ouvrées.
                </p>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    form.reset();
                  }}
                  className="lux-btn-primary"
                >
                  Envoyer un autre message
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </LuxPageLayout>
  );
}
