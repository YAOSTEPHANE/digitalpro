# Configuration du Chatbot IA

## ✅ Chatbot installé avec succès !

Le chatbot est maintenant intégré à votre site et fonctionne avec un système de réponses intelligentes basé sur des mots-clés.

## 🎯 Fonctionnalités

- **Interface moderne** : Design élégant avec dégradé violet/bleu
- **Responsive** : Fonctionne parfaitement sur mobile et desktop
- **Réponses intelligentes** : Comprend les questions sur vos services
- **Historique des messages** : Conserve la conversation
- **Animation fluide** : Transitions et animations modernes

## 🤖 Système de réponses actuel

Le chatbot utilise actuellement un système de réponses basé sur des mots-clés pour :
- Services (SEO, médias sociaux, développement web)
- Tarifs et devis
- Informations de contact
- Questions générales

## 🚀 Améliorer avec OpenAI (Optionnel)

Si vous voulez utiliser une vraie IA (OpenAI GPT), suivez ces étapes :

### 1. Obtenir une clé API OpenAI

1. Allez sur https://platform.openai.com/
2. Créez un compte ou connectez-vous
3. Allez dans "API Keys" et créez une nouvelle clé
4. Copiez votre clé API

### 2. Configurer la variable d'environnement

Créez un fichier `.env.local` à la racine de votre projet :

```env
OPENAI_API_KEY=votre_cle_api_ici
```

### 3. Décommenter le code dans `app/api/chat/route.ts`

Ouvrez `app/api/chat/route.ts` et décommentez la section OpenAI dans la fonction `getAIResponse()`.

### 4. Redémarrer le serveur

```bash
npm run dev
```

## 📝 Personnaliser les réponses

Pour ajouter ou modifier les réponses du chatbot, éditez le fichier `app/api/chat/route.ts` :

```typescript
const knowledgeBase: { [key: string]: string } = {
  'votre-mot-cle': 'Votre réponse personnalisée ici',
  // Ajoutez d'autres entrées...
}
```

## 🎨 Personnaliser le design

Le design du chatbot peut être modifié dans `components/chatbot.tsx` :
- Couleurs : Modifiez les classes `from-purple-600 to-blue-600`
- Taille : Ajustez `w-96 h-[600px]`
- Position : Changez `bottom-6 right-6`

## ✨ Le chatbot est prêt !

Le chatbot apparaît automatiquement sur toutes les pages de votre site avec un bouton flottant en bas à droite.

