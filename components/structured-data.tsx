/**
 * Composant pour les données structurées JSON-LD (Schema.org)
 * Améliore le référencement en fournissant des informations structurées aux moteurs de recherche
 */

import { siteConfig } from "@/lib/seo";

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.ogImage}`,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
      addressLocality: "Abidjan",
      addressRegion: "Lagunes",
      addressCountry: "CI",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phone,
      contactType: "customer service",
      email: siteConfig.contact.email,
      availableLanguage: ["French"],
    },
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.twitter,
      siteConfig.social.instagram,
      siteConfig.social.linkedin,
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Digital Marketing Agency",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    areaServed: {
      "@type": "Country",
      name: "Côte d'Ivoire",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services digitaux",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO et Référencement",
            description: "Optimisation pour les moteurs de recherche et amélioration de la visibilité en ligne",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Marketing sur les médias sociaux",
            description: "Gestion et stratégie de présence sur les réseaux sociaux",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Développement Web",
            description: "Création de sites web modernes et performants",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Conception UI/UX",
            description: "Design d'interfaces utilisateur et expérience utilisateur optimisée",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Développement d'applications mobiles",
            description: "Création d'applications mobiles iOS et Android",
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}

