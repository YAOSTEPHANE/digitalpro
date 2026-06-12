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
  "bg-[rgba(255,255,255,0.04)] border-[rgba(81,102,153,0.35)] text-[var(--lux-champagne)] placeholder:text-[var(--lux-muted)]";
const luxSelectContent = "bg-[rgba(22,25,36,0.98)] border-[rgba(81,102,153,0.35)]";

const FormSchema = z.object({
  first_name: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  last_name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().min(8, "Numéro de téléphone invalide").optional(),
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
    <LuxPageLayout>
      <LuxSectionHeader
        label="Contact"
        title="Parlons de votre projet"
        description="Remplissez le formulaire ci-dessous et notre équipe vous contactera dans les 24 heures. Nous sommes là pour transformer vos idées en réalité digitale."
        align="center"
      />

      <section className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Ce que vous obtenez",
              text: "Un premier échange structuré, un cadrage clair de vos besoins et un plan d'action réaliste.",
            },
            {
              title: "Délai de réponse",
              text: "Réponse initiale sous 24h ouvrées, puis proposition de créneau de travail selon votre urgence.",
            },
            {
              title: "Comment préparer votre demande",
              text: "Partagez vos objectifs, votre audience, vos contraintes et des exemples de sites que vous aimez.",
            },
          ].map((item, index) => (
            <LuxReveal key={item.title} delay={index * 0.08}>
              <article className="lux-card-interactive p-5 h-full">
                <h2 className="text-lg font-semibold lux-heading mb-2">{item.title}</h2>
                <p className="text-sm lux-muted leading-relaxed">{item.text}</p>
              </article>
            </LuxReveal>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="lux-card-interactive p-6">
            <h2 className="text-xl font-semibold lux-heading mb-6">Nos coordonnées</h2>

            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  content: (
                    <a
                      href="mailto:digitalprosolutions27@gmail.com"
                      className="lux-muted hover:text-[var(--brand-blue-light)] transition-colors"
                    >
                      digitalprosolutions27@gmail.com
                    </a>
                  ),
                },
                {
                  icon: Phone,
                  title: "Téléphone",
                  content: (
                    <a
                      href="tel:+2250748976031"
                      className="lux-muted hover:text-[var(--brand-blue-light)] transition-colors"
                    >
                      +225 07 48 97 60 31
                    </a>
                  ),
                },
                {
                  icon: MapPin,
                  title: "Adresse",
                  content: (
                    <p className="lux-muted">
                      Bvd Koffi Gadaud, Cocody
                      <br />
                      Abidjan, Côte d&apos;Ivoire
                    </p>
                  ),
                },
                {
                  icon: Clock,
                  title: "Horaires",
                  content: (
                    <p className="lux-muted">
                      Lundi - Vendredi : 9h - 18h
                      <br />
                      Samedi : 9h - 13h
                    </p>
                  ),
                },
                {
                  icon: Facebook,
                  title: "Facebook",
                  content: (
                    <a
                      href="https://www.facebook.com/profile.php?id=61574110564242"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lux-muted hover:text-[var(--brand-blue-light)] transition-colors"
                    >
                      Digitalpro solutions
                    </a>
                  ),
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="lux-icon-badge">
                      <Icon className="w-5 h-5 text-[var(--brand-blue-light)]" />
                    </div>
                    <div>
                      <h3 className="text-[var(--lux-champagne)] font-medium mb-1">{item.title}</h3>
                      {item.content}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lux-section-premium p-6">
            <h3 className="text-lg font-semibold lux-heading mb-4">Pourquoi nous choisir ?</h3>
            <ul className="space-y-3">
              {["Réponse sous 24h", "Consultation gratuite", "Solutions sur mesure", "Support dédié"].map(
                (label) => (
                  <li key={label} className="flex items-start gap-2 lux-muted text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[var(--brand-blue-light)] mt-0.5 flex-shrink-0" />
                    <span>{label}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-2">
          {!submitted ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 lux-form-panel">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold lux-heading flex items-center gap-2 mb-4">
                    <span className="lux-icon-badge">
                      <User className="w-5 h-5 text-[var(--brand-blue-light)]" />
                    </span>
                    Informations personnelles
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[var(--lux-champagne)]">Prénom *</FormLabel>
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
                          <FormLabel className="text-[var(--lux-champagne)]">Nom *</FormLabel>
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
                          <FormLabel className="text-[var(--lux-champagne)] flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email *
                          </FormLabel>
                          <FormControl>
                            <Input {...field} type="email" placeholder="votre@email.com" className={luxInput} />
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
                          <FormLabel className="text-[var(--lux-champagne)] flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Téléphone
                          </FormLabel>
                          <FormControl>
                            <Input {...field} type="tel" placeholder="+225 XX XX XX XX XX" className={luxInput} />
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
                          <FormLabel className="text-[var(--lux-champagne)] flex items-center gap-2">
                            <Building className="w-4 h-4" />
                            Entreprise
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Nom de votre entreprise" className={luxInput} />
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
                          <FormLabel className="text-[var(--lux-champagne)]">Poste</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Votre poste" className={luxInput} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-[rgba(81,102,153,0.28)]">
                  <h2 className="text-xl font-semibold lux-heading flex items-center gap-2 mb-4">
                    <span className="lux-icon-badge">
                      <MessageSquare className="w-5 h-5 text-[var(--brand-blue-light)]" />
                    </span>
                    Détails du projet
                  </h2>

                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[var(--lux-champagne)]">Service qui vous intéresse *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className={luxInput}>
                              <SelectValue placeholder="Sélectionnez un service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className={luxSelectContent}>
                            <SelectItem value="Développement de site web">Développement de site web</SelectItem>
                            <SelectItem value="Développement d'application mobile">Développement d&apos;application mobile</SelectItem>
                            <SelectItem value="SEO & Référencement">SEO & Référencement</SelectItem>
                            <SelectItem value="Marketing sur les médias sociaux">Marketing sur les médias sociaux</SelectItem>
                            <SelectItem value="Conception UI/UX">Conception UI/UX</SelectItem>
                            <SelectItem value="Conception d'identité visuelle">Conception d&apos;identité visuelle</SelectItem>
                            <SelectItem value="Maintenance informatique">Maintenance informatique</SelectItem>
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
                        <FormLabel className="text-[var(--lux-champagne)]">Comment pouvons-nous vous aider ? *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className={luxInput}>
                              <SelectValue placeholder="Sélectionnez une option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className={luxSelectContent}>
                            <SelectItem value="Évaluer digitalpro solutions pour mon entreprise">
                              Évaluer digitalpro solutions pour mon entreprise
                            </SelectItem>
                            <SelectItem value="En savoir plus sur nos services">
                              En savoir plus sur nos services
                            </SelectItem>
                            <SelectItem value="Obtenir un devis">Obtenir un devis</SelectItem>
                            <SelectItem value="Demander une consultation">Demander une consultation</SelectItem>
                            <SelectItem value="Autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[var(--lux-champagne)]">Message *</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Décrivez votre projet, vos besoins ou posez-nous vos questions..."
                            className={`${luxInput} min-h-[120px]`}
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
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1 border-[rgba(81,102,153,0.45)] data-[state=checked]:bg-[var(--brand-blue)] data-[state=checked]:border-[var(--brand-blue)] bg-[rgba(255,255,255,0.04)]"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-[var(--lux-champagne)] cursor-pointer">
                          J&apos;accepte que digitalpro solutions traite mes données personnelles
                          conformément à la politique de confidentialité. *
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={loading} className="w-full lux-btn-primary !py-6 text-lg">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer le message
                      <Send className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          ) : (
            <div className="lux-form-panel p-10 md:p-16 text-center">
              <div className="max-w-md mx-auto">
                <div className="lux-success-badge">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold lux-heading mb-4">Message envoyé avec succès !</h2>
                <p className="lux-muted mb-8">
                  Merci pour votre message. Notre équipe vous contactera dans les plus brefs délais,
                  généralement sous 24 heures.
                </p>
                <div className="space-y-4">
                  <p className="text-sm lux-muted">
                    Vous recevrez une confirmation par email à l&apos;adresse que vous avez fournie.
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
            </div>
          )}
        </div>
      </div>
    </LuxPageLayout>
  );
}
