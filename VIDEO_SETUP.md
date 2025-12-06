# Configuration de la vidéo des services

## Comment ajouter votre vidéo YouTube

### Étape 1 : Obtenir l'ID de votre vidéo YouTube

1. Uploadez votre vidéo sur YouTube
2. Copiez l'URL de votre vidéo (ex: `https://www.youtube.com/watch?v=VIDEO_ID`)
3. L'ID de la vidéo est la partie après `v=` dans l'URL

### Étape 2 : Modifier le composant

Ouvrez `app/page.tsx` et modifiez la ligne avec `ServicesVideo` :

```tsx
<ServicesVideo 
  videoId="VOTRE_ID_YOUTUBE" 
  title="Découvrez nos services en vidéo"
  description="Votre description personnalisée"
/>
```

### Exemple

Si votre vidéo YouTube est : `https://www.youtube.com/watch?v=abc123xyz`

Alors utilisez :
```tsx
<ServicesVideo 
  videoId="abc123xyz" 
  title="Découvrez nos services en vidéo"
  description="Une présentation complète de nos solutions digitales"
/>
```

### Alternative : Utiliser une URL complète

Vous pouvez aussi utiliser directement une URL complète :

```tsx
<ServicesVideo 
  videoUrl="https://www.youtube.com/embed/VOTRE_ID" 
  title="Découvrez nos services en vidéo"
  description="Votre description"
/>
```

## Contenu recommandé pour la vidéo

Votre vidéo devrait présenter :

1. **Introduction** (0-30s)
   - Présentation de digitalpro solutions
   - Mission et valeurs

2. **Services principaux** (30s-2min)
   - Développement web
   - Applications mobiles
   - Marketing digital / SEO
   - Conception UI/UX

3. **Avantages** (2min-2min30s)
   - Expertise technique
   - Accompagnement personnalisé
   - Résultats mesurables

4. **Call-to-action** (2min30s-3min)
   - Invitation à contacter
   - Lien vers le formulaire de devis

## Optimisation YouTube

- **Durée recommandée** : 2-3 minutes
- **Format** : 16:9 (1920x1080)
- **Qualité** : HD minimum (720p ou 1080p)
- **Thumbnail** : Créez une miniature attractive
- **Titre** : "Nos services - digitalpro solutions"
- **Description** : Ajoutez des mots-clés SEO

## Notes techniques

- La vidéo est intégrée via iframe YouTube
- Les contrôles YouTube sont activés
- La vidéo ne démarre pas automatiquement (meilleure UX)
- Le son est muet par défaut (l'utilisateur peut l'activer)






