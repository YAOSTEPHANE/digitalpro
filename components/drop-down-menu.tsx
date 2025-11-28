"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Home, 
  Briefcase, 
  FileText, 
  Calendar, 
  MessageSquare, 
  CreditCard,
  ArrowRight,
  Sparkles
} from "lucide-react";

interface DropDownMenuProps {
  scrollToServices?: () => void;
  scrollToWebsiteDesign?: () => void;
  scrollToGraphicDesign?: () => void;
  scrollToShopifyStores?: () => void;
  scrollToBrands?: () => void;
  onClose?: () => void;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({
  scrollToServices,
  scrollToWebsiteDesign,
  scrollToGraphicDesign,
  scrollToShopifyStores,
  scrollToBrands,
  onClose,
}) => {
  const menuItems = [
    {
      icon: Home,
      label: "Accueil",
      href: "/",
      action: null,
    },
    {
      icon: Briefcase,
      label: "Nos Services",
      href: null,
      action: scrollToServices,
    },
    {
      icon: Sparkles,
      label: "Conception de Sites Web",
      href: null,
      action: scrollToWebsiteDesign,
    },
    {
      icon: FileText,
      label: "Conception Graphique",
      href: null,
      action: scrollToGraphicDesign,
    },
    {
      icon: CreditCard,
      label: "Boutique E-commerce",
      href: null,
      action: scrollToShopifyStores,
    },
    {
      icon: Sparkles,
      label: "Technologies",
      href: null,
      action: scrollToBrands,
    },
    {
      icon: FileText,
      label: "Demander un Devis",
      href: "/devis",
      action: null,
    },
    {
      icon: Calendar,
      label: "Prendre Rendez-vous",
      href: "/book",
      action: null,
    },
    {
      icon: CreditCard,
      label: "Facturation",
      href: "/facture",
      action: null,
    },
    {
      icon: MessageSquare,
      label: "Contact",
      href: "/contact",
      action: null,
    },
  ];

  const handleClick = (item: typeof menuItems[0]) => {
    if (item.action) {
      item.action();
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <motion.div
      className="w-screen h-screen bg-gradient-to-br from-black via-neutral-900 to-black backdrop-blur-xl border-t border-red-500/20 text-white p-8 absolute top-20 left-0 right-0 z-50 overflow-y-auto custom-scrollbar"
      initial={{ opacity: 0, y: "-100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-4xl mx-auto pt-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-blue-400">
            Menu
          </h2>
          <p className="text-neutral-400">Naviguez facilement sur notre site</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            
            if (item.href) {
              return (
                <Link
                  key={index}
                  href={item.href}
                  onClick={onClose}
                  className="group bg-gradient-to-br from-neutral-900/90 to-black border border-red-500/20 rounded-xl p-6 hover:border-red-500/60 transition-all duration-300 hover:scale-105 flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600/20 to-blue-600/20 rounded-lg flex items-center justify-center group-hover:from-red-600/40 group-hover:to-blue-600/40 transition-all">
                    <IconComponent className="w-6 h-6 text-red-400 group-hover:text-red-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white group-hover:text-red-300 transition-colors">
                      {item.label}
                    </h3>
                  </div>
                  <ArrowRight className="w-5 h-5 text-neutral-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                </Link>
              );
            } else if (item.action) {
              return (
                <button
                  key={index}
                  onClick={() => handleClick(item)}
                  className="group bg-gradient-to-br from-neutral-900/90 to-black border border-red-500/20 rounded-xl p-6 hover:border-red-500/60 transition-all duration-300 hover:scale-105 flex items-center gap-4 w-full text-left"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600/20 to-blue-600/20 rounded-lg flex items-center justify-center group-hover:from-red-600/40 group-hover:to-blue-600/40 transition-all">
                    <IconComponent className="w-6 h-6 text-red-400 group-hover:text-red-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white group-hover:text-red-300 transition-colors">
                      {item.label}
                    </h3>
                  </div>
                  <ArrowRight className="w-5 h-5 text-neutral-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                </button>
              );
            }
            return null;
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default DropDownMenu;
