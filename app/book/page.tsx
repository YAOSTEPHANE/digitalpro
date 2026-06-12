"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Calendar, Clock, User, Mail, Phone, Building, MessageSquare, CheckCircle2 } from "lucide-react";
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
import { toast } from "sonner";

const luxInput =
  "bg-[rgba(255,255,255,0.04)] border-[rgba(81,102,153,0.35)] text-[var(--lux-champagne)] placeholder:text-[var(--lux-muted)]";
const luxSelectContent = "bg-[rgba(22,25,36,0.98)] border-[rgba(81,102,153,0.35)]";

const AppointmentSchema = z.object({
  first_name: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  last_name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  company_name: z.string().optional(),
  service: z.enum([
    "Développement de site web",
    "Développement d'application mobile",
    "SEO & Référencement",
    "Marketing sur les médias sociaux",
    "Conception UI/UX",
    "Maintenance informatique",
    "E-commerce",
    "Autre",
  ]),
  preferred_date: z.string().min(1, "Veuillez sélectionner une date"),
  preferred_time: z.enum([
    "09:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ]),
  message: z.string().optional(),
});

type AppointmentValues = z.infer<typeof AppointmentSchema>;

export default function Book() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<AppointmentValues>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      company_name: "",
      service: "Développement de site web",
      preferred_date: "",
      preferred_time: "09:00",
      message: "",
    },
  });

  async function onSubmit(data: AppointmentValues) {
    try {
      setLoading(true);
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Une erreur est survenue");
      }

      setSubmitted(true);
      toast.success("Demande de rendez-vous envoyée avec succès !");
    } catch {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          value: date.toISOString().split("T")[0],
          label: date.toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          }),
        });
      }
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  return (
    <LuxPageLayout maxWidth="5xl">
      <LuxSectionHeader
        label="Prendre rendez-vous"
        title="Réserver un rendez-vous"
        description="Planifiez une consultation gratuite de 30 minutes avec notre équipe. Discutons de votre projet et découvrons comment nous pouvons vous aider."
        align="center"
      />

      <section className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Pendant la consultation",
              text: "Nous clarifions vos objectifs, votre cible, votre positionnement et les priorités techniques pour définir un plan concret.",
            },
            {
              title: "Après la consultation",
              text: "Vous recevez une synthèse actionnable avec recommandations, ordre de mise en oeuvre et prochaines étapes adaptées à votre budget.",
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
                        Téléphone *
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="tel" placeholder="+225 XX XX XX XX XX" className={luxInput} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--lux-champagne)] flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Nom de l&apos;entreprise (optionnel)
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Votre entreprise" className={luxInput} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4 pt-6 border-t border-[rgba(81,102,153,0.28)]">
              <h2 className="text-xl font-semibold lux-heading flex items-center gap-2 mb-4">
                <span className="lux-icon-badge">
                  <MessageSquare className="w-5 h-5 text-[var(--brand-blue-light)]" />
                </span>
                Détails du rendez-vous
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
                        <SelectItem value="Maintenance informatique">Maintenance informatique</SelectItem>
                        <SelectItem value="E-commerce">E-commerce</SelectItem>
                        <SelectItem value="Autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="preferred_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[var(--lux-champagne)] flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date préférée *
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className={luxInput}>
                            <SelectValue placeholder="Sélectionnez une date" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className={luxSelectContent}>
                          {availableDates.map((date) => (
                            <SelectItem key={date.value} value={date.value}>
                              {date.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferred_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[var(--lux-champagne)] flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Heure préférée *
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className={luxInput}>
                            <SelectValue placeholder="Sélectionnez une heure" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className={luxSelectContent}>
                          <SelectItem value="09:00">09:00</SelectItem>
                          <SelectItem value="10:00">10:00</SelectItem>
                          <SelectItem value="11:00">11:00</SelectItem>
                          <SelectItem value="14:00">14:00</SelectItem>
                          <SelectItem value="15:00">15:00</SelectItem>
                          <SelectItem value="16:00">16:00</SelectItem>
                          <SelectItem value="17:00">17:00</SelectItem>
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
                    <FormLabel className="text-[var(--lux-champagne)]">Message (optionnel)</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Décrivez brièvement votre projet ou vos besoins..."
                        className={`${luxInput} min-h-[100px]`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full lux-btn-primary !py-6 text-lg">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  Confirmer le rendez-vous
                  <CheckCircle2 className="w-5 h-5 ml-2" />
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
            <h2 className="text-3xl font-bold lux-heading mb-4">Demande envoyée avec succès !</h2>
            <p className="lux-muted mb-8">
              Nous avons bien reçu votre demande de rendez-vous. Notre équipe vous contactera dans les plus brefs délais pour confirmer votre rendez-vous.
            </p>
            <div className="space-y-4">
              <p className="text-sm lux-muted">
                Vous recevrez un email de confirmation à l&apos;adresse que vous avez fournie.
              </p>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  form.reset();
                }}
                className="lux-btn-primary"
              >
                Prendre un autre rendez-vous
              </Button>
            </div>
          </div>
        </div>
      )}
    </LuxPageLayout>
  );
}
