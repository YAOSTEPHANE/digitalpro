"use client";

import Link from "next/link";
import { ArrowRight, Code2, Sparkles, Zap } from "lucide-react";
import LuxPageLayout from "@/components/lux-page-layout";
import LuxSectionHeader from "@/components/lux-section-header";
import LuxReveal from "@/components/lux-reveal";
import ModernWebsiteDesign from "@/components/modern-website-design";

export default function SitesWebPage() {
  return (
    <LuxPageLayout breadcrumb="Sites Web">
      <LuxSectionHeader
        indexLabel="01"
        label="Sites web"
        title="Des interfaces rapides, élégantes et pensées pour convertir"
        description="Nous concevons des expériences web mémorables avec une architecture propre, un référencement solide et un parcours client optimisé."
        rightSlot={
          <Link href="/devis?service=Développement+de+site+web" className="lux-btn-primary !px-5 !py-2.5 text-sm gap-2">
            Lancer mon site web
            <ArrowRight className="w-4 h-4" />
          </Link>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {[
          {
            num: "01",
            icon: Zap,
            title: "Vitesse instantanée",
            text: "Pages pré-rendues, images optimisées et Core Web Vitals calibrés pour retenir vos visiteurs mobiles.",
          },
          {
            num: "02",
            icon: Sparkles,
            title: "Esthétique éditoriale",
            text: "Typographie soignée, hiérarchie visuelle lisible et micro-interactions qui reflètent votre standing.",
          },
          {
            num: "03",
            icon: Code2,
            title: "Code évolutif",
            text: "Base Next.js & TypeScript propre, documentée et prête pour de futures intégrations API ou IA.",
          },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <LuxReveal key={item.title} delay={idx * 0.06}>
              <article className="lux-card-interactive p-5 md:p-6 h-full">
                <div className="flex items-center justify-between mb-3.5">
                  <div className="lux-icon-badge w-fit">
                    <Icon className="w-5 h-5 text-[var(--brand-blue)]" />
                  </div>
                  <span className="font-mono text-xs font-semibold text-slate-400">
                    {item.num}
                  </span>
                </div>
                <h2 className="font-display text-xl font-bold text-slate-900 mb-1.5">
                  {item.title}
                </h2>
                <p className="lux-muted text-sm leading-relaxed">{item.text}</p>
              </article>
            </LuxReveal>
          );
        })}
      </div>

      <ModernWebsiteDesign />
    </LuxPageLayout>
  );
}
