# Instructions de déploiement sur Hostinger

## Option 1 : Déploiement sur VPS Hostinger (Recommandé)

### Prérequis
- VPS Hostinger avec Node.js 18+ installé
- Accès SSH au serveur
- Domaine configuré

### Étapes de déploiement

1. **Se connecter au serveur via SSH**
```bash
ssh root@votre-serveur.hosting.com
```

2. **Installer Node.js (si pas déjà installé)**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

3. **Cloner le repository**
```bash
cd /var/www
git clone https://github.com/YAOSTEPHANE/digitalpro.git
cd digitalpro
```

4. **Installer les dépendances**
```bash
npm install
```

5. **Construire le projet**
```bash
npm run build
```

6. **Démarrer le serveur en production**
```bash
npm start
```

7. **Configurer PM2 pour un processus permanent**
```bash
npm install -g pm2
pm2 start npm --name "digitalpro" -- start
pm2 save
pm2 startup
```

8. **Configurer Nginx comme reverse proxy** (si besoin)
```nginx
server {
    listen 80;
    server_name votredomaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Option 2 : Déploiement via cPanel (Alternative)

Si vous utilisez l'hébergement partagé Hostinger :

1. **Connectez-vous à votre cPanel**
2. **Ouvrez File Manager**
3. **Téléversez les fichiers** dans le répertoire `public_html`
4. **Installez Node.js** via l'onglet Node.js dans cPanel
5. **Configurez l'application** pour pointer vers votre dossier

---

## Option 3 : Déploiement avec Git en production

1. **Sur le serveur**
```bash
cd /var/www
git pull origin main
npm install
npm run build
pm2 restart digitalpro
```

---

## Variables d'environnement

Créez un fichier `.env.local` sur le serveur avec :

```env
# Configuration Email (si nécessaire)
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-password

# Autres variables nécessaires
```

---

## Commandes utiles

### PM2
- Voir les logs : `pm2 logs digitalpro`
- Redémarrer : `pm2 restart digitalpro`
- Arrêter : `pm2 stop digitalpro`
- Status : `pm2 status`

### Git
- Pull les changements : `git pull origin main`
- Voir l'historique : `git log`

### Next.js
- Build : `npm run build`
- Start : `npm start`
- Dev : `npm run dev`

---

## Support

Pour toute question, consultez :
- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Hostinger](https://www.hostinger.com/help)
- Support Hostinger : support@hostinger.com

