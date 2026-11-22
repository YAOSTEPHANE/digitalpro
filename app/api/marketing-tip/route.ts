import { NextRequest, NextResponse } from 'next/server';
import type { BrandAccent } from '@/lib/brand';
import {
  createGeminiInteraction,
  DEFAULT_GEMINI_MODEL,
  getGeminiApiKey,
} from '@/lib/gemini';
import { checkRateLimit, getClientIp } from '@/lib/security';

// Interface pour le conseil généré
interface MarketingTip {
  title: string;
  content: string;
  category: string;
  day: number;
  image: string;
  accent: BrandAccent;
}

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(`marketing-tip:${ip}`, {
    limit: 30,
    windowMs: 5 * 60_000,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Trop de requêtes. Veuillez patienter un instant.' },
      {
        status: 429,
        headers: { 'Retry-After': String(rateLimit.retryAfterSec) },
      }
    );
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const parsedDay = Number.parseInt(searchParams.get('day') || '1', 10);
    const dayOfYear =
      Number.isFinite(parsedDay) && parsedDay > 0
        ? ((parsedDay - 1) % 366) + 1
        : 1;

    // Catégories possibles pour varier les conseils
    const categories = [
      'Réseaux Sociaux',
      'SEO',
      'Email Marketing',
      'Contenu',
      'Publicité',
      'Analytics',
      'Stratégie',
      'Mobile',
      'E-commerce',
      'Vidéo',
      'Influence Marketing',
      'Marketing Automation'
    ];

    // Sélectionner une catégorie basée sur le jour de l'année pour la cohérence
    const selectedCategory = categories[dayOfYear % categories.length];

    // Images par catégorie
    const categoryImages: Record<string, string> = {
      'Réseaux Sociaux': '/images/studio/social-media-ads.webp',
      'SEO': '/images/studio/web-architecture.webp',
      'Email Marketing': '/images/studio/content-creation.webp',
      'Contenu': '/images/studio/content-creation.webp',
      'Publicité': '/images/studio/social-media-ads.webp',
      'Analytics': '/images/studio/analytics-growth.webp',
      'Stratégie': '/images/studio/business-strategy.webp',
      'Mobile': '/images/studio/mobile-apps.webp',
      'E-commerce': '/images/studio/ecommerce-commerce.webp',
      'Vidéo': '/images/studio/content-creation.webp',
      'Influence Marketing': '/images/studio/social-media-ads.webp',
      'Marketing Automation': '/images/studio/ui-ux-studio.webp',
    };

    // Appeler l'API Gemini si disponible, sinon utiliser un conseil généré localement
    let tip: MarketingTip;
    const apiKey = getGeminiApiKey();

    if (apiKey) {
      try {
        const prompt = `Tu es un expert en marketing digital. Génère un conseil pratique et actionnable en marketing digital pour le jour ${dayOfYear} de l'année.

Catégorie: ${selectedCategory}

Le conseil doit:
- Être concret et applicable immédiatement
- Être en français
- Faire entre 80 et 120 mots
- Être professionnel mais accessible
- Inclure des exemples pratiques si possible
- Être unique et différent des conseils précédents

Réponds UNIQUEMENT avec un JSON valide dans ce format exact:
{
  "title": "Titre accrocheur du conseil (maximum 60 caractères)",
  "content": "Contenu détaillé du conseil (80-120 mots)",
  "category": "${selectedCategory}"
}`;

        const responseText = await createGeminiInteraction({
          model: DEFAULT_GEMINI_MODEL,
          systemInstruction:
            'Tu es un expert en marketing digital qui donne des conseils pratiques et actionnables en français. Réponds uniquement en JSON valide.',
          input: prompt,
          thinkingLevel: 'low',
          store: false,
          responseFormat: {
            type: 'text',
            mime_type: 'application/json',
            schema: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                content: { type: 'string' },
                category: { type: 'string' },
              },
              required: ['title', 'content', 'category'],
            },
          },
        });

        if (!responseText) {
          throw new Error('No response from Gemini');
        }

        let aiTip: {
          title?: unknown;
          content?: unknown;
          category?: unknown;
        };
        try {
          aiTip = JSON.parse(responseText);
        } catch {
          const jsonMatch = responseText.match(/\{[\s\S]*\}/);
          if (!jsonMatch) {
            throw new Error('Could not parse JSON from Gemini response');
          }
          aiTip = JSON.parse(jsonMatch[0]);
        }

        if (
          typeof aiTip?.title !== 'string' ||
          !aiTip.title.trim() ||
          typeof aiTip?.content !== 'string' ||
          !aiTip.content.trim()
        ) {
          throw new Error('Invalid tip structure returned by Gemini');
        }

        tip = {
          title: aiTip.title.trim(),
          content: aiTip.content.trim(),
          category:
            typeof aiTip.category === 'string' && aiTip.category.trim()
              ? aiTip.category.trim()
              : selectedCategory,
          day: dayOfYear,
          image: categoryImages[selectedCategory] || categoryImages['Contenu'],
          accent: dayOfYear % 2 === 0 ? "blue" : "red",
        };
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error';
        console.error('Gemini error, using fallback:', errorMessage);
        tip = generateLocalTip(dayOfYear, selectedCategory, categoryImages);
      }
    } else {
      // Génération locale sans clé Gemini valide
      tip = generateLocalTip(dayOfYear, selectedCategory, categoryImages);
    }

    return NextResponse.json(tip);
  } catch (error) {
    console.error('Error generating marketing tip:', error);

    // Fallback en cas d'erreur
    const fallbackTip: MarketingTip = {
      title: 'Optimisez votre présence digitale',
      content: 'La cohérence est la clé du succès en marketing digital. Publiez régulièrement du contenu de qualité, engagez avec votre communauté et analysez vos performances pour améliorer continuellement votre stratégie.',
      category: 'Stratégie',
      day: 1,
      image: '/images/studio/business-strategy.webp',
      accent: "blue",
    };

    return NextResponse.json(fallbackTip);
  }
}

// Fonction pour générer un conseil localement (sans IA)
function generateLocalTip(
  dayOfYear: number,
  category: string,
  categoryImages: Record<string, string>
): MarketingTip {
  const tipsByCategory: Record<string, string[]> = {
    'Réseaux Sociaux': [
      'Publiez du contenu de qualité régulièrement. La cohérence est la clé pour construire une communauté engagée. Utilisez les meilleurs moments de publication pour maximiser votre portée.',
      'Interagissez activement avec votre audience. Répondez aux commentaires, posez des questions et créez du contenu qui encourage l\'engagement. Une communauté active est une communauté fidèle.',
      'Utilisez les stories et les reels pour créer du contenu authentique et spontané. Ce format génère plus d\'engagement que les posts traditionnels.',
    ],
    'SEO': [
      'Le référencement naturel est un investissement à long terme. Optimisez vos mots-clés, créez du contenu de qualité et obtenez des backlinks de qualité pour améliorer votre visibilité.',
      'Créez du contenu qui répond aux questions de votre audience. Les recherches vocales et les questions longues deviennent de plus en plus importantes dans le SEO.',
      'Optimisez la vitesse de chargement de votre site. Google favorise les sites rapides, et vos visiteurs aussi. Un site lent perd des conversions.',
    ],
    'Email Marketing': [
      'L\'email reste l\'un des canaux les plus rentables. Segmentez votre liste, testez vos sujets et créez des emails qui apportent de la valeur à vos abonnés.',
      'Personnalisez vos emails avec le prénom et les préférences de vos abonnés. La personnalisation augmente significativement les taux d\'ouverture et de clic.',
      'Créez des séquences d\'emails automatisées pour accueillir vos nouveaux abonnés et les guider dans leur parcours client.',
    ],
    'Contenu': [
      'Ne vendez pas directement, éduquez votre audience. Le contenu éducatif génère plus d\'engagement et établit votre expertise dans votre domaine.',
      'Racontez des histoires authentiques. Les histoires créent une connexion émotionnelle avec votre audience et rendent votre marque mémorable.',
      'Republiez et réutilisez votre contenu performant. Transformez un article de blog en vidéo, en infographie ou en série de posts sur les réseaux sociaux.',
    ],
    'Publicité': [
      'Testez différentes créatives et copies pour vos publicités. Les petits changements peuvent avoir un impact significatif sur vos performances.',
      'Ciblez précisément votre audience. Utilisez les données démographiques, les intérêts et les comportements pour atteindre les bonnes personnes.',
      'Suivez vos métriques de publicité quotidiennement. Ajustez vos budgets et arrêtez les campagnes qui ne performant pas pour optimiser votre ROI.',
    ],
    'Analytics': [
      'Les données sont votre meilleur allié. Analysez vos métriques chaque semaine pour comprendre ce qui fonctionne et ajuster votre stratégie en conséquence.',
      'Définissez des objectifs clairs et mesurables. Sans objectifs, vous ne pouvez pas mesurer le succès de vos campagnes marketing.',
      'Utilisez Google Analytics et les outils de vos plateformes sociales pour comprendre le comportement de votre audience et optimiser votre stratégie.',
    ],
    'Stratégie': [
      'Définissez vos objectifs SMART : Spécifiques, Mesurables, Atteignables, Réalistes et Temporels. Des objectifs clairs vous guident vers le succès.',
      'Connaissez votre audience cible. Créez des personas détaillés pour mieux comprendre les besoins et les motivations de vos clients potentiels.',
      'Développez une stratégie de contenu cohérente. Planifiez vos publications à l\'avance pour maintenir la régularité et la qualité.',
    ],
    'Mobile': [
      'Plus de 60% du trafic web vient du mobile. Assurez-vous que votre site et vos campagnes sont optimisés pour mobile avant tout autre appareil.',
      'Testez votre site sur différents appareils mobiles. Une expérience utilisateur optimale sur mobile est essentielle pour convertir vos visiteurs.',
      'Utilisez des formats de publicité adaptés au mobile. Les vidéos courtes et les formats natifs performant mieux sur mobile.',
    ],
    'E-commerce': [
      'Optimisez vos pages produit avec des descriptions détaillées, des images de qualité et des avis clients. Ces éléments augmentent la confiance et les conversions.',
      'Simplifiez le processus de checkout. Chaque étape supplémentaire dans le processus d\'achat peut faire perdre des clients.',
      'Utilisez l\'email marketing pour récupérer les paniers abandonnés. C\'est l\'une des tactiques les plus rentables en e-commerce.',
    ],
    'Vidéo': [
      'La vidéo domine le marketing digital. Créez des vidéos courtes, captivantes et qui racontent une histoire. Les vidéos génèrent plus d\'engagement que tout autre format.',
      'Les premières secondes sont cruciales. Capturez l\'attention immédiatement avec un hook accrocheur pour éviter que les spectateurs ne partent.',
      'Ajoutez des sous-titres à vos vidéos. Beaucoup d\'utilisateurs regardent les vidéos sans son, surtout sur les réseaux sociaux.',
    ],
    'Influence Marketing': [
      'Collaborez avec des influenceurs authentiques qui partagent vos valeurs. L\'authenticité est plus importante que le nombre de followers.',
      'Créez des partenariats à long terme plutôt que des collaborations ponctuelles. Les relations durables génèrent plus de confiance et de résultats.',
      'Mesurez le ROI de vos collaborations avec des influenceurs. Utilisez des codes promo et des liens de suivi pour évaluer l\'impact réel.',
    ],
    'Marketing Automation': [
      'Automatisez vos processus marketing répétitifs. Cela vous fait gagner du temps et assure une expérience cohérente pour vos clients.',
      'Créez des workflows automatisés pour vos leads. Nurturez vos prospects avec du contenu pertinent à chaque étape de leur parcours.',
      'Utilisez l\'automatisation pour personnaliser vos communications. Les messages personnalisés génèrent de meilleurs résultats que les messages génériques.',
    ],
  };

  const categoryTips = tipsByCategory[category] || tipsByCategory['Stratégie'];
  const tipIndex = dayOfYear % categoryTips.length;
  const content = categoryTips[tipIndex];

  const titles: Record<string, string[]> = {
    'Réseaux Sociaux': [
      'Optimisez votre présence sur les réseaux sociaux',
      'Créez une communauté engagée',
      'Utilisez les formats courts pour plus d\'engagement',
    ],
    'SEO': [
      'Investissez dans le SEO',
      'Créez du contenu optimisé pour les recherches',
      'Optimisez la vitesse de votre site',
    ],
    'Email Marketing': [
      'Utilisez l\'email marketing stratégiquement',
      'Personnalisez vos emails',
      'Automatisez vos séquences d\'emails',
    ],
    'Contenu': [
      'Créez du contenu à valeur ajoutée',
      'Racontez des histoires authentiques',
      'Réutilisez votre contenu performant',
    ],
    'Publicité': [
      'Testez et optimisez vos publicités',
      'Ciblez précisément votre audience',
      'Suivez vos métriques de publicité',
    ],
    'Analytics': [
      'Analysez vos données régulièrement',
      'Définissez des objectifs mesurables',
      'Utilisez les outils d\'analyse',
    ],
    'Stratégie': [
      'Définissez vos objectifs SMART',
      'Connaissez votre audience cible',
      'Développez une stratégie de contenu',
    ],
    'Mobile': [
      'Optimisez pour mobile d\'abord',
      'Testez sur différents appareils',
      'Utilisez des formats adaptés au mobile',
    ],
    'E-commerce': [
      'Optimisez vos pages produit',
      'Simplifiez le processus de checkout',
      'Récupérez les paniers abandonnés',
    ],
    'Vidéo': [
      'Créez des campagnes vidéo engageantes',
      'Capturez l\'attention dès les premières secondes',
      'Ajoutez des sous-titres à vos vidéos',
    ],
    'Influence Marketing': [
      'Collaborez avec des influenceurs authentiques',
      'Créez des partenariats à long terme',
      'Mesurez le ROI de vos collaborations',
    ],
    'Marketing Automation': [
      'Automatisez vos processus marketing',
      'Créez des workflows pour vos leads',
      'Personnalisez avec l\'automatisation',
    ],
  };

  const categoryTitles = titles[category] || titles['Stratégie'];
  const titleIndex = dayOfYear % categoryTitles.length;

  return {
    title: categoryTitles[titleIndex],
    content,
    category,
    day: dayOfYear,
    image: categoryImages[category] || categoryImages['Contenu'],
    accent: dayOfYear % 2 === 0 ? "blue" : "red",
  };
}
