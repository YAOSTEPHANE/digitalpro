'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from './logo'
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, ArrowUp, Music2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ModernFooter() {
  const [currentYear, setCurrentYear] = useState(2024)
  const [showScrollTop, setShowScrollTop] = useState(false)
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative w-full bg-gradient-to-br from-slate-50 via-white to-cyan-50/40 border-t border-slate-200">
      {/* Effet de gradient en haut */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Colonne 1 : Logo et Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Link href="/" className="flex items-center gap-3 group">
              <Logo 
                className="w-16 h-16 group-hover:scale-110 transition-transform"
                width={64}
                height={64}
              />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-600">
                digitalpro solutions
              </span>
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed">
              Agence d&apos;intelligence numérique spécialisée en SEO, médias sociaux et développement web. 
              Nous accompagnons votre transformation digitale avec des solutions sur mesure.
            </p>
          </motion.div>

          {/* Colonne 2 : Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-slate-900 font-semibold mb-4 text-lg">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services"
                  className="text-slate-800 hover:text-blue-700 transition-colors text-sm font-medium flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-red-400 group-hover:w-3 transition-all duration-300" />
                  Vue d&apos;ensemble
                </Link>
              </li>
              {[
                { name: "Sites Web", href: "/sites-web" },
                { name: "Design", href: "/design" },
                { name: "E-commerce", href: "/e-commerce" },
                { name: "Technologies", href: "/technologies" },
              ].map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="pl-5 text-slate-600 hover:text-blue-700 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-red-400 group-hover:w-3 transition-all duration-300" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Colonne 3 : Liens Utiles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-slate-900 font-semibold mb-4 text-lg">Liens Utiles</h3>
            <ul className="space-y-3">
              {[
                { name: "Accueil", href: "/" },
                { name: "Contact", href: "/contact" },
                { name: "Prendre rendez-vous", href: "/book" },
                { name: "Demander un devis", href: "/devis" },
                { name: "Tarifs", href: "/facture" }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-slate-600 hover:text-blue-700 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-red-400 group-hover:w-3 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Colonne 4 : Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-slate-900 font-semibold mb-4 text-lg">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-slate-600 text-sm group">
                <Mail className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <a href="mailto:digitalprosolutions27@gmail.com" className="hover:text-purple-400 transition-colors">
                  digitalprosolutions27@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-600 text-sm group">
                <Phone className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <a href="tel:+2250748976031" className="hover:text-purple-400 transition-colors">
                  +225 07 48 97 60 31
                </a>
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-sm group">
                <MapPin className="w-4 h-4 text-purple-400 mt-1 group-hover:scale-110 transition-transform" />
                <span className="hover:text-purple-400 transition-colors">
                  Bvd Koffi Gadaud, Cocody<br />Abidjan, Côte d&apos;Ivoire
                </span>
              </li>
            </ul>

            {/* Réseaux sociaux */}
            <div className="mt-6">
              <h4 className="text-slate-900 font-semibold mb-3 text-sm">Suivez-nous</h4>
              <div className="flex gap-3">
                {[
                  {
                    icon: Facebook,
                    href: "https://www.facebook.com/profile.php?id=61574110564242",
                    label: "Facebook",
                    iconClassName: "text-white",
                    buttonClassName: "bg-[#1877F2] border-[#1877F2] hover:bg-[#166FE5] hover:border-[#166FE5]",
                  },
                  {
                    icon: Music2,
                    href: "https://www.tiktok.com/@digitalprosolutions1?lang=fr",
                    label: "TikTok",
                    iconClassName: "text-white",
                    buttonClassName: "bg-black border-black hover:bg-[#1A1A1A] hover:border-[#1A1A1A]",
                  },
                  {
                    icon: Instagram,
                    href: "https://instagram.com/digitalpro_solutions1/",
                    label: "Instagram",
                    iconClassName: "text-white",
                    buttonClassName: "bg-[#E4405F] border-[#E4405F] hover:bg-[#D83756] hover:border-[#D83756]",
                  },
                  {
                    icon: Linkedin,
                    href: "https://www.linkedin.com/company/111682979/",
                    label: "LinkedIn",
                    iconClassName: "text-white",
                    buttonClassName: "bg-[#0A66C2] border-[#0A66C2] hover:bg-[#095BAF] hover:border-[#095BAF]",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${social.buttonClassName}`}
                    aria-label={social.label}
                  >
                    <social.icon className={`w-5 h-5 ${social.iconClassName}`} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section Carte */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-slate-200"
        >
          <h3 className="text-slate-900 font-semibold mb-4 text-lg text-center md:text-left">Notre Localisation</h3>
          <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden border border-purple-500/20 shadow-lg hover:border-purple-500/40 transition-all">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.5!2d-4.0269!3d5.3603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMjEnMzcuMSJOIDTCsDAxJzM2LjgiVw!5e0!3m2!1sfr!2sci!4v1234567890123!5m2!1sfr!2sci"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
              title="Localisation digitalpro solutions - Bvd Koffi Gadaud, Cocody, Abidjan"
            />
          </div>
          <p className="text-slate-600 text-sm mt-3 text-center md:text-left flex items-center justify-center md:justify-start gap-2">
            <MapPin className="w-4 h-4 text-purple-400" />
            Boulevard Koffi Gadaud, Cocody, Abidjan, Côte d&apos;Ivoire
          </p>
        </motion.div>

        {/* Ligne de séparation */}
        <div className="border-t border-slate-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-sm text-center md:text-left">
              © {currentYear} digitalpro solutions. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm">
              {["Mentions légales", "Politique de confidentialité", "CGV"].map((link, index) => (
                <Link 
                  key={index}
                  href="/" 
                  className="text-neutral-500 hover:text-purple-400 transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bouton scroll to top */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-purple-500/50 transition-all z-50 hover:scale-110"
          aria-label="Retour en haut"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </footer>
  )
}


