# Configuration du Chatbot IA

## ✅ Chatbot IA Configuré avec Succès !

Le chatbot est maintenant équipé d'une intelligence artificielle avancée avec plusieurs options de configuration.

## 🤖 Système IA Hybride

Le chatbot utilise un système intelligent à plusieurs niveaux :

1. **OpenAI GPT-3.5** (priorité 1) - Si une clé API est configurée
2. **Google Gemini** (priorité 2) - Alternative gratuite si OpenAI n'est pas disponible
3. **Système de fallback intelligent** - Réponses contextuelles basées sur des mots-clés

## 🚀 Configuration Rapide

### Option 1 : Utiliser OpenAI (Recommandé)

1. **Obtenir une clé API OpenAI** :
   - Allez sur https://platform.openai.com/
   - Créez un compte ou connectez-vous
   - Allez dans "API Keys" → "Create new secret key"
   - Copiez votre clé API

2. **Ajouter la clé dans `.env.local`** :
   ```env
   OPENAI_API_KEY=sk-votre_cle_api_ici
   ```

3. **Redémarrer le serveur** :
   ```bash
   npm run dev
   ```

### Option 2 : Utiliser Google Gemini (Gratuit)

1. **Obtenir une clé API Gemini** :
   - Allez sur https://makersuite.google.com/app/apikey
   - Connectez-vous avec votre compte Google
   - Créez une nouvelle clé API
   - Copiez votre clé

2. **Ajouter la clé dans `.env.local`** :
   ```env
   GEMINI_API_KEY=votre_cle_gemini_ici
   ```

3. **Redémarrer le serveur**

### Option 3 : Utiliser les deux (Recommandé pour la redondance)

```env
OPENAI_API_KEY=sk-votre_cle_openai
GEMINI_API_KEY=votre_cle_gemini
```

Le système essaiera OpenAI en premier, puis Gemini en cas d'échec, et enfin le système de fallback.

## 📋 Fichier .env.local Complet

```env
# URL du site
NEXT_PUBLIC_SITE_URL=https://digitalprosolutions.com

# Clés API pour l'IA (au moins une est recommandée)
OPENAI_API_KEY=sk-votre_cle_openai_ici
GEMINI_API_KEY=votre_cle_gemini_ici
```

## 🎯 Fonctionnalités Avancées

### Historique de Conversation
Le chatbot conserve maintenant le contexte de la conversation pour des réponses plus pertinentes et cohérentes.

### Contexte Enrichi
L'IA connaît automatiquement :
- Les informations de l'entreprise
- Les services offerts
- Les coordonnées de contact
- Le style de communication souhaité

### Réponses Contextuelles
Le système comprend le contexte de la conversation et peut répondre de manière plus naturelle.

## ⚙️ Personnalisation

### Modifier le Prompt Système

Éditez `lib/chatbot-config.ts` pour personnaliser :
- Le style de communication
- Les informations sur l'entreprise
- Les instructions pour l'IA

### Ajuster les Paramètres IA

Dans `lib/chatbot-config.ts`, vous pouvez modifier :
```typescript
aiConfig: {
  openai: {
    model: 'gpt-3.5-turbo', // ou 'gpt-4' pour plus de qualité
    maxTokens: 200,          // Longueur max de la réponse
    temperature: 0.7,        // Créativité (0-1)
  },
}
```

### Ajouter des Réponses de Fallback

Éditez la fonction `findBestResponse()` dans `app/api/chat/route.ts` pour ajouter des réponses personnalisées.

## 💰 Coûts

### OpenAI
- GPT-3.5-turbo : ~$0.002 par 1000 tokens (très économique)
- GPT-4 : Plus cher mais meilleure qualité
- Compte avec crédit gratuit au départ

### Google Gemini
- Gratuit avec limites généreuses
- Parfait pour commencer

## 🔒 Sécurité

- Les clés API sont stockées dans `.env.local` (non commité dans Git)
- Les requêtes sont sécurisées via HTTPS
- L'historique de conversation est limité pour éviter les fuites de données

## 🐛 Dépannage

### Le chatbot ne répond pas avec l'IA

1. Vérifiez que la clé API est bien dans `.env.local`
2. Vérifiez que vous avez redémarré le serveur après l'ajout de la clé
3. Vérifiez les logs de la console pour les erreurs
4. Le système utilisera automatiquement le fallback si l'IA n'est pas disponible

### Erreur "API key invalid"

- Vérifiez que la clé est correctement copiée (sans espaces)
- Pour OpenAI : assurez-vous que la clé commence par `sk-`
- Vérifiez que vous avez des crédits sur votre compte OpenAI

### Réponses trop longues ou trop courtes

Modifiez `maxTokens` dans `lib/chatbot-config.ts` :
- Plus petit = réponses plus courtes
- Plus grand = réponses plus longues

## 📊 Monitoring

Pour surveiller l'utilisation de l'API :
- OpenAI : https://platform.openai.com/usage
- Gemini : https://makersuite.google.com/app/apikey

## ✨ Le Chatbot est Prêt !

Une fois configuré, le chatbot utilisera automatiquement l'IA pour répondre aux questions de manière intelligente et contextuelle.

