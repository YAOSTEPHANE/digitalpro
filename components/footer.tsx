'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import Logo from './logo'

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2024)
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="w-full bg-black/[0.98] border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Colonne 1 : Logo et Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Logo 
                className="w-16 h-16"
                width={64}
                height={64}
              />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                digitalpro solutions
              </span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Agence d&apos;intelligence numérique spécialisée en SEO, médias sociaux et développement web. 
              Nous accompagnons votre transformation digitale avec des solutions sur mesure.
            </p>
          </div>

          {/* Colonne 2 : Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Nos Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#services" className="text-neutral-400 hover:text-purple-400 transition-colors text-sm">
                  SEO & Référencement
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-neutral-400 hover:text-purple-400 transition-colors text-sm">
                  Médias Sociaux
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-neutral-400 hover:text-purple-400 transition-colors text-sm">
                  Développement Web
                </Link>
              </li>
              <li>
                <Link href="/facture" className="text-neutral-400 hover:text-purple-400 transition-colors text-sm">
                  Tarification
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Liens Utiles */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Liens Utiles</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-neutral-400 hover:text-purple-400 transition-colors text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-400 hover:text-purple-400 transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-neutral-400 hover:text-purple-400 transition-colors text-sm">
                  Prendre rendez-vous
                </Link>
              </li>
              <li>
                <Link href="/facture" className="text-neutral-400 hover:text-purple-400 transition-colors text-sm">
                  Tarifs
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-neutral-400 text-sm">
                <Mail className="w-4 h-4 text-purple-400" />
                <a href="mailto:digitalprosolutions27@gmail.com" className="hover:text-purple-400 transition-colors">
                  digitalprosolutions27@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-neutral-400 text-sm">
                <Phone className="w-4 h-4 text-purple-400" />
                <a href="tel:+2250748976031" className="hover:text-purple-400 transition-colors">
                  +225 07 48 97 60 31
                </a>
              </li>
              <li className="flex items-start gap-3 text-neutral-400 text-sm">
                <MapPin className="w-4 h-4 text-purple-400 mt-1" />
                <span>Bvd Koffi Gadaud, Cocody<br />Abidjan, Côte d&apos;Ivoire</span>
              </li>
            </ul>

            {/* Réseaux sociaux */}
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3 text-sm">Suivez-nous</h4>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 flex items-center justify-center transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-neutral-400 hover:text-white" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 flex items-center justify-center transition-all"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5 text-neutral-400 hover:text-white" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 flex items-center justify-center transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-neutral-400 hover:text-white" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 flex items-center justify-center transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-neutral-400 hover:text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Section Carte */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <h3 className="text-white font-semibold mb-4 text-lg text-center md:text-left">Notre Localisation</h3>
          <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden border border-neutral-800 shadow-lg">
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
          <p className="text-neutral-400 text-sm mt-3 text-center md:text-left">
            <MapPin className="w-4 h-4 inline mr-2 text-purple-400" />
            Boulevard Koffi Gadaud, Cocody, Abidjan, Côte d&apos;Ivoire
          </p>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-neutral-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-sm text-center md:text-left">
              © {currentYear} digitalpro solutions. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/" className="text-neutral-500 hover:text-purple-400 transition-colors">
                Mentions légales
              </Link>
              <Link href="/" className="text-neutral-500 hover:text-purple-400 transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="/" className="text-neutral-500 hover:text-purple-400 transition-colors">
                CGV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

