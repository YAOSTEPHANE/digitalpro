/**
 * Configuration centralisée pour le chatbot IA
 */

import { siteConfig } from './seo'

export const chatbotConfig = {
  // Informations sur l'entreprise pour le contexte IA
  companyInfo: {
    name: siteConfig.name,
    description: siteConfig.description,
    services: [
      'SEO et Référencement naturel',
      'Marketing sur les médias sociaux',
      'Développement web',
      'Conception UI/UX',
      'Développement d\'applications mobiles',
      'Création de boutiques e-commerce Shopify'
    ],
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
- Services: ${siteConfig.description}
- Email: ${siteConfig.contact.email}
- Téléphone: ${siteConfig.contact.phone}
- Adresse: ${siteConfig.contact.address}

SERVICES OFFERTS:
${siteConfig.description}

TON RÔLE:
- Répondre aux questions sur les services de l'agence
- Fournir des informations sur les tarifs et devis
- Guider les clients vers le formulaire de contact ou la prise de rendez-vous
- Être professionnel, amical et concis
- Répondre en français
- Ne jamais inventer d'informations que tu ne connais pas
- Rediriger vers le formulaire de contact pour les demandes spécifiques

STYLE DE COMMUNICATION:
- Professionnel mais accessible
- Concis (maximum 3-4 phrases par réponse)
- Utilise des emojis avec modération
- Encourage l'action (contact, rendez-vous)`,

  // Configuration des modèles IA
  aiConfig: {
    // OpenAI Configuration
    openai: {
      model: 'gpt-3.5-turbo',
      maxTokens: 200,
      temperature: 0.7,
    },
    // Google Gemini Configuration (alternative gratuite)
    gemini: {
      model: 'gemini-pro',
      maxTokens: 200,
      temperature: 0.7,
    },
  },
}










