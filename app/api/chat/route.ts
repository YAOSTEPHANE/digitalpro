import { NextRequest, NextResponse } from 'next/server'
import { chatRequestSchema } from '@/lib/api-schemas'
import { chatbotConfig } from '@/lib/chatbot-config'
import { createGeminiInteraction, type GeminiStep } from '@/lib/gemini'
import { checkRateLimit, getClientIp } from '@/lib/security'

type ChatSource = 'openai' | 'gemini' | 'fallback'

// Base de connaissances améliorée pour les réponses de fallback
const knowledgeBase: { [key: string]: string | ((message: string) => string) } = {
  'bonjour': 'Bonjour ! 👋 Je suis l\'assistant virtuel de digitalpro solutions. Comment puis-je vous aider aujourd\'hui ?',
  'salut': 'Salut ! Je suis là pour répondre à vos questions sur nos services digitaux.',
  'audit': 'Nous proposons un audit express gratuit (performance, SEO, UI/UX et conversion) pour analyser les points de blocage de votre site. Envoyez-nous votre URL via /contact ou réservez un créneau de 30 min sur /book.',
  'services': 'Nous proposons plusieurs services : SEO et référencement naturel, gestion des médias sociaux, développement web, conception UI/UX, développement mobile, e-commerce & Shopify et maintenance cloud. Lequel vous intéresse ?',
  'seo': 'Le SEO (Search Engine Optimization) permet d\'améliorer votre visibilité sur les moteurs de recherche. Nous optimisons votre site pour qu\'il apparaisse en première page de Google et attirer plus de clients. Voulez-vous un audit ou une estimation sur /devis ?',
  'référencement': 'Le référencement naturel (SEO) est essentiel pour attirer des clients. Nous analysons votre site, optimisons le contenu et améliorons votre classement dans les résultats de recherche. Contactez-nous via /contact ou /book pour en discuter !',
  'médias sociaux': 'Nous gérons vos réseaux sociaux (Facebook, Instagram, LinkedIn, etc.), créons du contenu engageant et gérons vos publicités pour augmenter votre visibilité et votre communauté.',
  'réseaux sociaux': 'Nous créons et publions du contenu régulier sur vos réseaux sociaux, interagissons avec votre communauté et gérons vos campagnes publicitaires pour maximiser votre portée.',
  'réalisation': 'Vous pouvez découvrir nos 5 projets clients déployés (sites vitrines, portails corporate, BTP et éducation) directement dans la section #nos-realisations sur la page d\'accueil.',
  'realisation': 'Vous pouvez découvrir nos 5 projets clients déployés (sites vitrines, portails corporate, BTP et éducation) directement dans la section #nos-realisations sur la page d\'accueil.',
  'portfolio': 'Nos principales réalisations en ligne sont regroupées dans la section #nos-realisations de notre page d\'accueil, avec liens directs vers chaque projet.',
  'e-commerce': 'Nous concevons des boutiques en ligne Shopify et sur mesure avec paiement Mobile Money (Wave, Orange Money, MTN MoMo) et cartes bancaires. Estimez votre projet sur /devis.',
  'boutique': 'Nous créons des boutiques e-commerce rapides et optimisées pour la conversion avec gestion de catalogue et paiement en ligne. Demandez votre chiffrage sur /devis.',
  'mobile': 'Nous développons des applications mobiles iOS & Android et solutions métier connectées temps réel. Décrivez votre besoin sur /devis ou prenez rendez-vous sur /book.',
  'développement web': 'Nous créons des sites web modernes, responsives et performants. Que ce soit un site vitrine, un e-commerce ou une application web sur mesure, nous adaptons la solution à vos besoins.',
  'site web': 'Nous développons des sites web professionnels adaptés à vos besoins. Nos sites sont rapides, sécurisés et optimisés pour le référencement. Estimez votre projet sur /devis !',
  'prix': 'Nos tarifs varient selon vos besoins et la complexité du projet. Obtenez un chiffrage gratuit sur /devis, contactez-nous via /contact ou réservez une consultation de 30 min sur /book.',
  'tarif': 'Chaque projet est unique. Obtenez une estimation sur /devis ou réservez un échange gratuit sur /book pour adapter la solution à votre budget.',
  'contact': 'Vous pouvez nous contacter via /contact, par email à digitalprosolutions27@gmail.com, par téléphone au +225 07 48 97 60 31, ou prendre rendez-vous sur /book.',
  'devis': 'Pour obtenir un devis personnalisé et gratuit, utilisez notre simulateur sur /devis ou décrivez vos besoins sur /contact. Nous vous répondons rapidement avec une estimation détaillée ou lors d\'un appel (/book).',
  'combien': 'Nos tarifs dépendent de la complexité de votre projet. Lancez votre estimation gratuite sur /devis ou échangeons 30 min en visio via /book.',
  'aide': 'Je suis là pour vous aider ! Posez-moi vos questions sur nos services (SEO, réseaux sociaux, développement web, mobile, e-commerce), nos réalisations ou notre simulateur /devis.',
  'adresse': `Notre agence est située à ${chatbotConfig.companyInfo.location}. Vous pouvez nous contacter par email ou téléphone pour plus d'informations.`,
  'email': `Vous pouvez nous contacter par email à ${chatbotConfig.companyInfo.email}. Nous répondons généralement dans les 24 heures.`,
  'téléphone': `Vous pouvez nous appeler au ${chatbotConfig.companyInfo.phone}. Nous sommes disponibles pour discuter de votre projet.`,
  'rendez-vous': 'Vous pouvez prendre rendez-vous pour une consultation gratuite de 30 minutes via notre calendrier en ligne sur /book.',
  'rdv': 'Réservez votre consultation gratuite de 30 minutes en ligne dès maintenant sur /book.',
}

// Fonction pour trouver la meilleure réponse basée sur les mots-clés (fallback intelligent)
function findBestResponse(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  // Recherche de mots-clés dans le message
  for (const [keyword, response] of Object.entries(knowledgeBase)) {
    if (lowerMessage.includes(keyword)) {
      return typeof response === 'function' ? response(message) : response
    }
  }

  // Réponses contextuelles intelligentes
  if (lowerMessage.includes('merci') || lowerMessage.includes('remercie')) {
    return 'De rien ! 😊 N\'hésitez pas si vous avez d\'autres questions. Je suis là pour vous aider.'
  }

  if (lowerMessage.includes('au revoir') || lowerMessage.includes('bye') || lowerMessage.includes('à bientôt')) {
    return 'Au revoir ! 👋 N\'hésitez pas à revenir si vous avez besoin d\'aide. Bonne journée !'
  }

  if (lowerMessage.includes('qui êtes-vous') || lowerMessage.includes('qui etes-vous') || lowerMessage.includes('qui es-tu')) {
    return `Je suis l'assistant virtuel de ${chatbotConfig.companyInfo.name}, une agence spécialisée en intelligence numérique basée à ${chatbotConfig.companyInfo.location}. Je peux vous renseigner sur nos services : SEO, médias sociaux, développement web, et bien plus encore !`
  }

  // Réponse par défaut avec suggestions
  return `Merci pour votre message ! Je peux vous aider avec :
  
• Nos services (SEO, médias sociaux, développement web, UI/UX, mobile)
• Nos tarifs et devis personnalisés
• Comment nous contacter
• Informations sur votre projet digital

Pouvez-vous me donner plus de détails sur ce qui vous intéresse ? Vous pouvez aussi remplir notre formulaire de contact ou prendre rendez-vous pour une consultation gratuite.`
}

// Intégration avec OpenAI
async function getOpenAIResponse(
  message: string, 
  conversationHistory: Array<{role: string, content: string}> = []
): Promise<string | null> {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY
  
  if (!OPENAI_API_KEY) {
    return null
  }

  try {
    const messages = [
      {
        role: 'system',
        content: chatbotConfig.systemPrompt,
      },
      // Ajouter l'historique de conversation (limité aux 5 derniers messages)
      ...conversationHistory.slice(-5),
      {
        role: 'user',
        content: message,
      },
    ]

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: chatbotConfig.aiConfig.openai.model,
        messages,
        max_tokens: chatbotConfig.aiConfig.openai.maxTokens,
        temperature: chatbotConfig.aiConfig.openai.temperature,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('OpenAI API error:', response.status, errorData)
      return null
    }

    const data = await response.json()
    return data.choices[0]?.message?.content?.trim() || null
  } catch (error) {
    console.error('OpenAI API error:', error)
    return null
  }
}

function buildGeminiSteps(
  message: string,
  conversationHistory: Array<{ role: string; content: string }> = []
): GeminiStep[] {
  const normalized = conversationHistory
    .filter(
      (msg): msg is { role: 'user' | 'assistant'; content: string } =>
        (msg.role === 'user' || msg.role === 'assistant') &&
        typeof msg.content === 'string' &&
        msg.content.trim().length > 0
    )
    .slice(-6)
    .map((msg) => ({
      role: msg.role,
      text: msg.content.trim(),
    }))

  while (normalized.length > 0 && normalized[0].role !== 'user') {
    normalized.shift()
  }

  const steps: GeminiStep[] = []
  for (const item of normalized) {
    const stepType: GeminiStep['type'] =
      item.role === 'assistant' ? 'model_output' : 'user_input'
    const lastStep = steps[steps.length - 1]
    if (lastStep && lastStep.type === stepType) {
      lastStep.content[0].text += `\n\n${item.text}`
    } else {
      steps.push({
        type: stepType,
        content: [{ type: 'text', text: item.text }],
      })
    }
  }

  const trimmedMessage = message.trim()
  const lastStep = steps[steps.length - 1]
  if (lastStep && lastStep.type === 'user_input') {
    lastStep.content[0].text += `\n\n${trimmedMessage}`
  } else {
    steps.push({
      type: 'user_input',
      content: [{ type: 'text', text: trimmedMessage }],
    })
  }

  return steps
}

// Intégration avec Google Gemini (alternative gratuite)
async function getGeminiResponse(
  message: string,
  conversationHistory: Array<{role: string, content: string}> = []
): Promise<string | null> {
  try {
    const steps = buildGeminiSteps(message, conversationHistory)

    return await createGeminiInteraction({
      model: chatbotConfig.aiConfig.gemini.model,
      systemInstruction: chatbotConfig.systemPrompt,
      input: steps,
      thinkingLevel: chatbotConfig.aiConfig.gemini.thinkingLevel,
      store: false,
    })
  } catch (error) {
    console.error('Gemini API error:', error)
    return null
  }
}

// Fonction principale pour obtenir une réponse IA
async function getAIResponse(
  message: string,
  conversationHistory: Array<{role: string, content: string}> = []
): Promise<{ response: string; source: ChatSource }> {
  // Essayer OpenAI en premier
  const openAIResponse = await getOpenAIResponse(message, conversationHistory)
  if (openAIResponse) {
    return { response: openAIResponse, source: 'openai' }
  }

  // Essayer Gemini en second
  const geminiResponse = await getGeminiResponse(message, conversationHistory)
  if (geminiResponse) {
    return { response: geminiResponse, source: 'gemini' }
  }

  // Fallback vers le système de réponses intelligentes
  return { response: findBestResponse(message), source: 'fallback' }
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  const rateLimit = checkRateLimit(`chat:${ip}`, {
    limit: 25,
    windowMs: 5 * 60_000,
  })
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Trop de messages envoyés. Réessayez dans un instant.' },
      {
        status: 429,
        headers: { 'Retry-After': String(rateLimit.retryAfterSec) },
      }
    )
  }

  let rawBody: unknown
  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json({ error: 'Requête JSON invalide' }, { status: 400 })
  }

  const parsed = chatRequestSchema.safeParse(rawBody)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Message invalide', details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  try {
    const { message, history } = parsed.data
    const conversationHistory: Array<{ role: string; content: string }> =
      (history ?? []).slice(-10)

    const { response, source } = await getAIResponse(message, conversationHistory)

    return NextResponse.json({ response, source })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Erreur lors du traitement de votre message' },
      { status: 500 }
    )
  }
}

