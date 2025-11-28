# Configuration de l'API Gemini pour les conseils marketing

## Clé API configurée

La clé API Gemini suivante est configurée dans le code :
```
AIzaSyBeHODPwS3VpZsI7YgBQ7m8xUjduB9mOC4
```

## Configuration recommandée

Pour une meilleure sécurité, il est recommandé de créer un fichier `.env.local` à la racine du projet avec :

```env
GEMINI_API_KEY=AIzaSyBeHODPwS3VpZsI7YgBQ7m8xUjduB9mOC4
```

## Fonctionnalités

- ✅ Génération de conseils marketing quotidiens avec Gemini
- ✅ Génération de mots-clés pour les images avec Gemini
- ✅ Images dynamiques via Unsplash basées sur les mots-clés générés
- ✅ Fallback automatique si l'API n'est pas disponible

## Modèle utilisé

- **Modèle** : `gemini-pro`
- **Endpoint** : `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`

## Note de sécurité

⚠️ **Important** : Ne commitez jamais votre fichier `.env.local` dans Git. Il est déjà dans `.gitignore`.

