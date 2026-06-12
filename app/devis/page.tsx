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
  CheckCircle,
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
    } catch {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <LuxPageLayout maxWidth="5xl">
      <LuxSectionHeader
        label="Demande de devis"
        title="Obtenez votre devis gratuit"
        description="Remplissez ce formulaire détaillé et recevez un devis personnalisé dans les 24 heures. Notre équipe analysera votre projet et vous proposera la meilleure solution."
        align="center"
      />

      <LuxReveal>
        <section className="mb-10 lux-section-premium">
          <h2 className="text-2xl font-semibold lux-heading mb-3">
            Comment nous construisons votre devis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              "Analyse de vos objectifs business et de vos priorités",
              "Estimation par lots : conception, développement, contenu, optimisation",
              "Feuille de route avec délais, livrables et options d'évolution",
            ].map((step, index) => (
              <p key={step} className="text-sm lux-muted lux-card-interactive p-4">
                <span className="font-semibold text-[var(--lux-champagne)]">Étape {index + 1} :</span>{" "}
                {step}
              </p>
            ))}
          </div>
        </section>
      </LuxReveal>

      {!submitted ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 lux-form-panel"
          >
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
                  <Target className="w-5 h-5 text-[var(--brand-blue-light)]" />
                </span>
                Détails du projet
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[var(--lux-champagne)]">Service demandé *</FormLabel>
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
                  name="project_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[var(--lux-champagne)]">Type de projet *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className={luxInput}>
                            <SelectValue placeholder="Sélectionnez un type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className={luxSelectContent}>
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
                      <FormLabel className="text-[var(--lux-champagne)] flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Budget estimé *
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className={luxInput}>
                            <SelectValue placeholder="Sélectionnez une fourchette" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className={luxSelectContent}>
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
                      <FormLabel className="text-[var(--lux-champagne)] flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Délai souhaité *
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className={luxInput}>
                            <SelectValue placeholder="Sélectionnez un délai" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className={luxSelectContent}>
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
                    <FormLabel className="text-[var(--lux-champagne)] flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Description du projet *
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Décrivez votre projet en détail : objectifs, fonctionnalités souhaitées, public cible, etc."
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
                    <FormLabel className="text-[var(--lux-champagne)]">Fonctionnalités spécifiques</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Listez les fonctionnalités importantes pour votre projet (ex: paiement en ligne, authentification utilisateur, tableau de bord admin, etc.)"
                        className={`${luxInput} min-h-[100px]`}
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
                    <FormLabel className="text-[var(--lux-champagne)] flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Informations complémentaires
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Toute autre information que vous souhaitez partager (références, contraintes techniques, préférences, etc.)"
                        className={`${luxInput} min-h-[100px]`}
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
                  Demander mon devis gratuit
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
            <h2 className="text-3xl font-bold lux-heading mb-4">Demande de devis envoyée !</h2>
            <p className="lux-muted mb-8">
              Merci pour votre demande de devis. Notre équipe va analyser votre projet
              et vous enverra un devis personnalisé dans les 24 heures.
            </p>
            <div className="space-y-4">
              <div className="rounded-lg lux-card-interactive p-4 text-left">
                <h3 className="lux-heading font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[var(--brand-blue-light)]" />
                  Prochaines étapes
                </h3>
                <ul className="space-y-2 text-sm lux-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--brand-blue-light)]">•</span>
                    <span>Vous recevrez une confirmation par email</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--brand-blue-light)]">•</span>
                    <span>Notre équipe analysera votre projet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--brand-blue-light)]">•</span>
                    <span>Un devis détaillé vous sera envoyé sous 24h</span>
                  </li>
                </ul>
              </div>
              <Button
                onClick={() => {
                  setSubmitted(false);
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
