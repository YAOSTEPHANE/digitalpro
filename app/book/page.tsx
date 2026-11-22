"use client";

import { useState, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Building,
  MessageSquare,
  CheckCircle2,
  Video,
  MapPin,
  ShieldCheck,
  Check,
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
import { toast } from "sonner";

const luxInput =
  "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400";
const luxSelectContent = "bg-white border-slate-200";

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

const MORNING_SLOTS = ["09:00", "10:00", "11:00"] as const;
const AFTERNOON_SLOTS = ["14:00", "15:00", "16:00", "17:00"] as const;

export default function Book() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookedSummary, setBookedSummary] = useState<AppointmentValues | null>(null);

  const availableDates = useMemo(() => {
    const dates: { value: string; weekday: string; dayNum: string; month: string; fullLabel: string }[] = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          value: date.toISOString().split("T")[0],
          weekday: date.toLocaleDateString("fr-FR", { weekday: "short" }),
          dayNum: date.toLocaleDateString("fr-FR", { day: "2-digit" }),
          month: date.toLocaleDateString("fr-FR", { month: "short" }),
          fullLabel: date.toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          }),
        });
      }
    }
    return dates;
  }, []);

  const form = useForm<AppointmentValues>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      company_name: "",
      service: "Développement de site web",
      preferred_date: availableDates[0]?.value ?? "",
      preferred_time: "10:00",
      message: "",
    },
  });

  const selectedDateValue = form.watch("preferred_date");
  const selectedTimeValue = form.watch("preferred_time");
  const selectedServiceValue = form.watch("service");
  const selectedDateObj = availableDates.find((d) => d.value === selectedDateValue);

  async function onSubmit(data: AppointmentValues) {
    try {
      setLoading(true);
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(
          payload?.error || "Une erreur est survenue. Veuillez réessayer."
        );
      }

      setBookedSummary(data);
      setSubmitted(true);
      toast.success("Demande de rendez-vous envoyée avec succès !");
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <LuxPageLayout breadcrumb="Rendez-vous">
      <LuxSectionHeader
        indexLabel="01"
        label="Prendre rendez-vous"
        title="Réserver une session stratégique"
        description="Planifiez une consultation offerte de 30 minutes avec notre direction technique & créative pour cadrer votre projet."
        align="center"
      />

      <section className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Pendant la consultation (30 min)",
              text: "Nous clarifions vos objectifs, votre cible, votre positionnement et les priorités techniques pour tracer une feuille de route concrète.",
            },
            {
              title: "Après la consultation",
              text: "Vous recevez une synthèse actionnable avec recommandations d'architecture, ordre de mise en œuvre et estimation budgétaire claire.",
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

      {!submitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 lux-form-panel">
                <div className="space-y-5">
                  <h2 className="text-xl font-semibold lux-heading flex items-center gap-2.5">
                    <span className="lux-icon-badge">
                      <Calendar className="w-5 h-5 text-[var(--brand-blue)]" />
                    </span>
                    1. Choisissez votre créneau
                  </h2>

                  <FormField
                    control={form.control}
                    name="preferred_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-800">Date préférée *</FormLabel>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1">
                          {availableDates.map((date) => {
                            const active = field.value === date.value;
                            return (
                              <button
                                key={date.value}
                                type="button"
                                onClick={() => field.onChange(date.value)}
                                className={`relative rounded-xl border p-3 text-center transition-all ${
                                  active
                                    ? "border-[var(--brand-blue)] bg-[var(--brand-blue)] text-white shadow-md"
                                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-[var(--brand-blue)] hover:bg-white"
                                }`}
                              >
                                {active ? (
                                  <Check className="w-3.5 h-3.5 text-white absolute top-2 right-2" />
                                ) : null}
                                <div
                                  className={`text-[10px] uppercase tracking-wider ${
                                    active ? "text-white/80" : "text-slate-500"
                                  }`}
                                >
                                  {date.weekday}
                                </div>
                                <div
                                  className={`font-display text-2xl font-bold leading-tight my-0.5 tabular-nums ${
                                    active ? "text-white" : "text-slate-900"
                                  }`}
                                >
                                  {date.dayNum}
                                </div>
                                <div className="text-[11px] capitalize">{date.month}</div>
                              </button>
                            );
                          })}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferred_time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-800 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[var(--brand-blue)]" />
                          Heure préférée (GMT / Abidjan) *
                        </FormLabel>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold mb-2">
                              Matinée
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {MORNING_SLOTS.map((slot) => (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => field.onChange(slot)}
                                  className={`rounded-xl border px-4 py-2 text-xs font-mono font-semibold transition-all ${
                                    field.value === slot
                                      ? "lux-chip-active"
                                      : "lux-chip hover:border-[var(--brand-blue)]"
                                  }`}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold mb-2">
                              Après-midi
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {AFTERNOON_SLOTS.map((slot) => (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => field.onChange(slot)}
                                  className={`rounded-xl border px-4 py-2 text-xs font-mono font-semibold transition-all ${
                                    field.value === slot
                                      ? "lux-chip-active"
                                      : "lux-chip hover:border-[var(--brand-blue)]"
                                  }`}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-200">
                  <h2 className="text-xl font-semibold lux-heading flex items-center gap-2.5">
                    <span className="lux-icon-badge">
                      <User className="w-5 h-5 text-[var(--brand-blue)]" />
                    </span>
                    2. Vos coordonnées
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
                            Téléphone *
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

                  <FormField
                    control={form.control}
                    name="company_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-800 flex items-center gap-2">
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

                <div className="space-y-4 pt-6 border-t border-slate-200">
                  <h2 className="text-xl font-semibold lux-heading flex items-center gap-2.5">
                    <span className="lux-icon-badge">
                      <MessageSquare className="w-5 h-5 text-[var(--brand-blue)]" />
                    </span>
                    3. Sujet de la rencontre
                  </h2>

                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-800">
                          Service qui vous intéresse *
                        </FormLabel>
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
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-800">
                          Contexte ou attentes (optionnel)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Partagez vos objectifs ou questions clés pour préparer notre échange..."
                            className={`${luxInput} min-h-[100px]`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full lux-btn-primary !py-6 text-base">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Confirmation en cours...
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
          </div>

          <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-5">
            <div className="lux-section-premium !p-0 overflow-hidden">
              <div className="h-1.5 w-full bg-[var(--brand-blue)]" aria-hidden />
              <div className="p-6 space-y-5">
                <div>
                  <p className="lux-label mb-1">Récapitulatif</p>
                  <h3 className="lux-heading text-2xl">Votre session</h3>
                </div>

                <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-slate-500">Date</span>
                    <span className="font-semibold text-slate-900 text-right capitalize">
                      {selectedDateObj ? selectedDateObj.fullLabel : "À définir"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-slate-500">Heure</span>
                    <span className="font-mono font-semibold text-[var(--brand-blue)]">
                      {selectedTimeValue} (GMT)
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-slate-500">Thématique</span>
                    <span className="font-medium text-slate-900 text-right">
                      {selectedServiceValue}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                    <span className="text-slate-500">Durée &amp; tarif</span>
                    <span className="lux-chip !py-0.5 text-[11px] font-semibold">
                      30 min · Offert
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-[var(--brand-blue)] shrink-0" />
                    <span>Visioconférence Google Meet ou appel direct</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[var(--brand-blue)] shrink-0" />
                    <span>Ou en présentiel : Cocody Bvd Koffi Gadaud</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[var(--brand-blue)] shrink-0" />
                    <span>Échange confidentiel sans engagement</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      ) : (
        <div className="lux-form-panel p-10 md:p-14 text-center max-w-2xl mx-auto">
          <div className="lux-success-badge">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold lux-heading mb-3">Rendez-vous enregistré !</h2>
          <p className="text-slate-600 mb-6 text-sm md:text-base">
            Nous avons bien reçu votre demande. Un conseiller vous confirmera ce créneau par email
            et téléphone très rapidement.
          </p>
          {bookedSummary ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left text-sm space-y-2 mb-7">
              <div className="flex justify-between">
                <span className="text-slate-500">Participant :</span>
                <span className="font-semibold text-slate-900">
                  {bookedSummary.first_name} {bookedSummary.last_name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date &amp; Heure :</span>
                <span className="font-semibold text-[var(--brand-blue)] capitalize">
                  {availableDates.find((d) => d.value === bookedSummary.preferred_date)?.fullLabel ??
                    bookedSummary.preferred_date}{" "}
                  à {bookedSummary.preferred_time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Sujet :</span>
                <span className="text-slate-900">{bookedSummary.service}</span>
              </div>
            </div>
          ) : null}
          <Button
            onClick={() => {
              setSubmitted(false);
              form.reset();
            }}
            className="lux-btn-primary"
          >
            Planifier un autre rendez-vous
          </Button>
        </div>
      )}
    </LuxPageLayout>
  );
}
