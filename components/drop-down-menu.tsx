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
    { label: "Accueil", href: "/", action: null },
    { label: "Services", href: "/services", action: null },
    { label: "Demander un Devis", href: "/devis", action: null },
    { label: "Prendre Rendez-vous", href: "/book", action: null },
    { label: "Facturation", href: "/facture", action: null },
    { label: "Contact", href: "/contact", action: null },
    { label: "Retours Clients", href: "/retours", action: null },
    { label: "FAQ", href: "/faq", action: null },
  ];

  const serviceSubItems: MenuItem[] = [
    { label: "Sites Web", href: "/sites-web", action: null },
    { label: "Design", href: "/design", action: null },
    { label: "E-commerce", href: "/e-commerce", action: null },
    { label: "Technologies", href: "/technologies", action: null },
  ];

  const handleClick = (item: MenuItem) => {
    if (item.action && typeof item.action === "function") {
      item.action();
    }
    onClose?.();
  };

  return (
    <motion.div
      className="fixed left-0 right-0 top-20 z-50 h-screen w-screen overflow-y-auto border-t border-[rgba(81,102,153,0.22)] bg-[rgba(8,9,14,0.96)] p-8 text-[var(--brand-white)] backdrop-blur-2xl custom-scrollbar"
      initial={{ opacity: 0, y: "-100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto max-w-4xl pt-20">
        <div className="mb-12 text-center">
          <p className="lux-label mb-2">Navigation</p>
          <h2 className="lux-heading text-3xl md:text-4xl mb-2">Menu</h2>
          <p className="lux-muted">Naviguez facilement sur notre site</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 }}
            className="md:col-span-2"
          >
            <div className="lux-card-interactive p-6">
              <h3 className="font-display text-lg font-semibold text-[var(--lux-champagne)] mb-1">
                Sous-fonctionnalités de Services
              </h3>
              <p className="lux-muted text-sm mb-4">Accédez directement à chaque domaine de service.</p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {serviceSubItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href || "/services"}
                    onClick={onClose}
                    className="rounded-lg border border-[rgba(81,102,153,0.28)] px-3 py-2 text-sm text-[var(--lux-champagne)] transition-colors hover:border-[var(--brand-blue-light)] hover:bg-[rgba(81,102,153,0.12)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {menuItems.map((item, index) => {
            const cardClass =
              "group lux-card-interactive flex items-center gap-4 p-6 transition-all duration-300 hover:scale-[1.02]";
            const titleClass =
              "text-lg font-semibold text-[var(--lux-champagne)] transition-colors group-hover:text-[var(--brand-blue-light)]";

            if (item.href) {
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={item.href} onClick={onClose} className={cardClass}>
                    <h3 className={titleClass}>{item.label}</h3>
                  </Link>
                </motion.div>
              );
            }

            if (item.action) {
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    type="button"
                    onClick={() => handleClick(item)}
                    className={`${cardClass} w-full text-left`}
                  >
                    <h3 className={titleClass}>{item.label}</h3>
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
