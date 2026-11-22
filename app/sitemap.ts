import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url

  // Pages principales du site
  const routes = [
    '',
    '/a-propos',
    '/services',
    '/sites-web',
    '/design',
    '/e-commerce',
    '/technologies',
    '/contact',
    '/book',
    '/devis',
    '/facture',
    '/faq',
    '/retours',
    '/cookies',
  ]

  // Génération des entrées du sitemap
  const sitemapEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))

  return sitemapEntries
}

