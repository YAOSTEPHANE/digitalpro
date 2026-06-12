# Configuration des Variables d'Environnement

## 📝 Comment créer le fichier .env.local

### Méthode 1 : Via l'éditeur de texte

1. **Créez un nouveau fichier** nommé `.env.local` à la racine du projet (même niveau que `package.json`)

2. **Ajoutez le contenu suivant** :

```env
# URL du site web (utilisée pour le SEO et les métadonnées)
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com

# URLs des démos SaaS hébergées sur Vercel (iframe intégrée sur la page d'accueil)
NEXT_PUBLIC_DEMO_WEB_URL=https://www.nyimmobilier.com
NEXT_PUBLIC_DEMO_MOBILE_URL=https://enregistreur-caisse.vercel.app

# Activer l'iframe intégrée pour NY Immobilier (nécessite frame-ancestors côté nyimmobilier.com)
# NEXT_PUBLIC_DEMO_WEB_EMBED=true
```

3. **Remplacez `https://votre-domaine.com`** par votre URL réelle :
   - En développement local : `http://localhost:3000`
   - En production : `https://digitalprosolutions.com` (ou votre domaine réel)

### Méthode 2 : Via le terminal

**Sur Windows (PowerShell) :**
```powershell
# Créer le fichier .env.local
New-Item -Path .env.local -ItemType File

# Ajouter le contenu
Add-Content -Path .env.local -Value "NEXT_PUBLIC_SITE_URL=https://votre-domaine.com"
```

**Sur Linux/Mac :**
```bash
# Créer le fichier .env.local
echo "NEXT_PUBLIC_SITE_URL=https://votre-domaine.com" > .env.local
```

## 🔧 Exemple de contenu pour .env.local

```env
# URL du site web (utilisée pour le SEO et les métadonnées)
# En développement local :
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# En production (remplacez par votre domaine réel) :
# NEXT_PUBLIC_SITE_URL=https://digitalprosolutions.com
```

## ⚠️ Important

1. **Ne commitez JAMAIS** le fichier `.env.local` dans Git (il est déjà dans `.gitignore`)
2. **Utilisez des valeurs différentes** pour le développement et la production
3. **Redémarrez le serveur de développement** après avoir créé/modifié `.env.local` :
   ```bash
   npm run dev
   ```

## 🌐 Configuration selon l'environnement

### Développement local
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Production (Vercel, Netlify, etc.)
Dans votre plateforme d'hébergement, ajoutez la variable d'environnement :
- **Nom** : `NEXT_PUBLIC_SITE_URL`
- **Valeur** : `https://votre-domaine.com`

### Vercel
1. Allez dans votre projet Vercel
2. Settings → Environment Variables
3. Ajoutez `NEXT_PUBLIC_SITE_URL` avec votre URL de production
4. Ajoutez aussi les URLs de démo :
   - `NEXT_PUBLIC_DEMO_WEB_URL` → URL Vercel de l'app web (dashboard CRM)
   - `NEXT_PUBLIC_DEMO_MOBILE_URL` → URL Vercel de l'app mobile (réservation)

### Autoriser l'intégration iframe (apps Vercel)

Pour que vos apps Next.js s'affichent dans une iframe sur digitalpro, ajoutez dans **chaque app démo** un fichier `next.config.ts` :

```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://digitalprosolutions.com https://*.digitalprosolutions.com http://localhost:3000",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

Remplacez `digitalprosolutions.com` par votre domaine vitrine si différent.

### Netlify
1. Allez dans Site settings → Environment variables
2. Ajoutez `NEXT_PUBLIC_SITE_URL` avec votre URL de production

## ✅ Vérification

Pour vérifier que la variable est bien chargée, vous pouvez temporairement ajouter dans votre code :

```typescript
console.log('Site URL:', process.env.NEXT_PUBLIC_SITE_URL)
```

## 📚 Documentation Next.js

Pour plus d'informations sur les variables d'environnement dans Next.js :
https://nextjs.org/docs/app/building-your-application/configuring/environment-variables

