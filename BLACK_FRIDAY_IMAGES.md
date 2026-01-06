# Guide d'ajout des images Black Friday

## 📁 Emplacement des images

Placez toutes les images Black Friday dans le dossier :
```
public/images/black-friday/
```

## 📋 Liste des images nécessaires

Vous devez ajouter les 8 images suivantes avec ces noms exacts :

1. **`site-vitrine.jpg`** (ou .png, .webp)
   - Offre : Site Vitrine
   - Prix : 100.000 F

2. **`maintenance.jpg`**
   - Offre : Maintenance Informatique
   - Prix : Sur devis

3. **`application-web.jpg`**
   - Offre : Application Web
   - Prix : 300.000 F

4. **`publicite-reseaux.jpg`**
   - Offre : Publicité Réseaux Sociaux
   - Prix : 300.000 F

5. **`tracking.jpg`**
   - Offre : Tracking
   - Prix : 300.000 F

6. **`ecommerce-app.jpg`**
   - Offre : E-commerce App
   - Prix : 1.500.000 F

7. **`application-mobile.jpg`**
   - Offre : Application Mobile
   - Prix : 500.000 F

8. **`affiche-pub.jpg`**
   - Offre : Affiche Pub
   - Prix : 200.000 F

## 🎨 Formats acceptés

- **JPG/JPEG** (recommandé)
- **PNG**
- **WebP** (meilleure compression)

## 📏 Dimensions recommandées

- **Largeur** : 800px minimum
- **Hauteur** : 600px minimum
- **Ratio** : 4:3 ou 16:9
- **Taille fichier** : < 500KB par image (optimisé pour le web)

## 🚀 Comment ajouter les images

### Méthode 1 : Via l'explorateur de fichiers

1. Ouvrez le dossier `public/images/black-friday/`
2. Copiez vos images dans ce dossier
3. Renommez-les selon la liste ci-dessus

### Méthode 2 : Via le terminal

```bash
# Windows PowerShell
Copy-Item "chemin\vers\votre\image.jpg" "public\images\black-friday\site-vitrine.jpg"

# Linux/Mac
cp chemin/vers/votre/image.jpg public/images/black-friday/site-vitrine.jpg
```

## ✅ Vérification

Une fois les images ajoutées, vérifiez que :
- ✅ Tous les fichiers sont dans `public/images/black-friday/`
- ✅ Les noms de fichiers correspondent exactement à la liste
- ✅ Les images sont optimisées (taille raisonnable)
- ✅ Les images s'affichent correctement sur le site

## 🔧 Optimisation des images

Pour optimiser vos images avant de les ajouter :

1. **En ligne** : Utilisez [TinyPNG](https://tinypng.com/) ou [Squoosh](https://squoosh.app/)
2. **Localement** : Utilisez ImageMagick ou des outils similaires

## 📝 Notes

- Les images seront automatiquement chargées par Next.js Image
- Si une image est manquante, un fond dégradé sera affiché à la place
- Les images sont optimisées automatiquement par Next.js pour de meilleures performances









