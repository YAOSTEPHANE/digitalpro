"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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
  DollarSign,
  Calendar,
  Target,
  FileText,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Check,
  Sparkles,
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

const SERVICE_VALUES = [
  "Développement de site web",
  "Développement d'application mobile",
  "SEO & Référencement",
  "Marketing sur les médias sociaux",
  "Conception UI/UX",
  "Conception d'identité visuelle",
  "Maintenance informatique",
  "E-commerce",
  "Autre",
] as const;

const PROJECT_TYPES = [
  "Nouveau projet",
  "Refonte / Amélioration",
  "Maintenance",
  "Consultation",
] as const;

const BUDGET_RANGES = [
  "Moins de 500.000 F",
  "500.000 F - 1.000.000 F",
  "1.000.000 F - 2.500.000 F",
  "2.500.000 F - 5.000.000 F",
  "Plus de 5.000.000 F",
  "À discuter",
] as const;

const TIMELINES = [
  "Urgent (moins de 1 mois)",
  "1-3 mois",
  "3-6 mois",
  "6-12 mois",
  "Plus de 12 mois",
  "Flexible",
] as const;

const QuoteSchema = z.object({
  first_name: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  last_name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  company_name: z.string().optional(),
  job_title: z.string().optional(),
  service: z.enum(SERVICE_VALUES),
  project_type: z.enum(PROJECT_TYPES),
  budget_range: z.enum(BUDGET_RANGES),
  timeline: z.enum(TIMELINES),
  features: z.string().optional(),
  project_description: z.string().min(20, "Veuillez décrire votre projet en au moins 20 caractères"),
  additional_info: z.string().optional(),
  terms: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les conditions pour continuer",
  }),
});

type QuoteValues = z.infer<typeof QuoteSchema>;

function mapEstimateToBudget(estimateStr: string | null): (typeof BUDGET_RANGES)[number] | undefined {
  const num = Number(estimateStr);
  if (!num || Number.isNaN(num)) return undefined;
  if (num < 500_000) return "Moins de 500.000 F";
  if (num <= 1_000_000) return "500.000 F - 1.000.000 F";
  if (num <= 2_500_000) return "1.000.000 F - 2.500.000 F";
  if (num <= 5_000_000) return "2.500.000 F - 5.000.000 F";
  return "Plus de 5.000.000 F";
}

function QuoteStudioInner() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const hasPrefill = Boolean(searchParams.get("estimate") || searchParams.get("offre"));

  const form = useForm<QuoteValues>({
    resolver: zodResolver(QuoteSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      company_name: "",
      job_title: "",
      service: "Développement de site web",
      project_type: "Nouveau projet",
      budget_range: "À discuter",
      timeline: "Flexible",
      features: "",
      project_description: "",
      additional_info: "",
      terms: false,
    },
  });

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    const typeParam = searchParams.get("type");
    const tierParam = searchParams.get("tier");
    const estimateParam = searchParams.get("estimate");
    const addonsParam = searchParams.get("addons");
    const offreParam = searchParams.get("offre");

    if (serviceParam && SERVICE_VALUES.includes(serviceParam as (typeof SERVICE_VALUES)[number])) {
      form.setValue("service", serviceParam as QuoteValues["service"]);
    } else if (typeParam) {
      if (typeParam.toLowerCase().includes("commerce")) {
        form.setValue("service", "E-commerce");
      } else if (typeParam.toLowerCase().includes("mobile")) {
        form.setValue("service", "Développement d'application mobile");
      } else {
        form.setValue("service", "Développement de site web");
      }
    }

    const mappedBudget = mapEstimateToBudget(estimateParam);
    if (mappedBudget) {
      form.setValue("budget_range", mappedBudget);
    }

    if (addonsParam) {
      form.setValue("features", addonsParam);
    }

    if (offreParam) {
      form.setValue("additional_info", `Offre sélectionnée : ${offreParam}`);
    } else if (estimateParam && typeParam) {
      const formatted = Number(estimateParam).toLocaleString("fr-FR");
      const tierSuffix = tierParam ? ` · Accompagnement ${tierParam}` : "";
      form.setValue(
        "additional_info",
        `Simulation accueil : ${typeParam}${tierSuffix} (estimation indicative ${formatted} FCFA)`
      );
    }
  }, [searchParams, form]);

  const watchedService = form.watch("service");
  const watchedType = form.watch("project_type");
  const watchedBudget = form.watch("budget_range");
  const watchedTimeline = form.watch("timeline");

  const goNextStep = async () => {
    if (step === 1) {
      const ok = await form.trigger(["first_name", "last_name", "email", "phone"]);
      if (ok) setStep(2);
    } else if (step === 2) {
      const ok = await form.trigger(["service", "project_type", "budget_range", "timeline"]);
      if (ok) setStep(3);
    }
  };

  async function onSubmit(data: QuoteValues) {
    try {
      setLoading(true);
      const res = await fetch("/api/quote", {
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

      setSubmitted(true);
      toast.success("Demande de devis envoyée avec succès !");
      form.reset();
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
    <LuxPageLayout breadcrumb="Demander un devis">
      <LuxSectionHeader
        indexLabel="01"
        label="Demande de devis"
        title="Obtenez votre devis personnalisé sous 24h"
        description="Un parcours guidé en 3 étapes pour chiffrer précisément votre plateforme, les délais et les livrables."
        align="center"
      />

      <LuxReveal>
        <section className="mb-10 lux-section-premium !p-6 md:!p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              "Analyse de vos objectifs business et de vos priorités",
              "Découpage clair : UI/UX, développement, SEO & tests",
              "Feuille de route avec jalons, livrables et options d'évolution",
            ].map((text, index) => (
              <div key={text} className="text-sm lux-card-interactive p-4">
                <span className="font-mono text-[11px] font-semibold text-[var(--brand-blue)] block mb-1">
                  ÉTAPE 0{index + 1}
                </span>
                <p className="text-slate-700">{text}</p>
              </div>
            ))}
          </div>
        </section>
      </LuxReveal>

      {!submitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <div className="mb-3 h-1.5 w-full rounded-full bg-slate-200/80 overflow-hidden">
              <div
                className="h-full rounded-full bg-[var(--brand-blue)] transition-all duration-300"
                style={{ width: step === 1 ? "33.33%" : step === 2 ? "66.66%" : "100%" }}
              />
            </div>

            <div className="mb-6 grid grid-cols-3 gap-2">
              {[
                { id: 1 as const, label: "Coordonnées" },
                { id: 2 as const, label: "Périmètre" },
                { id: 3 as const, label: "Cahier & Envoi" },
              ].map((item) => {
                const active = step === item.id;
                const done = step > item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setStep(item.id)}
                    className={`rounded-2xl border px-3 py-3 text-left transition-all ${
                      active
                        ? "border-[var(--brand-blue)] bg-[var(--brand-blue)] text-white shadow-sm"
                        : done
                          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                          : "border-slate-200 bg-white text-slate-600 hover:border-[var(--brand-blue)]/40"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 font-mono text-[10px] opacity-85">
                      <span>0{item.id}</span>
                      {done ? <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : null}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold truncate mt-0.5">{item.label}</div>
                  </button>
                );
              })}
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 lux-form-panel">
                {step === 1 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold lux-heading flex items-center gap-2.5 mb-2">
                      <span className="lux-icon-badge">
                        <User className="w-5 h-5 text-[var(--brand-blue)]" />
                      </span>
                      Informations personnelles
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

                    <div className="pt-4 flex justify-end">
                      <Button
                        type="button"
                        onClick={goNextStep}
                        className="lux-btn-primary !px-7 !py-3 gap-2"
                      >
                        Continuer vers le périmètre
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <h2 className="text-xl font-semibold lux-heading flex items-center gap-2.5 mb-2">
                      <span className="lux-icon-badge">
                        <Target className="w-5 h-5 text-[var(--brand-blue)]" />
                      </span>
                      Détails du projet &amp; enveloppe
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-800">Service demandé *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className={luxInput}>
                                  <SelectValue placeholder="Sélectionnez un service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className={luxSelectContent}>
                                {SERVICE_VALUES.map((val) => (
                                  <SelectItem key={val} value={val}>
                                    {val}
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
                        name="project_type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-800">Type de projet *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className={luxInput}>
                                  <SelectValue placeholder="Sélectionnez un type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className={luxSelectContent}>
                                {PROJECT_TYPES.map((val) => (
                                  <SelectItem key={val} value={val}>
                                    {val}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="budget_range"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-800 flex items-center gap-2">
                              <DollarSign className="w-4 h-4" />
                              Budget estimé *
                            </FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className={luxInput}>
                                  <SelectValue placeholder="Sélectionnez une fourchette" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className={luxSelectContent}>
                                {BUDGET_RANGES.map((val) => (
                                  <SelectItem key={val} value={val}>
                                    {val}
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
                        name="timeline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-800 flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              Délai souhaité *
                            </FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className={luxInput}>
                                  <SelectValue placeholder="Sélectionnez un délai" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className={luxSelectContent}>
                                {TIMELINES.map((val) => (
                                  <SelectItem key={val} value={val}>
                                    {val}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="pt-4 flex items-center justify-between gap-3">
                      <Button
                        type="button"
                        onClick={() => setStep(1)}
                        className="lux-btn-ghost !px-5 !py-2.5 gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Retour
                      </Button>
                      <Button
                        type="button"
                        onClick={goNextStep}
                        className="lux-btn-primary !px-7 !py-3 gap-2"
                      >
                        Cahier des charges
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-5">
                    <h2 className="text-xl font-semibold lux-heading flex items-center gap-2.5 mb-2">
                      <span className="lux-icon-badge">
                        <FileText className="w-5 h-5 text-[var(--brand-blue)]" />
                      </span>
                      Description &amp; fonctionnalités
                    </h2>

                    <FormField
                      control={form.control}
                      name="project_description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-800 flex items-center gap-2">
                            Description du projet *
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Décrivez vos objectifs, votre activité, votre public cible et le résultat attendu..."
                              className={`${luxInput} min-h-[120px]`}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="features"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-800">
                            Fonctionnalités spécifiques (optionnel)
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Ex : paiement Wave / Orange Money / Stripe, espace membre, prise de RDV, multilingue..."
                              className={`${luxInput} min-h-[90px]`}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="additional_info"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-800 flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            Informations complémentaires
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Sites de référence, contraintes techniques ou précisions utiles..."
                              className={`${luxInput} min-h-[80px]`}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
                              pour établir ce devis confidentiel. *
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <Button
                        type="button"
                        onClick={() => setStep(2)}
                        className="lux-btn-ghost !px-5 !py-3 gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Retour
                      </Button>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="flex-1 lux-btn-primary !py-6 text-base"
                      >
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            Envoyer ma demande de devis
                            <Send className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </Form>
          </div>

          <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-5">
            <div className="lux-section-premium !p-0 overflow-hidden">
              <div className="h-1.5 w-full bg-[var(--brand-blue)]" aria-hidden />
              <div className="p-6 space-y-5">
                <div>
                  <p className="lux-label mb-1">Synthèse live</p>
                  <h3 className="lux-heading text-2xl">Votre configuration</h3>
                  {hasPrefill ? (
                    <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#eef2f9] border border-[rgba(81,102,153,0.22)] px-3 py-1 text-[11px] font-semibold text-[var(--brand-blue)]">
                      <Sparkles className="w-3 h-3 shrink-0" />
                      Pré-rempli depuis votre simulation
                    </div>
                  ) : null}
                </div>

                <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 text-xs md:text-sm">
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-500">Service</span>
                    <span className="font-semibold text-slate-900 text-right">{watchedService}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-500">Nature</span>
                    <span className="text-slate-900 text-right">{watchedType}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-500">Enveloppe</span>
                    <span className="font-semibold text-[var(--brand-blue)] text-right">
                      {watchedBudget}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-500">Échéance</span>
                    <span className="text-slate-900 text-right">{watchedTimeline}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[var(--brand-blue)] shrink-0" />
                    <span>Devis chiffré par lots envoyé sous 24h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[var(--brand-blue)] shrink-0" />
                    <span>Sans engagement ni frais cachés</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      ) : (
        <div className="lux-form-panel p-10 md:p-16 text-center max-w-2xl mx-auto">
          <div className="max-w-md mx-auto">
            <div className="lux-success-badge">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold lux-heading mb-4">Demande de devis envoyée !</h2>
            <p className="text-slate-600 mb-8 text-sm md:text-base">
              Merci pour votre confiance. Notre équipe analyse votre cahier des charges et vous
              enverra un devis structuré dans les 24 heures.
            </p>
            <div className="space-y-4">
              <div className="rounded-2xl lux-card-interactive p-5 text-left">
                <h3 className="lux-heading font-semibold mb-2.5 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[var(--brand-blue)]" />
                  Prochaines étapes
                </h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--brand-blue)]">•</span>
                    <span>Accusé de réception et revue technique de vos besoins</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--brand-blue)]">•</span>
                    <span>Proposition détaillée par lots + planning sous 24h</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--brand-blue)]">•</span>
                    <span>Session de validation rapide avant démarrage</span>
                  </li>
                </ul>
              </div>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                  form.reset();
                }}
                className="lux-btn-primary"
              >
                Demander un autre devis
              </Button>
            </div>
          </div>
        </div>
      )}
    </LuxPageLayout>
  );
}

export default function QuoteForm() {
  return (
    <Suspense
      fallback={
        <LuxPageLayout breadcrumb="Demander un devis">
          <div className="lux-section-premium p-12 text-center text-slate-600">
            Chargement du configurateur de devis...
          </div>
        </LuxPageLayout>
      }
    >
      <QuoteStudioInner />
    </Suspense>
  );
}
