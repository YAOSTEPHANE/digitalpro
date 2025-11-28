import { NextRequest, NextResponse } from 'next/server';

// Interface pour le conseil généré
interface MarketingTip {
  title: string;
  content: string;
  category: string;
  day: number;
  image: string;
  color: string;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dayOfYear = parseInt(searchParams.get('day') || '1', 10);

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
      'Réseaux Sociaux': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
      'SEO': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      'Email Marketing': 'https://images.unsplash.com/photo-1593642532400-2682810df47a?w=800&h=600&fit=crop',
      'Contenu': 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2d70a?w=800&h=600&fit=crop',
      'Publicité': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      'Analytics': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      'Stratégie': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
      'Mobile': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
      'E-commerce': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      'Vidéo': 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&h=600&fit=crop',
      'Influence Marketing': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
      'Marketing Automation': 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
    };

    // Appeler l'API Gemini si disponible, sinon utiliser un conseil généré localement
    let tip: MarketingTip;

    // Utiliser la clé API Gemini fournie
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyBeHODPwS3VpZsI7YgBQ7m8xUjduB9mOC4';

    if (GEMINI_API_KEY) {
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

        // Générer le texte du conseil avec Gemini
        const geminiResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `Tu es un expert en marketing digital qui donne des conseils pratiques et actionnables. Réponds toujours en JSON valide.\n\n${prompt}`,
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.8,
                maxOutputTokens: 500,
                responseMimeType: 'application/json',
              },
            }),
          }
        );

        if (!geminiResponse.ok) {
          throw new Error(`Gemini API error: ${geminiResponse.status}`);
        }

        const geminiData = await geminiResponse.json();
        const responseText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

        if (responseText) {
          let aiTip;
          try {
            // Essayer de parser le JSON directement
            aiTip = JSON.parse(responseText);
          } catch (parseError) {
            // Si le JSON est dans un bloc de code, extraire le contenu
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              aiTip = JSON.parse(jsonMatch[0]);
            } else {
              throw new Error('Could not parse JSON from Gemini response');
            }
          }

          // Générer une image avec Gemini (Imagen)
          let generatedImage = categoryImages[selectedCategory] || categoryImages['Contenu'];

          try {
            const imagePrompt = `Créer une image professionnelle et moderne illustrant le concept de "${aiTip.title}" en marketing digital. L'image doit être professionnelle, moderne, colorée avec des tons rouge et bleu, représentant le marketing digital et la technologie, style illustration moderne, sans texte`;

            // Utiliser Gemini pour générer une description d'image, puis utiliser Imagen ou une alternative
            // Note: Gemini ne génère pas directement des images, on utilise une description améliorée
            // Pour les images, on peut utiliser un service comme Unsplash avec des mots-clés générés
            
            // Générer des mots-clés pour l'image avec Gemini
            const imageKeywordsResponse = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  contents: [
                    {
                      parts: [
                        {
                          text: `Génère 3-5 mots-clés en anglais pour rechercher une image sur Unsplash qui illustre le concept: "${aiTip.title}" en marketing digital. Réponds uniquement avec les mots-clés séparés par des virgules, sans autre texte.`,
                        },
                      ],
                    },
                  ],
                  generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 50,
                  },
                }),
              }
            );

            if (imageKeywordsResponse.ok) {
              const keywordsData = await imageKeywordsResponse.json();
              const keywords = keywordsData.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'marketing digital technology';
              // Utiliser Unsplash avec les mots-clés générés
              generatedImage = `https://source.unsplash.com/800x600/?${encodeURIComponent(keywords)}`;
            }
          } catch (imageError) {
            console.error('Error generating image keywords:', imageError);
            // Utiliser l'image de fallback si la génération échoue
          }

          tip = {
            ...aiTip,
            day: dayOfYear,
            image: generatedImage,
            color: dayOfYear % 2 === 0 ? 'from-blue-500 to-red-500' : 'from-red-500 to-blue-500',
          };
        } else {
          throw new Error('No response from Gemini');
        }
      } catch (error) {
        console.error('Gemini error, using fallback:', error);
        // Fallback vers génération locale
        tip = generateLocalTip(dayOfYear, selectedCategory, categoryImages);
      }
    } else {
      // Génération locale sans API
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
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
      color: 'from-red-500 to-blue-500',
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
    color: dayOfYear % 2 === 0 ? 'from-blue-500 to-red-500' : 'from-red-500 to-blue-500',
  };
}
