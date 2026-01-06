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
  Sparkles
} from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

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
    <div className="w-full min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <ModernNavbar
        scrollToWebsiteDesign={() => {}}
        scrollToGraphicDesign={() => {}}
        scrollToShopifyStores={() => {}}
        scrollToBrands={() => {}}
        scrollToServices={() => {}}
      />

      <div className="max-w-7xl mx-auto px-4 py-10 md:py-20">
        {/* En-tête */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-red-400" />
            <span className="text-sm text-red-300">Contactez-nous</span>
          </div>
          
          <h1 className="text-4xl pb-5 md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 mb-4">
            Parlons de votre projet
          </h1>
          
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
            Remplissez le formulaire ci-dessous et notre équipe vous contactera dans les 24 heures. 
            Nous sommes là pour transformer vos idées en réalité digitale.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informations de contact */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Nos coordonnées</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-red-500/10 p-3 rounded-lg">
                    <Mail className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Email</h3>
                    <a 
                      href="mailto:digitalprosolutions27@gmail.com" 
                      className="text-neutral-400 hover:text-red-400 transition-colors"
                    >
                      digitalprosolutions27@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-red-500/10 p-3 rounded-lg">
                    <Phone className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Téléphone</h3>
                    <a 
                      href="tel:+2250748976031" 
                      className="text-neutral-400 hover:text-red-400 transition-colors"
                    >
                      +225 07 48 97 60 31
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-red-500/10 p-3 rounded-lg">
                    <MapPin className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Adresse</h3>
                    <p className="text-neutral-400">
                      Bvd Koffi Gadaud, Cocody<br />
                      Abidjan, Côte d&apos;Ivoire
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-red-500/10 p-3 rounded-lg">
                    <Clock className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Horaires</h3>
                    <p className="text-neutral-400">
                      Lundi - Vendredi: 9h - 18h<br />
                      Samedi: 9h - 13h
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Avantages */}
            <div className="bg-gradient-to-br from-red-600/10 to-blue-600/10 border border-red-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Pourquoi nous choisir ?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-neutral-300 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Réponse sous 24h</span>
                </li>
                <li className="flex items-start gap-2 text-neutral-300 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Consultation gratuite</span>
                </li>
                <li className="flex items-start gap-2 text-neutral-300 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Solutions sur mesure</span>
                </li>
                <li className="flex items-start gap-2 text-neutral-300 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Support dédié</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Formulaire */}
          <div className="lg:col-span-2">
            {!submitted ? (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6 bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 md:p-10"
                >
                  {/* Informations personnelles */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
                      <User className="w-5 h-5 text-red-400" />
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
                              Téléphone
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
                      <MessageSquare className="w-5 h-5 text-red-400" />
                      Détails du projet
                    </h2>

                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Service qui vous intéresse *</FormLabel>
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
                      name="help"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Comment pouvons-nous vous aider ? *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                                <SelectValue placeholder="Sélectionnez une option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-neutral-800 border-neutral-700">
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
                          <FormLabel className="text-white">Message *</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Décrivez votre projet, vos besoins ou posez-nous vos questions..."
                              className="bg-neutral-800 border-neutral-700 text-white min-h-[120px]"
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
                            className="mt-1 border-neutral-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 bg-neutral-800"
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
                    className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-semibold py-6 text-lg"
                  >
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
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-10 md:p-16 text-center">
                <div className="max-w-md mx-auto">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Message envoyé avec succès !
                  </h2>
                  <p className="text-neutral-300 mb-8">
                    Merci pour votre message. Notre équipe vous contactera dans les plus brefs délais, 
                    généralement sous 24 heures.
                  </p>
                  <div className="space-y-4">
                    <p className="text-sm text-neutral-400">
                      Vous recevrez une confirmation par email à l&apos;adresse que vous avez fournie.
                    </p>
                    <Button
                      onClick={() => {
                        setSubmitted(false);
                        form.reset();
                      }}
                      className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white"
                    >
                      Envoyer un autre message
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
