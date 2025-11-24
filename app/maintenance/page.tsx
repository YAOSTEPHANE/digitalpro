'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import { Spotlight } from '@/components/ui/spotlight'
import Link from 'next/link'
import { 
  Wrench, 
  Shield, 
  Zap, 
  HardDrive, 
  Network, 
  Server, 
  CheckCircle2,
  ArrowRight,
  Clock,
  HeadphonesIcon,
  FileCheck
} from 'lucide-react'

const services = [
  {
    icon: <Server className="w-8 h-8" />,
    title: 'Maintenance Serveurs',
    description: 'Surveillance, optimisation et maintenance préventive de vos serveurs pour garantir une disponibilité maximale.',
    features: ['Monitoring 24/7', 'Sauvegardes automatiques', 'Mises à jour de sécurité']
  },
  {
    icon: <Network className="w-8 h-8" />,
    title: 'Réseaux & Infrastructure',
    description: 'Configuration, maintenance et dépannage de votre infrastructure réseau pour une connectivité optimale.',
    features: ['Configuration réseau', 'Dépannage', 'Optimisation des performances']
  },
  {
    icon: <HardDrive className="w-8 h-8" />,
    title: 'Support Technique',
    description: 'Assistance technique complète pour résoudre rapidement tous vos problèmes informatiques.',
    features: ['Support à distance', 'Intervention sur site', 'Hotline dédiée']
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Sécurité Informatique',
    description: 'Protection de vos données et systèmes contre les menaces cybernétiques et les virus.',
    features: ['Antivirus & Firewall', 'Audits de sécurité', 'Formation des utilisateurs']
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Mises à Jour & Patches',
    description: 'Gestion automatique des mises à jour système et des correctifs de sécurité pour tous vos équipements.',
    features: ['Mises à jour automatiques', 'Gestion des patches', 'Tests de compatibilité']
  },
  {
    icon: <FileCheck className="w-8 h-8" />,
    title: 'Sauvegarde & Récupération',
    description: 'Solutions de sauvegarde automatisées et plans de récupération en cas de sinistre.',
    features: ['Sauvegardes cloud', 'Restauration rapide', 'Plan de continuité']
  }
]

const benefits = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Disponibilité 24/7',
    description: 'Support disponible à tout moment pour minimiser les temps d\'arrêt'
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: 'Prévention des Pannes',
    description: 'Maintenance proactive pour éviter les problèmes avant qu\'ils ne surviennent'
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Performance Optimale',
    description: 'Optimisation continue pour garantir les meilleures performances'
  },
  {
    icon: <HeadphonesIcon className="w-6 h-6" />,
    title: 'Support Réactif',
    description: 'Intervention rapide en cas de problème pour limiter l\'impact'
  }
]

export default function MaintenancePage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <div className="w-full md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden min-h-screen">
      <Navbar
        scrollToWebsiteDesign={() => {}}
        scrollToGraphicDesign={() => {}}
        scrollToShopifyStores={() => {}}
        scrollToBrands={() => {}}
        scrollToServices={() => {}}
      />

      <Spotlight className="hidden md:flex md:-top-80 left-80" fill="white" />
      
      <div className="p-4 mx-auto relative z-10 w-full pt-10 md:pt-20 px-2">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
            <Wrench className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Maintenance Informatique</span>
          </div>
          
          <h1 className="text-4xl pb-5 md:text-7xl px-6 text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 mb-6">
            Maintenance Informatique
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Professionnelle
            </span>
          </h1>
          
          <p className="mt-4 text-lg font-normal text-neutral-300 max-w-2xl mx-auto px-4">
            Assurez la continuité de votre activité avec nos services de maintenance informatique. 
            Surveillance proactive, support réactif et optimisation continue de votre infrastructure IT.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/contact"
              className="cursor-pointer flex items-center justify-center border rounded-full w-full sm:w-auto px-8 py-3 mx-auto text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Demander un devis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/book"
              className="cursor-pointer flex items-center justify-center border rounded-full w-full sm:w-auto px-8 py-3 mx-auto text-white border-purple-500/50 hover:bg-purple-500/10 transition-all"
            >
              Prendre rendez-vous
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Nos Services de Maintenance
          </h2>
          <p className="text-center text-neutral-400 mb-12 max-w-2xl mx-auto">
            Une gamme complète de services pour maintenir votre infrastructure informatique en parfait état
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-xl group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                    <p className="text-neutral-400 text-sm mb-4">{service.description}</p>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {hoveredCard === index && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-2xl pointer-events-none" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Pourquoi Choisir Nos Services ?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 text-center hover:border-purple-500/50 transition-all"
              >
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-neutral-400 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à Optimiser Votre Infrastructure IT ?
          </h2>
          <p className="text-neutral-300 mb-8 max-w-2xl mx-auto">
            Contactez-nous dès aujourd&apos;hui pour discuter de vos besoins en maintenance informatique. 
            Nous vous proposerons une solution sur mesure adaptée à votre entreprise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="cursor-pointer flex items-center justify-center border rounded-full px-8 py-3 text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Contactez-nous
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/book"
              className="cursor-pointer flex items-center justify-center border rounded-full px-8 py-3 text-white border-purple-500/50 hover:bg-purple-500/10 transition-all"
            >
              Consultation gratuite
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

