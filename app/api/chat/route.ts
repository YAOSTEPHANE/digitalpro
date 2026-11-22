import { NextRequest, NextResponse } from 'next/server'
import { chatbotConfig } from '@/lib/chatbot-config'
import { createGeminiInteraction, type GeminiStep } from '@/lib/gemini'

// Base de connaissances améliorée pour les réponses de fallback
const knowledgeBase: { [key: string]: string | ((message: string) => string) } = {
  'bonjour': 'Bonjour ! 👋 Je suis l\'assistant virtuel de digitalpro solutions. Comment puis-je vous aider aujourd\'hui ?',
  'salut': 'Salut ! Je suis là pour répondre à vos questions sur nos services digitaux.',
  'services': 'Nous proposons plusieurs services : SEO et référencement naturel, gestion des médias sociaux, développement web, conception UI/UX, développement mobile et création de boutiques e-commerce Shopify. Lequel vous intéresse ?',
  'seo': 'Le SEO (Search Engine Optimization) permet d\'améliorer votre visibilité sur les moteurs de recherche. Nous optimisons votre site pour qu\'il apparaisse en première page de Google et attirer plus de clients. Voulez-vous en savoir plus ou obtenir un devis ?',
  'référencement': 'Le référencement naturel (SEO) est essentiel pour attirer des clients. Nous analysons votre site, optimisons le contenu et améliorons votre classement dans les résultats de recherche. Contactez-nous pour discuter de vos besoins !',
  'médias sociaux': 'Nous gérons vos réseaux sociaux (Facebook, Instagram, LinkedIn, etc.), créons du contenu engageant et gérons vos publicités pour augmenter votre visibilité et votre communauté.',
  'réseaux sociaux': 'Nous créons et publions du contenu régulier sur vos réseaux sociaux, interagissons avec votre communauté et gérons vos campagnes publicitaires pour maximiser votre portée.',
  'développement web': 'Nous créons des sites web modernes, responsives et performants. Que ce soit un site vitrine, un e-commerce ou une application web sur mesure, nous adaptons la solution à vos besoins.',
  'site web': 'Nous développons des sites web professionnels adaptés à vos besoins. Nos sites sont rapides, sécurisés et optimisés pour le référencement. Voulez-vous discuter de votre projet ?',
  'prix': 'Nos tarifs varient selon vos besoins et la complexité du projet. Pour obtenir un devis personnalisé gratuit, n\'hésitez pas à nous contacter via le formulaire de contact ou à prendre rendez-vous pour une consultation.',
  'tarif': 'Chaque projet est unique. Contactez-nous pour discuter de vos besoins et obtenir un devis adapté à votre budget. Nous proposons des solutions pour tous les budgets.',
  'contact': 'Vous pouvez nous contacter de plusieurs façons : via le formulaire de contact sur notre site, par email à digitalprosolutions27@gmail.com, par téléphone au +225 07 48 97 60 31, ou prendre rendez-vous pour une consultation gratuite.',
  'devis': 'Pour obtenir un devis personnalisé, remplissez le formulaire de contact avec vos besoins détaillés ou prenez rendez-vous. Nous vous répondrons rapidement avec une estimation adaptée à votre projet.',
  'combien': 'Nos prix dépendent de la complexité de votre projet. Contactez-nous pour discuter de vos besoins et obtenir un devis gratuit et personnalisé.',
  'aide': 'Je suis là pour vous aider ! Posez-moi vos questions sur nos services (SEO, médias sociaux, développement web), nos tarifs, ou comment nous pouvons vous accompagner dans votre projet digital.',
  'adresse': `Notre agence est située à ${chatbotConfig.companyInfo.location}. Vous pouvez nous contacter par email ou téléphone pour plus d'informations.`,
  'email': `Vous pouvez nous contacter par email à ${chatbotConfig.companyInfo.email}. Nous répondons généralement dans les 24 heures.`,
  'téléphone': `Vous pouvez nous appeler au ${chatbotConfig.companyInfo.phone}. Nous sommes disponibles pour discuter de votre projet.`,
  'rendez-vous': 'Vous pouvez prendre rendez-vous pour une consultation gratuite de 30 minutes via notre calendrier en ligne. Cliquez sur "Prendre rendez-vous" dans le menu ou visitez la page /book.',
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

// Intégration avec Google Gemini (alternative gratuite)
async function getGeminiResponse(
  message: string,
  conversationHistory: Array<{role: string, content: string}> = []
): Promise<string | null> {
  try {
    const steps: GeminiStep[] = [
      ...conversationHistory
        .filter((msg) => msg.role !== 'system')
        .slice(-5)
        .map(
          (msg): GeminiStep => ({
            type: msg.role === 'assistant' ? 'model_output' : 'user_input',
            content: [{ type: 'text', text: msg.content }],
          })
        ),
      {
        type: 'user_input',
        content: [{ type: 'text', text: message }],
      },
    ]

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
): Promise<string> {
  // Essayer OpenAI en premier
  const openAIResponse = await getOpenAIResponse(message, conversationHistory)
  if (openAIResponse) {
    return openAIResponse
  }

  // Essayer Gemini en second
  const geminiResponse = await getGeminiResponse(message, conversationHistory)
  if (geminiResponse) {
    return geminiResponse
  }

  // Fallback vers le système de réponses intelligentes
  return findBestResponse(message)
}

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message invalide' },
        { status: 400 }
      )
    }

    // Valider et formater l'historique de conversation
    interface HistoryMessage {
      role: 'user' | 'assistant'
      content: string
    }
    
    const conversationHistory: Array<{role: string, content: string}> = Array.isArray(history)
      ? history
          .slice(-10) // Limiter à 10 messages pour éviter les requêtes trop longues
          .filter((msg): msg is HistoryMessage => {
            if (msg === null || typeof msg !== 'object') return false
            if (!('role' in msg) || !('content' in msg)) return false
            const role = (msg as { role: unknown }).role
            const content = (msg as { content: unknown }).content
            return (
              (role === 'user' || role === 'assistant') &&
              typeof content === 'string'
            )
          })
          .map((msg) => ({
            role: msg.role,
            content: msg.content,
          }))
      : []

    const response = await getAIResponse(message, conversationHistory)

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Erreur lors du traitement de votre message' },
      { status: 500 }
    )
  }
}

