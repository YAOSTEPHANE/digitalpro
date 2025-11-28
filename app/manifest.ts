import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: 'digitalpro',
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#6366f1',
    icons: [
      {
        src: '/logo/logo.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}

