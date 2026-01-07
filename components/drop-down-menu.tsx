"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface DropDownMenuProps {
  scrollToServices?: () => void;
  scrollToWebsiteDesign?: () => void;
  scrollToGraphicDesign?: () => void;
  scrollToShopifyStores?: () => void;
  scrollToBrands?: () => void;
  onClose?: () => void;
}

interface MenuItem {
  label: string;
  href?: string;
  action?: (() => void) | null;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({
  scrollToServices: _scrollToServices,
  scrollToWebsiteDesign: _scrollToWebsiteDesign,
  scrollToGraphicDesign: _scrollToGraphicDesign,
  scrollToShopifyStores: _scrollToShopifyStores,
  scrollToBrands: _scrollToBrands,
  onClose,
}) => {
  const menuItems: MenuItem[] = [
    {
      label: "Accueil",
      href: "/",
      action: null,
    },
    {
      label: "Nos Services",
      href: "/services",
      action: null,
    },
    {
      label: "Conception de Sites Web",
      href: "/sites-web",
      action: null,
    },
    {
      label: "Conception Graphique",
      href: "/design",
      action: null,
    },
    {
      label: "Boutique E-commerce",
      href: "/e-commerce",
      action: null,
    },
    {
      label: "Technologies",
      href: "/technologies",
      action: null,
    },
    {
      label: "Demander un Devis",
      href: "/devis",
      action: null,
    },
    {
      label: "Prendre Rendez-vous",
      href: "/book",
      action: null,
    },
    {
      label: "Facturation",
      href: "/facture",
      action: null,
    },
    {
      label: "Contact",
      href: "/contact",
      action: null,
    },
    {
      label: "Générateur Site IA",
      href: "/ia-site",
      action: null,
    },
    {
      label: "Retours Clients",
      href: "/retours",
      action: null,
    },
    {
      label: "FAQ",
      href: "/faq",
      action: null,
    },
  ];

  const handleClick = (item: MenuItem) => {
    if (item.action && typeof item.action === 'function') {
      item.action();
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <motion.div
      className="w-screen h-screen bg-gradient-to-br from-violet-950 via-purple-950 to-indigo-950 backdrop-blur-xl border-t border-violet-500/30 text-white p-8 fixed top-20 left-0 right-0 z-50 overflow-y-auto custom-scrollbar shadow-2xl shadow-violet-900/50"
      initial={{ opacity: 0, y: "-100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-4xl mx-auto pt-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400">
            Menu
          </h2>
          <p className="text-violet-300/70">Naviguez facilement sur notre site</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menuItems.map((item, index) => {
            if (item.href) {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="group bg-gradient-to-br from-violet-900/40 via-purple-900/40 to-indigo-900/40 border border-violet-500/30 rounded-xl p-6 hover:border-violet-400/60 transition-all duration-300 hover:scale-105 flex items-center gap-4 backdrop-blur-sm"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white group-hover:text-violet-200 transition-colors">
                        {item.label}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              );
            } else if (item.action) {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => handleClick(item)}
                    className="group bg-gradient-to-br from-violet-900/40 via-purple-900/40 to-indigo-900/40 border border-violet-500/30 rounded-xl p-6 hover:border-violet-400/60 transition-all duration-300 hover:scale-105 flex items-center gap-4 w-full text-left backdrop-blur-sm"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white group-hover:text-violet-200 transition-colors">
                        {item.label}
                      </h3>
                    </div>
                  </button>
                </motion.div>
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
