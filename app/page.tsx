'use client'

import { useRef } from "react";
import ModernNavbar from "@/components/modern-navbar";
import { Spotlight } from "@/components/ui/spotlight";
import StarsBackground from "@/components/stars-background";
import ModernHero from "@/components/modern-hero";
import ModernSlider from "@/components/modern-slider";
import ModernServices from "@/components/modern-services";

import ModernWebsiteDesign from "@/components/modern-website-design";
import ModernGraphicDesign from "@/components/modern-graphic-design";
import ModernShopify from "@/components/modern-shopify";
import ModernBrands from "@/components/modern-brands";
import BlackFriday from "./black-friday";
import ServicesVideo from "@/components/services-video";
import DailyMarketingTips from "@/components/daily-marketing-tips";
import ChristmasMessage from "@/components/christmas-message";

import FAQS from "./faq";


export default function Home() {
  const websiteDesignRef = useRef<HTMLDivElement>(null);
  const graphicDesignRef = useRef<HTMLDivElement>(null);
  const shopifyStoresRef = useRef<HTMLDivElement>(null);
  const brandsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  const scrollToWebsiteDesign = () => {
    websiteDesignRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const scrollToGraphicDesign = () => {
    graphicDesignRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToShopifyStores = () => {
    shopifyStoresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBrands = () => {
    brandsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Function to scroll to Services section
  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <StarsBackground />
      <ChristmasMessage />
      <ModernNavbar
        scrollToWebsiteDesign={scrollToWebsiteDesign}
        scrollToGraphicDesign={scrollToGraphicDesign}
        scrollToShopifyStores={scrollToShopifyStores}
        scrollToBrands={scrollToBrands}
        scrollToServices={scrollToServices}
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

        {/* Services Moderne avec images 3D */}
        <div ref={servicesRef} id='services'>
          <ModernServices />
        </div>

        {/* Section Website Design Moderne */}
        <div ref={websiteDesignRef}>
          <ModernWebsiteDesign />
        </div>

        {/* Section Graphic Design Moderne */}
        <div ref={graphicDesignRef}>
          <ModernGraphicDesign />
        </div>

        {/* Section Shopify Stores Moderne */}
        <div ref={shopifyStoresRef}>
          <ModernShopify />
        </div>

        {/* Section Brands Moderne */}
        <div ref={brandsRef}>
          <ModernBrands />
        </div>

        {/* FAQ */}
        <FAQS />
      </div>
    </div>
  );
}
