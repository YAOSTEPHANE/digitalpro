"use client";
import { useState, useEffect } from "react";
import { AlignJustify, X } from "lucide-react";
import Link from "next/link";
import Logo from "./logo";
import DropDownMenu from "./drop-down-menu";
import { motion } from "framer-motion";

interface NavbarProps {
  scrollToWebsiteDesign: () => void;
  scrollToGraphicDesign: () => void;
  scrollToShopifyStores: () => void;
  scrollToBrands: () => void;
  scrollToServices: () => void;
}

const ModernNavbar = ({
  scrollToWebsiteDesign,
  scrollToGraphicDesign,
  scrollToShopifyStores,
  scrollToBrands,
  scrollToServices,
}: NavbarProps) => {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropDown = () => {
    setIsDropDownVisible(!isDropDownVisible);
  };

  const closeDropDown = () => {
    setIsDropDownVisible(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-neutral-800"
          : "bg-transparent"
      }`}
    >
      <div className="p-4 md:p-6 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center flex-shrink-0">
          <Link className="cursor-pointer flex items-center justify-center" href="/">
            <Logo 
              className="w-12 h-12 md:w-16 md:h-16 object-contain"
              width={64}
              height={64}
            />
          </Link>
        </div>
        
        <div className="hidden md:flex space-x-8 items-center text-slate-300">
          <button
            onClick={scrollToWebsiteDesign}
            className="hover:text-white transition-colors relative group"
          >
            Conception de Sites Web
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 group-hover:w-full transition-all duration-300" />
          </button>
          <button
            onClick={scrollToGraphicDesign}
            className="hover:text-white transition-colors relative group"
          >
            Conception Graphique
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 group-hover:w-full transition-all duration-300" />
          </button>
          <button
            onClick={scrollToShopifyStores}
            className="hover:text-white transition-colors relative group"
          >
            Boutique
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 group-hover:w-full transition-all duration-300" />
          </button>
          <button
            onClick={scrollToBrands}
            className="hover:text-white transition-colors relative group"
          >
            Marques
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 group-hover:w-full transition-all duration-300" />
          </button>
          <Link
            href="/facture"
            className="hover:text-white transition-colors relative group"
          >
            Facturation
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 group-hover:w-full transition-all duration-300" />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex">
            <Link
              href="/contact"
              className="relative px-6 py-2 bg-gradient-to-r from-red-600 to-blue-600 rounded-full text-white font-medium overflow-hidden group transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">Contact</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-red-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </div>

          <div className="flex md:hidden">
            {isDropDownVisible ? (
              <div
                onClick={toggleDropDown}
                className="w-8 h-8 text-slate-300 cursor-pointer flex items-center justify-center"
              >
                <X />
                <DropDownMenu />
              </div>
            ) : (
              <AlignJustify
                onClick={toggleDropDown}
                className="w-8 h-8 text-slate-300 cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default ModernNavbar;

