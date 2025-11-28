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
  DollarSign,
  Calendar,
  Target,
  FileText,
  Sparkles,
  CheckCircle
} from "lucide-react";
import Navbar from "@/components/navbar";
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

const QuoteSchema = z.object({
  first_name: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  last_name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
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
  project_type: z.enum([
    "Nouveau projet",
    "Refonte / Amélioration",
    "Maintenance",
    "Consultation",
  ]),
  budget_range: z.enum([
    "Moins de 500.000 F",
    "500.000 F - 1.000.000 F",
    "1.000.000 F - 2.500.000 F",
    "2.500.000 F - 5.000.000 F",
    "Plus de 5.000.000 F",
    "À discuter",
  ]),
  timeline: z.enum([
    "Urgent (moins de 1 mois)",
    "1-3 mois",
    "3-6 mois",
    "6-12 mois",
    "Plus de 12 mois",
    "Flexible",
  ]),
  features: z.string().optional(),
  project_description: z.string().min(20, "Veuillez décrire votre projet en au moins 20 caractères"),
  additional_info: z.string().optional(),
  terms: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les conditions pour continuer",
  }),
});

type QuoteValues = z.infer<typeof QuoteSchema>;

export default function QuoteForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  async function onSubmit(data: QuoteValues) {
    try {
      setLoading(true);
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Une erreur est survenue");
      }

      setSubmitted(true);
      toast.success("Demande de devis envoyée avec succès !");
      form.reset();
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Navbar
        scrollToWebsiteDesign={() => {}}
        scrollToGraphicDesign={() => {}}
        scrollToShopifyStores={() => {}}
        scrollToBrands={() => {}}
        scrollToServices={() => {}}
      />

      <div className="max-w-5xl mx-auto px-4 py-10 md:py-20">
        {/* En-tête */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
            <DollarSign className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Demande de devis</span>
          </div>
          
          <h1 className="text-4xl pb-5 md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 mb-4">
            Obtenez votre devis gratuit
          </h1>
          
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
            Remplissez ce formulaire détaillé et recevez un devis personnalisé dans les 24 heures. 
            Notre équipe analysera votre projet et vous proposera la meilleure solution.
          </p>
        </div>

        {!submitted ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 md:p-10"
            >
              {/* Informations personnelles */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-purple-400" />
                  Informations personnelles
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Prénom *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Votre prénom"
                            className="bg-neutral-800 border-neutral-700 text-white"
                          />
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
                        <FormLabel className="text-white">Nom *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Votre nom"
                            className="bg-neutral-800 border-neutral-700 text-white"
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email *
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="votre@email.com"
                            className="bg-neutral-800 border-neutral-700 text-white"
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
                        <FormLabel className="text-white flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Téléphone *
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            placeholder="+225 XX XX XX XX XX"
                            className="bg-neutral-800 border-neutral-700 text-white"
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
                        <FormLabel className="text-white flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          Entreprise
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Nom de votre entreprise"
                            className="bg-neutral-800 border-neutral-700 text-white"
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
                        <FormLabel className="text-white">Poste</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Votre poste"
                            className="bg-neutral-800 border-neutral-700 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Détails du projet */}
              <div className="space-y-4 pt-6 border-t border-neutral-800">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-purple-400" />
                  Détails du projet
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Service demandé *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                              <SelectValue placeholder="Sélectionnez un service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-neutral-800 border-neutral-700">
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
                    name="project_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Type de projet *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                              <SelectValue placeholder="Sélectionnez un type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-neutral-800 border-neutral-700">
                            <SelectItem value="Nouveau projet">Nouveau projet</SelectItem>
                            <SelectItem value="Refonte / Amélioration">Refonte / Amélioration</SelectItem>
                            <SelectItem value="Maintenance">Maintenance</SelectItem>
                            <SelectItem value="Consultation">Consultation</SelectItem>
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
                        <FormLabel className="text-white flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Budget estimé *
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                              <SelectValue placeholder="Sélectionnez une fourchette" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-neutral-800 border-neutral-700">
                            <SelectItem value="Moins de 500.000 F">Moins de 500.000 F</SelectItem>
                            <SelectItem value="500.000 F - 1.000.000 F">500.000 F - 1.000.000 F</SelectItem>
                            <SelectItem value="1.000.000 F - 2.500.000 F">1.000.000 F - 2.500.000 F</SelectItem>
                            <SelectItem value="2.500.000 F - 5.000.000 F">2.500.000 F - 5.000.000 F</SelectItem>
                            <SelectItem value="Plus de 5.000.000 F">Plus de 5.000.000 F</SelectItem>
                            <SelectItem value="À discuter">À discuter</SelectItem>
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
                        <FormLabel className="text-white flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Délai souhaité *
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                              <SelectValue placeholder="Sélectionnez un délai" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-neutral-800 border-neutral-700">
                            <SelectItem value="Urgent (moins de 1 mois)">Urgent (moins de 1 mois)</SelectItem>
                            <SelectItem value="1-3 mois">1-3 mois</SelectItem>
                            <SelectItem value="3-6 mois">3-6 mois</SelectItem>
                            <SelectItem value="6-12 mois">6-12 mois</SelectItem>
                            <SelectItem value="Plus de 12 mois">Plus de 12 mois</SelectItem>
                            <SelectItem value="Flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="project_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Description du projet *
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Décrivez votre projet en détail : objectifs, fonctionnalités souhaitées, public cible, etc."
                          className="bg-neutral-800 border-neutral-700 text-white min-h-[120px]"
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
                      <FormLabel className="text-white">Fonctionnalités spécifiques</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Listez les fonctionnalités importantes pour votre projet (ex: paiement en ligne, authentification utilisateur, tableau de bord admin, etc.)"
                          className="bg-neutral-800 border-neutral-700 text-white min-h-[100px]"
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
                      <FormLabel className="text-white flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Informations complémentaires
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Toute autre information que vous souhaitez partager (références, contraintes techniques, préférences, etc.)"
                          className="bg-neutral-800 border-neutral-700 text-white min-h-[100px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Conditions */}
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-1 border-neutral-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 bg-neutral-800"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-white cursor-pointer">
                        J&apos;accepte que digitalpro solutions traite mes données personnelles 
                        conformément à la politique de confidentialité. *
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Bouton de soumission */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-6 text-lg"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    Demander mon devis gratuit
                    <Send className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        ) : (
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-10 md:p-16 text-center">
            <div className="max-w-md mx-auto">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Demande de devis envoyée !
              </h2>
              <p className="text-neutral-300 mb-8">
                Merci pour votre demande de devis. Notre équipe va analyser votre projet 
                et vous enverra un devis personnalisé dans les 24 heures.
              </p>
              <div className="space-y-4">
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-left">
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                    Prochaines étapes
                  </h3>
                  <ul className="space-y-2 text-sm text-neutral-300">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">•</span>
                      <span>Vous recevrez une confirmation par email</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">•</span>
                      <span>Notre équipe analysera votre projet</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">•</span>
                      <span>Un devis détaillé vous sera envoyé sous 24h</span>
                    </li>
                  </ul>
                </div>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    form.reset();
                  }}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  Demander un autre devis
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


