"use client";

import { useState, useEffect } from "react";
import {
  Lightbulb,
  TrendingUp,
  Target,
  Share2,
  BarChart3,
  ArrowRight,
  Sparkles,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  CheckCircle2,
  Circle,
} from "lucide-react";
import Link from "next/link";
import Image3D from "@/components/ui/image-3d";
import type { BrandAccent } from "@/lib/brand";
import { accentBadgeClass, accentSolidBgClass, accentTextClass } from "@/lib/brand-styles";
import LuxSectionHeader from "@/components/lux-section-header";
import LuxReveal from "@/components/lux-reveal";
import { toast } from "sonner";

const marketingTips = [
  {
    day: 1,
    title: "Optimisez votre présence sur les réseaux sociaux",
    content:
      "Publiez du contenu de qualité régulièrement. La cohérence est la clé pour construire une communauté engagée et capter les meilleurs créneaux d'audience.",
    category: "Réseaux Sociaux",
    icon: Share2,
    accent: "blue" as BrandAccent,
    image: "/images/studio/social-media-ads.webp",
    actions: [
      "Planifier 3 publications piliers par semaine",
      "Répondre aux commentaires dans les 2 premières heures",
      "Adapter chaque format au canal (Reels, Carrousels)",
    ],
  },
  {
    day: 2,
    title: "Créez du contenu à forte valeur ajoutée",
    content:
      "Ne vendez pas directement, éduquez votre audience. Le contenu pédagogique génère davantage d'engagement et positionne votre entreprise comme référence.",
    category: "Contenu",
    icon: Lightbulb,
    accent: "red" as BrandAccent,
    image: "/images/studio/content-creation.webp",
    actions: [
      "Transformer vos questions clients fréquentes en guides",
      "Illustrer chaque conseil par un cas concret local",
      "Ajouter un appel à l'action clair en fin de lecture",
    ],
  },
  {
    day: 3,
    title: "Analysez vos métriques de conversion",
    content:
      "Les données sont votre meilleur levier de marge. Analysez vos tunnels chaque semaine pour supprimer les frictions et doubler sur les pages rentables.",
    category: "Analytics",
    icon: BarChart3,
    accent: "blue" as BrandAccent,
    image: "/images/studio/analytics-growth.webp",
    actions: [
      "Vérifier le taux de conversion mobile vs desktop",
      "Identifier les pages à fort rebond",
      "Suivre le coût d'acquisition par canal",
    ],
  },
  {
    day: 4,
    title: "Structurez vos objectifs SMART",
    content:
      "Spécifiques, Mesurables, Atteignables, Réalistes et Temporels. Des jalons trimestriels précis alignent votre site et vos campagnes sur votre chiffre d'affaires.",
    category: "Stratégie",
    icon: Target,
    accent: "red" as BrandAccent,
    image: "/images/studio/business-strategy.webp",
    actions: [
      "Fixer un objectif mensuel de leads qualifiés",
      "Allouer le budget selon le ROI observé",
      "Faire une revue bimensuelle des performances",
    ],
  },
  {
    day: 5,
    title: "Investissez durablement dans le SEO",
    content:
      "Le référencement naturel capte une demande intentionniste à coût marginal décroissant. Optimisez vitesse mobile, structure sémantique et pages locales.",
    category: "SEO",
    icon: TrendingUp,
    accent: "blue" as BrandAccent,
    image: "/images/studio/web-architecture.webp",
    actions: [
      "Viser un LCP mobile sous les 1.5 secondes",
      "Structurer H1/H2 autour des requêtes clients",
      "Optimiser votre fiche Google Business Abidjan",
    ],
  },
];

const categoryActionsMap: Record<string, string[]> = {
  "Réseaux Sociaux": marketingTips[0].actions,
  Contenu: marketingTips[1].actions,
  Analytics: marketingTips[2].actions,
  Stratégie: marketingTips[3].actions,
  SEO: marketingTips[4].actions,
};

const DailyMarketingTips = () => {
  const [tipIndex, setTipIndex] = useState(0);
  const [checkedActions, setCheckedActions] = useState<Record<string, boolean>>({});
  const [aiTip, setAiTip] = useState<{
    title: string;
    content: string;
    category: string;
    day: number;
    image: string;
    accent: BrandAccent;
    actions: string[];
    icon?: React.ElementType;
  } | null>(null);
  const [dayOfYear, setDayOfYear] = useState(1);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.max(1, Math.floor(diff / oneDay));
    setDayOfYear(day);

    const fetchTip = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/marketing-tip?day=${day}`);
        if (!response.ok) {
          throw new Error("Failed to fetch tip");
        }
        const data = await response.json();
        const accent: BrandAccent =
          data.accent === "red" || data.accent === "blue"
            ? data.accent
            : day % 2 === 0
              ? "blue"
              : "red";

        const categoryIcons: Record<string, React.ElementType> = {
          "Réseaux Sociaux": Share2,
          SEO: TrendingUp,
          "Email Marketing": Share2,
          Contenu: Lightbulb,
          Publicité: Target,
          Analytics: BarChart3,
          Stratégie: Target,
          Mobile: Target,
          "E-commerce": ShoppingCart,
          Vidéo: Sparkles,
          "Influence Marketing": Share2,
          "Marketing Automation": Sparkles,
        };

        setAiTip({
          ...data,
          accent,
          icon: categoryIcons[data.category] || Lightbulb,
          actions:
            categoryActionsMap[data.category] || [
              "Auditer le point de friction prioritaire",
              "Déployer une amélioration mesurable cette semaine",
              "Suivre l'impact sur les conversions à 14 jours",
            ],
        });
      } catch {
        setAiTip(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTip();
  }, []);

  const allTips = aiTip ? [aiTip, ...marketingTips] : marketingTips;
  const currentIdx = tipIndex % allTips.length;
  const currentTip = allTips[currentIdx];
  const IconComponent = currentTip.icon || Lightbulb;

  const toggleActionCheck = (actionIdx: number) => {
    const key = `${currentIdx}-${actionIdx}`;
    setCheckedActions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const completedCount = currentTip.actions.filter(
    (_, idx) => checkedActions[`${currentIdx}-${idx}`]
  ).length;
  const actionsProgressPct =
    currentTip.actions.length > 0
      ? Math.round((completedCount / currentTip.actions.length) * 100)
      : 0;
  const isAllActionsDone =
    completedCount > 0 && completedCount === currentTip.actions.length;

  const handleCopyTip = async () => {
    try {
      const checklistText = currentTip.actions.map((a) => `• ${a}`).join("\n");
      await navigator.clipboard.writeText(
        `${currentTip.title}\n\n${currentTip.content}\n\nActions clés :\n${checklistText}`
      );
      setCopied(true);
      toast.success("Plan d'action copié dans le presse-papier !");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Copie impossible.");
    }
  };

  return (
    <section id="conseil" className="relative w-full py-12 md:py-16 overflow-hidden px-2 scroll-mt-28">
      <div className="lux-section-premium lux-section-spotlight relative">
        <LuxSectionHeader
          indexLabel="06"
          label="Briefing quotidien"
          title={`Marketing Digital — Jour ${dayOfYear}/365`}
          description="Des recommandations concrètes et une checklist actionnable pour accélérer votre acquisition."
          align="center"
          accent={currentTip.accent}
        />

        {loading ? (
          <div className="max-w-5xl mx-auto">
            <div className="lux-card-interactive p-12 text-center">
              <div className="animate-pulse space-y-4">
                <div className="w-16 h-16 brand-bg-blue rounded-2xl mx-auto" />
                <div className="h-7 bg-slate-200 rounded-lg w-2/3 mx-auto" />
                <div className="h-4 bg-slate-100 rounded-lg w-5/6 mx-auto" />
              </div>
            </div>
          </div>
        ) : (
          <LuxReveal key={`${currentTip.day}-${currentIdx}`} className="max-w-5xl mx-auto">
            <div className="lux-card-interactive overflow-hidden relative group">
              <div className="relative z-10 grid md:grid-cols-12 gap-0">
                <div className="md:col-span-5 relative h-64 md:h-auto min-h-[340px] overflow-hidden">
                  <Image3D
                    src={currentTip.image}
                    alt={currentTip.title}
                    width={800}
                    height={600}
                    className="!w-full !h-full !object-cover !rounded-none"
                    containerClassName="!w-full !h-full !absolute !inset-0 !rounded-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-black/15 to-transparent" />

                  <div
                    className={`absolute top-4 left-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 backdrop-blur-md ${accentBadgeClass(
                      currentTip.accent
                    )}`}
                  >
                    <IconComponent className="w-3.5 h-3.5 text-white" />
                    <span className="text-xs text-white font-semibold">{currentTip.category}</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-mono font-semibold text-slate-900 shadow-xs">
                      {currentIdx === 0 ? `Édition Jour ${dayOfYear}` : `Playbook #${currentIdx}`}
                    </span>
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-lg ${accentSolidBgClass(
                        currentTip.accent
                      )}`}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-7 p-6 md:p-9 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <span className="lux-label !tracking-[0.2em]">Plan d&apos;action rapide</span>
                      <div className="flex items-center gap-1.5">
                        <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-700 tabular-nums mr-1">
                          {completedCount}/{currentTip.actions.length} validées
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyTip}
                          className="rounded-lg border border-slate-200 bg-slate-50 p-1.5 text-slate-600 hover:text-slate-900 transition-colors"
                          aria-label="Copier le conseil"
                          title="Copier le plan"
                        >
                          {copied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setTipIndex((prev) => (prev - 1 + allTips.length) % allTips.length)
                          }
                          className="rounded-lg border border-slate-200 bg-slate-50 p-1.5 text-slate-600 hover:text-slate-900 transition-colors"
                          aria-label="Conseil précédent"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setTipIndex((prev) => (prev + 1) % allTips.length)}
                          className="rounded-lg border border-slate-200 bg-slate-50 p-1.5 text-slate-600 hover:text-slate-900 transition-colors"
                          aria-label="Conseil suivant"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-3 leading-tight">
                      {currentTip.title}
                    </h3>

                    <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-5">
                      {currentTip.content}
                    </p>

                    <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] font-medium text-slate-600">
                          <span>Progression du plan d&apos;action</span>
                          <span
                            className={`font-mono font-semibold tabular-nums ${isAllActionsDone ? "text-emerald-600" : "text-[var(--brand-blue)]"
                              }`}
                          >
                            {actionsProgressPct}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-200/90 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${isAllActionsDone ? "bg-emerald-500" : "bg-[var(--brand-blue)]"
                              }`}
                            style={{ width: `${actionsProgressPct}%` }}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        {currentTip.actions.map((action, actionIdx) => {
                          const checked = Boolean(checkedActions[`${currentIdx}-${actionIdx}`]);
                          return (
                            <button
                              key={action}
                              type="button"
                              onClick={() => toggleActionCheck(actionIdx)}
                              className="w-full flex items-start gap-2.5 text-left text-xs md:text-sm transition-colors rounded-lg p-1.5 -mx-1 hover:bg-white"
                            >
                              {checked ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              ) : (
                                <Circle className="w-4 h-4 text-[var(--brand-blue)] shrink-0 mt-0.5" />
                              )}
                              <span
                                className={
                                  checked ? "line-through text-slate-400" : "text-slate-800"
                                }
                              >
                                {action}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 mb-6">
                      {allTips.map((tip, idx) => (
                        <button
                          key={`${tip.title}-${idx}`}
                          type="button"
                          onClick={() => setTipIndex(idx)}
                          className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${currentIdx === idx
                              ? "bg-[var(--brand-blue)] text-white"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                        >
                          {idx === 0 ? "Aujourd'hui" : tip.category}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/contact"
                      className={`group inline-flex items-center gap-2 font-semibold py-2.5 px-5 rounded-full text-sm transition-all duration-300 hover:scale-[1.02] ${accentSolidBgClass(
                        currentTip.accent
                      )} text-white`}
                    >
                      Appliquer avec nos experts
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link href="/devis" className="lux-btn-ghost !px-5 !py-2.5 text-sm">
                      Demander un audit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </LuxReveal>
        )}

        <LuxReveal delay={0.15} className="mt-8 text-center">
          <Link
            href="/services"
            className={`inline-flex items-center gap-2 transition-colors text-sm font-semibold ${accentTextClass(
              currentTip.accent
            )}`}
          >
            Découvrir tous nos leviers d&apos;acquisition
            <ArrowRight className="w-4 h-4" />
          </Link>
        </LuxReveal>
      </div>
    </section>
  );
};

export default DailyMarketingTips;
