'use client'

import ModernNavbar from "@/components/modern-navbar";
import { Spotlight } from "@/components/ui/spotlight";
import StarsBackground from "@/components/stars-background";
import ModernHero from "@/components/modern-hero";
import ModernSlider from "@/components/modern-slider";
import BlackFriday from "./black-friday";
import ServicesVideo from "@/components/services-video";
import DailyMarketingTips from "@/components/daily-marketing-tips";

export default function Home() {

  return (
    <div className="w-full md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <StarsBackground />
      <ModernNavbar
        scrollToWebsiteDesign={() => {}}
        scrollToGraphicDesign={() => {}}
        scrollToShopifyStores={() => {}}
        scrollToBrands={() => {}}
        scrollToServices={() => {}}
      />

      <Spotlight className="hidden md:flex md:-top-80 left-80" fill="white" />
      
      {/* Hero Section Moderne */}
      <ModernHero />

      <div className="p-4 mx-auto relative z-10 w-full px-2">
        {/* Slider Moderne avec images 3D */}
        <div className="w-full pt-20">
          <ModernSlider />
        </div>

        {/* Section Black Friday */}
        <BlackFriday />

        {/* Blog - Conseils Marketing Digital du Jour */}
        <DailyMarketingTips />

        {/* Section Vidéo */}
        <ServicesVideo 
          videoId="VOTRE_ID_YOUTUBE" 
          title="Découvrez nos services en vidéo"
          description="Une présentation complète de nos solutions digitales pour transformer votre entreprise"
        />
      </div>
    </div>
  );
}
