'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image3D from '@/components/ui/image-3d'
import { Sparkles, Clock, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const offers = [
  {
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
    title: 'Site Vitrine',
    price: '100.000 F',
    description: 'Nos offres de site vitrine'
  },
  {
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
    title: 'Maintenance Informatique',
    price: 'Sur devis',
    description: 'Nos offres Maintenance Informatique'
  },
  {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    title: 'Application Web',
    price: '300.000 F',
    description: 'Nos offres Application Web'
  },
  {
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
    title: 'Publicité Réseaux Sociaux',
    price: '300.000 F',
    description: 'Nos offres Publicité Réseaux Sociaux'
  },
  {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    title: 'Tracking',
    price: '300.000 F',
    description: 'Nos offres Tracking'
  },
  {
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    title: 'E-commerce App',
    price: '1.500.000 F',
    description: 'Nos offres E-commerce App'
  },
  {
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    title: 'Application Mobile',
    price: '500.000 F',
    description: 'Nos offres Application Mobile'
  },
  {
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    title: 'Affiche Pub',
    price: '200.000 F',
    description: 'Nos offres Affiche Pub'
  }
]

const BlackFriday = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    // Date de fin du Black Friday (exemple: 7 jours à partir de maintenant)
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + 7)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = endDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full py-20 overflow-hidden">
      {/* Background avec effet de particules */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_50%)]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* En-tête avec animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-red-400 animate-pulse" />
            <span className="text-sm text-red-300 font-semibold">BLACK FRIDAY 2024</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
              BLACK FRIDAY
            </span>
            <br />
            <span className="text-white">Jusqu&apos;à 50% de Réduction</span>
          </h2>

          <p className="text-xl text-neutral-300 max-w-2xl mx-auto mt-4">
            Profitez de nos offres exceptionnelles pour transformer votre présence digitale
          </p>
        </motion.div>

        {/* Compte à rebours */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-black/60 border border-red-500/30 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-red-400" />
              <span className="text-red-300 font-semibold">Temps restant</span>
            </div>
            <div className="flex gap-4 md:gap-6">
              {[
                { label: 'Jours', value: timeLeft.days },
                { label: 'Heures', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Secondes', value: timeLeft.seconds }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-lg px-4 py-3 min-w-[70px]">
                    <div className="text-2xl md:text-3xl font-bold text-white">
                      {String(item.value).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="text-xs text-neutral-400 mt-2 uppercase">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Offres avec Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative bg-gradient-to-br from-neutral-900/90 to-black border border-red-500/30 rounded-2xl overflow-hidden h-full hover:border-red-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20 flex flex-col">
                {/* Badge de réduction */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full w-20 h-20 flex items-center justify-center shadow-lg z-10 border-2 border-blue-400">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">-50%</div>
                    <div className="text-xs text-white/90">OFF</div>
                  </div>
                </div>

                {/* Image 3D */}
                <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-neutral-800 via-neutral-900 to-black flex-shrink-0 rounded-t-2xl">
                  <Image3D
                    src={offer.image}
                    alt={offer.title}
                    width={400}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay pour améliorer la lisibilité */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />
                </div>

                {/* Contenu */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{offer.title}</h3>
                    <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-lg px-4 py-2 border border-red-400/50 shadow-lg">
                      <div className="text-white font-bold text-lg">{offer.price}</div>
                    </div>
                  </div>
                  <p className="text-neutral-400 text-sm mb-4 flex-grow">{offer.description}</p>

                  <Link
                    href="/facture"
                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 group-hover:scale-105 mt-auto"
                  >
                    Profiter de l&apos;offre
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ne manquez pas cette opportunité unique !
            </h3>
            <p className="text-neutral-300 mb-8 text-lg">
              Contactez-nous dès maintenant pour profiter de ces offres exceptionnelles. 
              Les places sont limitées !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-4 px-8 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
              >
                Demander un devis
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/book"
                className="bg-transparent border-2 border-red-500/50 hover:border-red-500 text-white font-semibold py-4 px-8 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:bg-red-500/10"
              >
                Prendre rendez-vous
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default BlackFriday

