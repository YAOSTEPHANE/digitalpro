import { NextRequest, NextResponse } from 'next/server'

// Base de connaissances pour les réponses intelligentes
const knowledgeBase: { [key: string]: string } = {
  'bonjour': 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
  'salut': 'Salut ! Je suis là pour répondre à vos questions sur nos services.',
  'services': 'Nous proposons plusieurs services : SEO (référencement), gestion des médias sociaux, et développement web. Lequel vous intéresse ?',
  'seo': 'Le SEO (Search Engine Optimization) permet d\'améliorer votre visibilité sur les moteurs de recherche. Nous optimisons votre site pour qu\'il apparaisse en première page de Google.',
  'référencement': 'Le référencement naturel (SEO) est essentiel pour attirer des clients. Nous analysons votre site, optimisons le contenu et améliorons votre classement dans les résultats de recherche.',
  'médias sociaux': 'Nous gérons vos réseaux sociaux (Facebook, Instagram, LinkedIn, etc.), créons du contenu engageant et gérons vos publicités pour augmenter votre visibilité.',
  'réseaux sociaux': 'Nous créons et publions du contenu régulier sur vos réseaux sociaux, interagissons avec votre communauté et gérons vos campagnes publicitaires.',
  'développement web': 'Nous créons des sites web modernes, responsives et performants. Que ce soit un site vitrine, un e-commerce ou une application web sur mesure.',
  'site web': 'Nous développons des sites web professionnels adaptés à vos besoins. Nos sites sont rapides, sécurisés et optimisés pour le référencement.',
  'prix': 'Nos tarifs varient selon vos besoins. Pour obtenir un devis personnalisé, n\'hésitez pas à nous contacter via le formulaire de contact ou à prendre rendez-vous.',
  'tarif': 'Chaque projet est unique. Contactez-nous pour discuter de vos besoins et obtenir un devis adapté à votre budget.',
  'contact': 'Vous pouvez nous contacter via le formulaire de contact sur notre site, ou prendre rendez-vous pour une consultation gratuite.',
  'devis': 'Pour obtenir un devis, remplissez le formulaire de contact avec vos besoins détaillés. Nous vous répondrons rapidement avec une estimation personnalisée.',
  'combien': 'Nos prix dépendent de la complexité de votre projet. Contactez-nous pour discuter de vos besoins et obtenir un devis gratuit.',
  'aide': 'Je suis là pour vous aider ! Posez-moi vos questions sur nos services, nos tarifs, ou comment nous pouvons vous accompagner dans votre projet digital.',
}

// Fonction pour trouver la meilleure réponse basée sur les mots-clés
function findBestResponse(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  // Recherche de mots-clés dans le message
  for (const [keyword, response] of Object.entries(knowledgeBase)) {
    if (lowerMessage.includes(keyword)) {
      return response
    }
  }

  // Réponses génériques intelligentes
  if (lowerMessage.includes('merci') || lowerMessage.includes('remercie')) {
    return 'De rien ! N\'hésitez pas si vous avez d\'autres questions. Je suis là pour vous aider.'
  }

  if (lowerMessage.includes('au revoir') || lowerMessage.includes('bye')) {
    return 'Au revoir ! N\'hésitez pas à revenir si vous avez besoin d\'aide. Bonne journée !'
  }

  if (lowerMessage.includes('qui êtes-vous') || lowerMessage.includes('qui etes-vous')) {
    return 'Je suis l\'assistant virtuel de digitalpro solutions, une agence spécialisée en intelligence numérique. Je peux vous renseigner sur nos services : SEO, médias sociaux et développement web.'
  }

  // Réponse par défaut avec suggestions
  return `Merci pour votre message ! Je peux vous aider avec :
  
• Nos services (SEO, médias sociaux, développement web)
• Nos tarifs et devis
• Comment nous contacter
• Informations sur votre projet digital

Pouvez-vous me donner plus de détails sur ce qui vous intéresse ?`
}

// Optionnel : Intégration avec OpenAI (décommentez et configurez si vous avez une clé API)
async function getAIResponse(message: string): Promise<string> {
  // Décommentez cette section si vous voulez utiliser OpenAI
  /*
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY
  
  if (!OPENAI_API_KEY) {
    return findBestResponse(message)
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Tu es un assistant virtuel pour digitalpro solutions, une agence spécialisée en SEO, médias sociaux et développement web. Sois professionnel, amical et concis.',
          },
          {
            role: 'user',
            content: message,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    })

    const data = await response.json()
    return data.choices[0]?.message?.content || findBestResponse(message)
  } catch (error) {
    console.error('OpenAI API error:', error)
    return findBestResponse(message)
  }
  */

  // Pour l'instant, on utilise le système de réponses intelligentes
  return findBestResponse(message)
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message invalide' },
        { status: 400 }
      )
    }

    const response = await getAIResponse(message)

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Erreur lors du traitement de votre message' },
      { status: 500 }
    )
  }
}

