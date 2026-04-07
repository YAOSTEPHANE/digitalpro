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
      label: "Services",
      href: "/services",
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

  const serviceSubItems: MenuItem[] = [
    { label: "Sites Web", href: "/sites-web", action: null },
    { label: "Design", href: "/design", action: null },
    { label: "E-commerce", href: "/e-commerce", action: null },
    { label: "Technologies", href: "/technologies", action: null },
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
      className="w-screen h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-indigo-50 backdrop-blur-xl border-t border-slate-200 text-slate-900 p-8 fixed top-20 left-0 right-0 z-50 overflow-y-auto custom-scrollbar shadow-2xl shadow-slate-300/40"
      initial={{ opacity: 0, y: "-100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-4xl mx-auto pt-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-cyan-600 to-blue-600">
            Menu
          </h2>
          <p className="text-slate-600">Naviguez facilement sur notre site</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 }}
            className="md:col-span-2"
          >
            <div className="bg-white/80 border border-slate-200 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">Sous-fonctionnalités de Services</h3>
              <p className="text-slate-600 text-sm mb-4">
                Accédez directement à chaque domaine de service.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {serviceSubItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href || "/services"}
                    onClick={onClose}
                    className="px-3 py-2 rounded-lg text-sm text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors border border-slate-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

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
                    className="group bg-white/80 border border-slate-200 rounded-xl p-6 hover:border-cyan-300 transition-all duration-300 hover:scale-105 flex items-center gap-4 backdrop-blur-sm"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-cyan-700 transition-colors">
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
                    className="group bg-white/80 border border-slate-200 rounded-xl p-6 hover:border-cyan-300 transition-all duration-300 hover:scale-105 flex items-center gap-4 w-full text-left backdrop-blur-sm"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-cyan-700 transition-colors">
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
