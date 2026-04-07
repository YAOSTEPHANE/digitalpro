"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import ModernNavbar from "@/components/modern-navbar";
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
import { Star, Quote, Award, Users, Heart, Send } from "lucide-react";
import { motion } from "framer-motion";
import StarsBackground from "@/components/stars-background";

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
    message: "Digitalpro Solutions a transformé notre présence en ligne. Leur équipe est professionnelle et le résultat dépasse nos attentes. Je recommande vivement leurs services !",
    avatar: "MK",
  },
  {
    id: 2,
    name: "Jean Traoré",
    company: "Boutique Moderne",
    rating: 5,
    service: "E-commerce",
    message: "Notre boutique Shopify est magnifique et fonctionne parfaitement. Les ventes ont augmenté de 150% depuis le lancement. Un service exceptionnel !",
    avatar: "JT",
  },
  {
    id: 3,
    name: "Sophie Diallo",
    company: "Design Studio",
    rating: 5,
    service: "Design Graphique",
    message: "Leur créativité et leur attention aux détails sont remarquables. Notre nouvelle identité visuelle a vraiment renforcé notre image de marque.",
    avatar: "SD",
  },
  {
    id: 4,
    name: "Amadou Koné",
    company: "Startup Innovante",
    rating: 5,
    service: "SEO & Marketing",
    message: "Grâce à leur stratégie SEO, nous sommes maintenant en première page de Google. Leur expertise en marketing digital est impressionnante.",
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
      // Simuler l'envoi du formulaire
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Merci pour votre retour ! Votre avis a été enregistré.");
      form.reset();
    } catch (_error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToServices = () => {};
  const scrollToWebsiteDesign = () => {};
  const scrollToGraphicDesign = () => {};
  const scrollToShopifyStores = () => {};
  const scrollToBrands = () => {};

  return (
    <div className="w-full min-h-screen bg-slate-50 antialiased relative overflow-hidden">
      <StarsBackground />
      <ModernNavbar
        scrollToServices={scrollToServices}
        scrollToWebsiteDesign={scrollToWebsiteDesign}
        scrollToGraphicDesign={scrollToGraphicDesign}
        scrollToShopifyStores={scrollToShopifyStores}
        scrollToBrands={scrollToBrands}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full mb-6 backdrop-blur-md">
              <Quote className="w-4 h-4 text-cyan-300" />
              <span className="text-sm text-slate-700">Vos retours nous importent</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6">
              Partagez votre
              <span className="block bg-gradient-to-r from-amber-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                expérience avec nous
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              Votre avis compte ! Partagez votre expérience avec Digitalpro Solutions et aidez d'autres entreprises à découvrir nos services.
            </p>
          </motion.div>

          {/* Statistiques */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="bg-white border border-slate-200 rounded-xl p-6 text-center backdrop-blur-md shadow-sm"
                >
                  <Icon className="w-8 h-8 text-cyan-300 mx-auto mb-3" />
                  <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-lg text-slate-600">
              Découvrez les témoignages de nos clients satisfaits
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-20">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 backdrop-blur-md shadow-sm"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-black font-bold text-lg flex-shrink-0">
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {testimonial.name}
                      </h3>
                      <span className="text-sm text-slate-500">
                        - {testimonial.company}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <div className="text-xs text-cyan-300 mb-3">
                      Service : {testimonial.service}
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed">{testimonial.message}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire de retour */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-slate-200 rounded-2xl p-8 md:p-12 backdrop-blur-md shadow-sm"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Laissez votre avis
              </h2>
              <p className="text-slate-600">
                Partagez votre expérience et aidez-nous à nous améliorer
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-800">Nom complet *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Votre nom"
                            className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-500"
                          />
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
                          <Input
                            {...field}
                            type="email"
                            placeholder="votre@email.com"
                            className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-500"
                          />
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
                      <FormLabel className="text-slate-800">Entreprise (optionnel)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Nom de votre entreprise"
                          className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-500"
                        />
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
                        <FormLabel className="text-slate-800">Service utilisé *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white border-slate-300 text-slate-900">
                              <SelectValue placeholder="Sélectionnez un service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white border-slate-300">
                            <SelectItem value="site-web" className="text-slate-900">
                              Site Web
                            </SelectItem>
                            <SelectItem value="e-commerce" className="text-slate-900">
                              E-commerce
                            </SelectItem>
                            <SelectItem value="design" className="text-slate-900">
                              Design Graphique
                            </SelectItem>
                            <SelectItem value="seo" className="text-slate-900">
                              SEO & Marketing
                            </SelectItem>
                            <SelectItem value="autre" className="text-slate-900">
                              Autre
                            </SelectItem>
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
                        <FormLabel className="text-slate-800">Note *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white border-slate-300 text-slate-900">
                              <SelectValue placeholder="Votre note" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white border-slate-300">
                            {[5, 4, 3, 2, 1].map((rating) => (
                              <SelectItem
                                key={rating}
                                value={rating.toString()}
                                className="text-slate-900"
                              >
                                <div className="flex items-center gap-2">
                                  {[...Array(rating)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                    />
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
                      <FormLabel className="text-slate-800">Votre avis *</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Partagez votre expérience avec nous..."
                          rows={6}
                          className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-500 resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-indigo-500 to-cyan-400 hover:brightness-110 text-black font-semibold py-6 text-lg"
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
          </motion.div>
        </div>
      </section>
    </div>
  );
}



