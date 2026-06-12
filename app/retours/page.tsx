"use client";

import { useState } from "react";
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
import { Star, Award, Users, Heart, Send } from "lucide-react";

const luxInput =
  "bg-[rgba(255,255,255,0.04)] border-[rgba(81,102,153,0.35)] text-[var(--lux-champagne)] placeholder:text-[var(--lux-muted)]";
const luxSelectContent = "bg-[rgba(22,25,36,0.98)] border-[rgba(81,102,153,0.35)]";

const reviewSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  company: z.string().optional(),
  rating: z.string().min(1, "Veuillez sélectionner une note"),
  service: z.string().min(1, "Veuillez sélectionner un service"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

const testimonials = [
  {
    id: 1,
    name: "Marie Kouassi",
    company: "Tech Solutions CI",
    rating: 5,
    service: "Site Web",
    message:
      "Digitalpro Solutions a transformé notre présence en ligne. Leur équipe est professionnelle et le résultat dépasse nos attentes. Je recommande vivement leurs services !",
    avatar: "MK",
  },
  {
    id: 2,
    name: "Jean Traoré",
    company: "Boutique Moderne",
    rating: 5,
    service: "E-commerce",
    message:
      "Notre boutique Shopify est magnifique et fonctionne parfaitement. Les ventes ont augmenté de 150% depuis le lancement. Un service exceptionnel !",
    avatar: "JT",
  },
  {
    id: 3,
    name: "Sophie Diallo",
    company: "Design Studio",
    rating: 5,
    service: "Design Graphique",
    message:
      "Leur créativité et leur attention aux détails sont remarquables. Notre nouvelle identité visuelle a vraiment renforcé notre image de marque.",
    avatar: "SD",
  },
  {
    id: 4,
    name: "Amadou Koné",
    company: "Startup Innovante",
    rating: 5,
    service: "SEO & Marketing",
    message:
      "Grâce à leur stratégie SEO, nous sommes maintenant en première page de Google. Leur expertise en marketing digital est impressionnante.",
    avatar: "AK",
  },
];

const stats = [
  { label: "Clients satisfaits", value: "98%", icon: Heart },
  { label: "Projets réalisés", value: "500+", icon: Award },
  { label: "Note moyenne", value: "4.9/5", icon: Star },
  { label: "Années d'expérience", value: "5+", icon: Users },
];

export default function RetoursPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      rating: "",
      service: "",
      message: "",
    },
  });

  const onSubmit = async (_data: ReviewFormValues) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Merci pour votre retour ! Votre avis a été enregistré.");
      form.reset();
    } catch {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LuxPageLayout>
      <LuxSectionHeader
        label="Vos retours nous importent"
        title="Partagez votre expérience avec nous"
        description="Votre avis compte ! Partagez votre expérience avec Digitalpro Solutions et aidez d'autres entreprises à découvrir nos services."
        align="center"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <LuxReveal key={stat.label} delay={index * 0.08}>
              <div className="lux-card-interactive p-6 text-center">
                <div className="lux-icon-badge inline-flex mb-3">
                  <Icon className="w-8 h-8 text-[var(--brand-blue-light)]" />
                </div>
                <div className="text-3xl md:text-4xl font-bold lux-heading mb-2">{stat.value}</div>
                <div className="text-sm lux-muted">{stat.label}</div>
              </div>
            </LuxReveal>
          );
        })}
      </div>

      <LuxSectionHeader
        label="Témoignages"
        title="Ce que disent nos clients"
        description="Découvrez les témoignages de nos clients satisfaits"
        align="center"
      />

      <div className="grid md:grid-cols-2 gap-6 mb-20">
        {testimonials.map((testimonial, index) => (
          <LuxReveal key={testimonial.id} delay={index * 0.08}>
            <article className="lux-card-interactive p-6 md:p-8 h-full">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full lux-icon-badge flex items-center justify-center text-[var(--lux-champagne)] font-bold text-lg flex-shrink-0">
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-lg font-semibold lux-heading">{testimonial.name}</h3>
                    <span className="text-sm lux-muted">- {testimonial.company}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="text-xs text-[var(--brand-blue-light)] mb-3">
                    Service : {testimonial.service}
                  </div>
                </div>
              </div>
              <p className="lux-muted leading-relaxed">{testimonial.message}</p>
            </article>
          </LuxReveal>
        ))}
      </div>

      <LuxReveal>
        <section className="max-w-3xl mx-auto">
          <div className="lux-form-panel p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold lux-heading mb-4">Laissez votre avis</h2>
              <p className="lux-muted">Partagez votre expérience et aidez-nous à nous améliorer</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[var(--lux-champagne)]">Nom complet *</FormLabel>
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
                        <FormLabel className="text-[var(--lux-champagne)]">Email *</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder="votre@email.com" className={luxInput} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[var(--lux-champagne)]">Entreprise (optionnel)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Nom de votre entreprise" className={luxInput} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[var(--lux-champagne)]">Service utilisé *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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

                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[var(--lux-champagne)]">Note *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className={luxInput}>
                              <SelectValue placeholder="Votre note" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className={luxSelectContent}>
                            {[5, 4, 3, 2, 1].map((rating) => (
                              <SelectItem key={rating} value={rating.toString()}>
                                <div className="flex items-center gap-2">
                                  {[...Array(rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  ))}
                                  {rating === 5 && " Excellent"}
                                  {rating === 4 && " Très bien"}
                                  {rating === 3 && " Bien"}
                                  {rating === 2 && " Moyen"}
                                  {rating === 1 && " Insuffisant"}
                                </div>
                              </SelectItem>
                            ))}
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
                      <FormLabel className="text-[var(--lux-champagne)]">Votre avis *</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Partagez votre expérience avec nous..."
                          rows={6}
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
                  className="w-full lux-btn-primary !py-6 text-lg"
                >
                  {isSubmitting ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Envoyer mon avis
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
