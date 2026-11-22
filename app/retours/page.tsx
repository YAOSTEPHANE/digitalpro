"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Star, Award, Users, Heart, Send, BadgeCheck, Quote } from "lucide-react";

const luxInput =
  "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400";
const luxSelectContent = "bg-white border-slate-200";

const reviewSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  company: z.string().optional(),
  rating: z.string().min(1, "Veuillez sélectionner une note"),
  service: z.string().min(1, "Veuillez sélectionner un service"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface Testimonial {
  id: string | number;
  name: string;
  company: string;
  rating: number;
  service: string;
  message: string;
  avatar: string;
  date?: string;
}

const initialTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marie Kouassi",
    company: "Tech Solutions CI",
    rating: 5,
    service: "Site Web",
    message:
      "Digitalpro Solutions a transformé notre présence en ligne. Leur équipe est rigoureuse et le résultat dépasse nos attentes en vitesse comme en conversions.",
    avatar: "MK",
    date: "Projet livré · Abidjan",
  },
  {
    id: 2,
    name: "Jean Traoré",
    company: "Boutique Moderne",
    rating: 5,
    service: "E-commerce",
    message:
      "Notre boutique Shopify est fluide et fonctionne parfaitement avec les paiements locaux. Les ventes ont progressé de 150% dès les premiers mois.",
    avatar: "JT",
    date: "Boutique en ligne",
  },
  {
    id: 3,
    name: "Sophie Diallo",
    company: "Design Studio",
    rating: 5,
    service: "Design Graphique",
    message:
      "Leur sens du détail et leur discipline typographique sont remarquables. Notre nouvelle identité visuelle a immédiatement rehaussé notre image de marque.",
    avatar: "SD",
    date: "Direction Artistique",
  },
  {
    id: 4,
    name: "Amadou Koné",
    company: "Startup Innovante",
    rating: 5,
    service: "SEO & Marketing",
    message:
      "Grâce à leur stratégie SEO structurée, nous sommes passés en première page Google sur nos mots-clés prioritaires avec des leads entrants qualifiés.",
    avatar: "AK",
    date: "Acquisition & SEO",
  },
];

const serviceLabels: Record<string, string> = {
  "site-web": "Site Web",
  "e-commerce": "E-commerce",
  design: "Design Graphique",
  seo: "SEO & Marketing",
  autre: "Autre",
};

const stats = [
  { label: "Clients satisfaits", value: "98%", icon: Heart },
  { label: "Projets réalisés", value: "500+", icon: Award },
  { label: "Note moyenne", value: "4.9/5", icon: Star },
  { label: "Années d'expérience", value: "5+", icon: Users },
];

export default function RetoursPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [serviceFilter, setServiceFilter] = useState("Tous");
  const [reviews, setReviews] = useState<Testimonial[]>(initialTestimonials);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("digitalpro_reviews");
      if (saved) {
        const parsed = JSON.parse(saved) as Testimonial[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews([...parsed, ...initialTestimonials]);
        }
      }
    } catch {
      // Ignore storage error
    }
  }, []);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      rating: "5",
      service: "",
      message: "",
    },
  });

  const selectedRating = Number(form.watch("rating") || 0);

  const filteredReviews = useMemo(
    () =>
      serviceFilter === "Tous"
        ? reviews
        : reviews.filter((r) => r.service === serviceFilter),
    [reviews, serviceFilter]
  );

  const onSubmit = async (data: ReviewFormValues) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      const initials = data.name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("");

      const newReview: Testimonial = {
        id: `rev-${Date.now()}`,
        name: data.name.trim(),
        company: data.company?.trim() || "Client vérifié",
        rating: Number(data.rating),
        service: serviceLabels[data.service] ?? data.service,
        message: data.message.trim(),
        avatar: initials || "DP",
        date: "Publié à l'instant",
      };

      setReviews((prev) => [newReview, ...prev]);

      try {
        const existingSaved = JSON.parse(
          localStorage.getItem("digitalpro_reviews") || "[]"
        ) as Testimonial[];
        localStorage.setItem(
          "digitalpro_reviews",
          JSON.stringify([newReview, ...existingSaved])
        );
      } catch {
        // Ignore storage errors
      }

      toast.success("Merci ! Votre avis vient d'être ajouté à notre mur de témoignages.");
      form.reset({
        name: "",
        email: "",
        company: "",
        rating: "5",
        service: "",
        message: "",
      });
    } catch {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LuxPageLayout breadcrumb="Retours Clients">
      <LuxSectionHeader
        indexLabel="01"
        label="Preuve sociale"
        title="Partagez votre expérience avec nous"
        description="Découvrez les retours authentiques de nos clients et laissez votre évaluation sur nos réalisations."
        align="center"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-12">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <LuxReveal key={stat.label} delay={index * 0.06}>
              <div className="lux-card-kpi p-5 md:p-6 text-center">
                <div className="lux-icon-badge inline-flex mb-3">
                  <Icon className="w-6 h-6 text-[var(--brand-blue)]" />
                </div>
                <div className="lux-stat-number mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-medium text-slate-600">{stat.label}</div>
              </div>
            </LuxReveal>
          );
        })}
      </div>

      {/* Répartition des notes */}
      <LuxReveal className="mb-14">
        <div className="lux-section-premium grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-slate-200 pb-6 md:pb-0 md:pr-8">
            <p className="lux-label mb-2">Score de satisfaction</p>
            <div className="font-display text-5xl font-bold text-slate-900 tabular-nums">
              4.9 <span className="text-xl text-slate-500 font-normal">/ 5</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-1 my-2.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600">Basé sur l&apos;ensemble des projets accompagnés</p>
          </div>
          <div className="md:col-span-8 space-y-2.5">
            {[
              { stars: 5, pct: 92 },
              { stars: 4, pct: 7 },
              { stars: 3, pct: 1 },
              { stars: 2, pct: 0 },
              { stars: 1, pct: 0 },
            ].map((row) => (
              <div key={row.stars} className="flex items-center gap-3 text-xs">
                <span className="w-8 font-mono font-semibold text-slate-900">{row.stars}★</span>
                <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${row.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="h-full rounded-full bg-[var(--brand-blue)]"
                  />
                </div>
                <span className="w-10 text-right font-mono text-slate-600 tabular-nums">
                  {row.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </LuxReveal>

      <LuxSectionHeader
        indexLabel="02"
        label="Témoignages"
        title="Ce que disent nos clients"
        description="Filtrez par pôle d'expertise pour consulter les retours les plus pertinents."
        align="center"
      />

      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {["Tous", "Site Web", "E-commerce", "Design Graphique", "SEO & Marketing"].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setServiceFilter(tab)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${serviceFilter === tab
              ? "lux-chip-active"
              : "lux-chip hover:border-[var(--brand-blue)]"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-16">
        {filteredReviews.map((testimonial, index) => (
          <LuxReveal key={testimonial.id} delay={index * 0.05}>
            <article
              className={`lux-card-interactive p-6 md:p-7 h-full flex flex-col justify-between ${
                index % 2 === 1 ? "lux-card-accent-red" : ""
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl lux-icon-badge flex items-center justify-center text-[var(--brand-blue)] font-display font-bold text-base shrink-0">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-bold lux-heading">{testimonial.name}</h3>
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                          <BadgeCheck className="w-3 h-3" />
                          Vérifié
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{testimonial.company}</p>
                    </div>
                  </div>
                  <Quote
                    className={`w-6 h-6 shrink-0 ${
                      index % 2 === 1
                        ? "text-[var(--brand-red)]/30"
                        : "text-[var(--brand-blue)]/30"
                    }`}
                  />
                </div>

                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="lux-chip !text-[10px] !py-0.5">{testimonial.service}</span>
                </div>

                <p className="text-slate-700 text-sm md:text-[15px] leading-relaxed">
                  &ldquo;{testimonial.message}&rdquo;
                </p>
              </div>

              {testimonial.date ? (
                <p className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-500">
                  {testimonial.date}
                </p>
              ) : null}
            </article>
          </LuxReveal>
        ))}
      </div>

      <LuxReveal>
        <section className="max-w-3xl mx-auto">
          <div className="lux-form-panel p-7 md:p-10">
            <div className="text-center mb-8">
              <span className="lux-chip text-[11px] mb-3 inline-block">Votre feedback compte</span>
              <h2 className="text-3xl md:text-4xl font-bold lux-heading mb-2">Laissez votre avis</h2>
              <p className="text-slate-600 text-sm">
                Partagez votre expérience pour aider d&apos;autres dirigeants à choisir leur partenaire digital.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-800">Nom complet *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Votre nom" className={luxInput} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-800">Email *</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder="votre@email.com" className={luxInput} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-800">Entreprise (optionnel)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Nom de votre entreprise" className={luxInput} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-800">Service utilisé *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className={luxInput}>
                              <SelectValue placeholder="Sélectionnez un service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className={luxSelectContent}>
                            <SelectItem value="site-web">Site Web</SelectItem>
                            <SelectItem value="e-commerce">E-commerce</SelectItem>
                            <SelectItem value="design">Design Graphique</SelectItem>
                            <SelectItem value="seo">SEO & Marketing</SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-800">Votre note *</FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                          <div className="flex items-center gap-1.5">
                            {[1, 2, 3, 4, 5].map((star) => {
                              const active = (hoverRating || selectedRating) >= star;
                              return (
                                <button
                                  key={star}
                                  type="button"
                                  onMouseEnter={() => setHoverRating(star)}
                                  onMouseLeave={() => setHoverRating(0)}
                                  onClick={() => field.onChange(String(star))}
                                  aria-label={`Donner ${star} étoile${star > 1 ? "s" : ""}`}
                                  className="p-1 transition-transform hover:scale-110"
                                >
                                  <Star
                                    className={`w-6 h-6 transition-colors ${active ? "fill-amber-400 text-amber-400" : "text-slate-300"
                                      }`}
                                  />
                                </button>
                              );
                            })}
                          </div>
                          <span className="text-xs font-semibold text-slate-700">
                            {selectedRating === 5 && "5/5 — Excellent"}
                            {selectedRating === 4 && "4/5 — Très bien"}
                            {selectedRating === 3 && "3/5 — Bien"}
                            {selectedRating === 2 && "2/5 — Moyen"}
                            {selectedRating === 1 && "1/5 — À améliorer"}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-800">Votre avis *</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Décrivez ce que vous avez apprécié dans notre collaboration..."
                          rows={5}
                          className={`${luxInput} resize-none`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full lux-btn-primary !py-6 text-base"
                >
                  {isSubmitting ? (
                    "Publication en cours..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Publier mon avis
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </section>
      </LuxReveal>
    </LuxPageLayout>
  );
}
