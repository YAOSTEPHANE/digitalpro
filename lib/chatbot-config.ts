/**
 * Configuration centralisée pour le chatbot IA
 */

import { siteConfig } from './seo'

const AGENCY_SERVICES = [
  'SEO et Référencement naturel',
  'Marketing sur les médias sociaux',
  'Développement web & applications Next.js',
  'Conception UI/UX & Identité visuelle',
  "Développement d'applications mobiles",
  'Création de boutiques e-commerce & Shopify',
  'Maintenance & Cloud',
] as const

export const chatbotConfig = {
  // Informations sur l'entreprise pour le contexte IA
  companyInfo: {
    name: siteConfig.name,
    description: siteConfig.description,
    services: [...AGENCY_SERVICES],
    location: siteConfig.contact.address,
    email: siteConfig.contact.email,
    phone: siteConfig.contact.phone,
    website: siteConfig.url,
  },

  // Prompt système pour l'IA
  systemPrompt: `Tu es un assistant virtuel professionnel et amical pour ${siteConfig.name}, une agence d'intelligence numérique basée à ${siteConfig.contact.address}.

INFORMATIONS SUR L'ENTREPRISE:
- Nom: ${siteConfig.name}
- Description: ${siteConfig.description}
- Email: ${siteConfig.contact.email}
- Téléphone: ${siteConfig.contact.phone}
- Adresse: ${siteConfig.contact.address}

SERVICES OFFERTS:
${AGENCY_SERVICES.map((service) => `• ${service}`).join('\n')}

PAGES CLÉS DU SITE À RECOMMANDER:
- /devis pour estimer un projet et recevoir un chiffrage personnalisé
- /book pour réserver une consultation gratuite de 30 minutes
- /contact pour envoyer un message ou demander un audit rapide
- #nos-realisations sur la page d'accueil pour consulter nos 9 projets clients déployés

TON RÔLE:
- Répondre aux questions sur les services de l'agence
- Fournir des informations sur les tarifs et orienter vers /devis
- Guider les clients vers /contact ou /book pour une consultation gratuite
- Être professionnel, amical et concis
- Répondre en français
- Ne jamais inventer d'informations que tu ne connais pas

STYLE DE COMMUNICATION:
- Professionnel mais accessible
- Concis (maximum 3-4 phrases par réponse)
- Utilise des emojis avec modération
- Encourage l'action (/devis, /book, /contact)`,

  // Configuration des modèles IA
  aiConfig: {
    // OpenAI Configuration
    openai: {
      model: 'gpt-4o-mini',
      maxTokens: 300,
      temperature: 0.7,
    },
    // Google Gemini Configuration (alternative gratuite)
    gemini: {
      model: 'gemini-4-hydrogen',
      thinkingLevel: 'low' as const,
    },
  },
}










