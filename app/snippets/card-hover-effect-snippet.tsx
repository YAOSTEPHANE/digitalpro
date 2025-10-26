import { HoverEffect } from "@/components/ui/card-hover-effect";
import { PiAppStoreLogo, PiHeadsetFill, PiLock, PiMegaphone, PiMonitor, PiStorefront } from "react-icons/pi";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
    {
        icon : <div className="bg-blue-100 p-4 rounded-full"><PiMonitor className="w-8 h-8 text-blue-600" /></div>,
        title: "Conception de site web",
        description:
          "Nous créons des sites web entièrement responsives qui ont fière allure sur tous les appareils. Nos sites web sont conçus pour convertir les visiteurs en clients.",
      
      },
      {
        icon : <div className="bg-blue-100 p-4 rounded-full"><PiStorefront className="w-8 h-8 text-blue-600" /></div>,
        title: "Solutions E-commerce",
        description:
          "De petites boutiques aux grands détaillants en ligne, nous avons l'expertise pour créer une boutique qui vous aidera à développer votre entreprise.",
       
      },
      {
        icon : <div className="bg-blue-100 p-4 rounded-full"><PiLock className="w-8 h-8 text-blue-600" /></div>,
        title: "Authentification",
        description:
          "Solutions d'authentification sécurisées pour votre site Web ou votre application. Nous utilisons la dernière technologie pour garder vos données en sécurité.",
      
      },
      {
        icon : <div className="bg-blue-100 p-4 rounded-full"><PiMegaphone className="w-8 h-8 text-blue-600" /></div>,
        title: "Social Media",
        description:
          "Nous offrons des services de gestion des médias sociaux et de création d'annonces. Nous pouvons vous aider à développer votre présence sur les réseaux sociaux et à atteindre de nouveaux clients.",
      
      },
      {
        icon : <div className="bg-blue-100 p-4 rounded-full"><PiAppStoreLogo className="w-8 h-8 text-blue-600" /></div>,
        title: "Développement d'applications",
        description:
          "Nous développons des applications mobiles sur mesure pour iOS et Android. Nos applications sont conçues pour être conviviales et performantes.",
      
      },
      {
        icon : <div className="bg-blue-100 p-4 rounded-full"><PiHeadsetFill className="w-8 h-8 text-blue-600" /></div>,
        title: "Support",
        description:
          "Nous offrons un support pour tous nos clients. Nous sommes là pour vous aider avec tous les problèmes ou questions que vous pourriez avoir.",
     
      },
];