import { NextRequest, NextResponse } from 'next/server'

interface SiteRequest {
  type: string
  style: string
  colors: string[]
  features: string[]
  description: string
  businessName?: string
  businessType?: string
}

// Fonction pour générer le code HTML/CSS/JS du site avec fonctionnalités avancées
function generateSiteCode(request: SiteRequest): string {
  const { style, colors, features, description, businessName, businessType } = request
  
  // Couleurs par défaut si non spécifiées
  const primaryColor = colors[0] || '#ef4444'
  const secondaryColor = colors[1] || '#3b82f6'
  const accentColor = colors[2] || '#fbbf24'
  
  // Convertir les couleurs hex en RGB pour les effets
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 239, g: 68, b: 68 }
  }
  
  const primaryRgb = hexToRgb(primaryColor)
  const secondaryRgb = hexToRgb(secondaryColor)
  
  const isDark = style === 'sombre'
  const bgColor = isDark ? '#0a0a0a' : '#ffffff'
  const textColor = isDark ? '#ffffff' : '#1a1a1a'
  const cardBg = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
  
  // Génération du HTML avec fonctionnalités avancées
  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${description.substring(0, 160)}">
    <title>${businessName || 'Mon Site Web'} - ${businessType || 'Site Professionnel'}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        :root {
            --primary: ${primaryColor};
            --secondary: ${secondaryColor};
            --accent: ${accentColor};
            --primary-rgb: ${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b};
            --secondary-rgb: ${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b};
            --bg: ${bgColor};
            --text: ${textColor};
            --card-bg: ${cardBg};
            --border: ${borderColor};
        }
        
        html {
            scroll-behavior: smooth;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: var(--text);
            background: var(--bg);
            overflow-x: hidden;
            position: relative;
        }
        
        /* Animated Background */
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${isDark 
              ? `radial-gradient(circle at 20% 50%, rgba(var(--primary-rgb), 0.1) 0%, transparent 50%),
                 radial-gradient(circle at 80% 80%, rgba(var(--secondary-rgb), 0.1) 0%, transparent 50%)`
              : `radial-gradient(circle at 20% 50%, rgba(var(--primary-rgb), 0.05) 0%, transparent 50%),
                 radial-gradient(circle at 80% 80%, rgba(var(--secondary-rgb), 0.05) 0%, transparent 50%)`};
            z-index: -1;
            animation: backgroundMove 20s ease-in-out infinite;
        }
        
        @keyframes backgroundMove {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-20px, -20px) scale(1.1); }
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        /* Advanced Header with Glassmorphism */
        header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background: ${isDark 
              ? 'rgba(10, 10, 10, 0.8)' 
              : 'rgba(255, 255, 255, 0.8)'};
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border-bottom: 1px solid var(--border);
            transition: all 0.3s ease;
        }
        
        header.scrolled {
            box-shadow: 0 10px 30px rgba(var(--primary-rgb), 0.1);
        }
        
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.2rem 0;
        }
        
        .logo {
            font-size: 1.8rem;
            font-weight: 800;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            letter-spacing: -0.5px;
            transition: transform 0.3s ease;
        }
        
        .logo:hover {
            transform: scale(1.05);
        }
        
        .nav-links {
            display: flex;
            gap: 2.5rem;
            list-style: none;
            align-items: center;
        }
        
        .nav-links a {
            color: var(--text);
            text-decoration: none;
            font-weight: 500;
            position: relative;
            transition: color 0.3s ease;
            padding: 0.5rem 0;
        }
        
        .nav-links a::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            transition: width 0.3s ease;
        }
        
        .nav-links a:hover {
            color: var(--primary);
        }
        
        .nav-links a:hover::after {
            width: 100%;
        }
        
        /* Dark Mode Toggle */
        .theme-toggle {
            width: 50px;
            height: 26px;
            background: var(--card-bg);
            border-radius: 13px;
            position: relative;
            cursor: pointer;
            border: 1px solid var(--border);
            transition: all 0.3s ease;
        }
        
        .theme-toggle::before {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: var(--primary);
            top: 2px;
            left: 2px;
            transition: transform 0.3s ease;
        }
        
        .theme-toggle.active::before {
            transform: translateX(24px);
        }
        
        /* Hero Section with Advanced Animations */
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 120px 20px 80px;
            position: relative;
            overflow: hidden;
        }
        
        .hero::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(var(--primary-rgb), 0.1) 0%, transparent 70%);
            animation: rotate 20s linear infinite;
        }
        
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .hero-content {
            position: relative;
            z-index: 1;
            animation: fadeInUp 1s ease-out;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .hero h1 {
            font-size: clamp(3rem, 8vw, 5.5rem);
            font-weight: 900;
            margin-bottom: 1.5rem;
            line-height: 1.1;
            background: linear-gradient(135deg, var(--primary), var(--secondary), var(--accent));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradientShift 3s ease infinite;
            background-size: 200% 200%;
        }
        
        @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        
        .hero p {
            font-size: clamp(1.1rem, 2vw, 1.4rem);
            max-width: 700px;
            margin: 0 auto 2.5rem;
            color: ${isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
            line-height: 1.8;
        }
        
        .cta-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .cta-button {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem 2.5rem;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(var(--primary-rgb), 0.3);
        }
        
        .cta-button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
        }
        
        .cta-button:hover::before {
            width: 300px;
            height: 300px;
        }
        
        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(var(--primary-rgb), 0.4);
        }
        
        .cta-button.secondary {
            background: transparent;
            border: 2px solid var(--primary);
            color: var(--primary);
            box-shadow: none;
        }
        
        .cta-button.secondary:hover {
            background: var(--primary);
            color: white;
        }
        
        /* Sections with Scroll Animations */
        section {
            padding: 100px 20px;
            position: relative;
        }
        
        .section-title {
            text-align: center;
            font-size: clamp(2.5rem, 5vw, 3.5rem);
            font-weight: 800;
            margin-bottom: 1rem;
            color: var(--text);
            position: relative;
            display: inline-block;
            width: 100%;
        }
        
        .section-title::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 4px;
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            border-radius: 2px;
        }
        
        .section-subtitle {
            text-align: center;
            font-size: 1.2rem;
            color: ${isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'};
            max-width: 600px;
            margin: 2rem auto 4rem;
        }
        
        /* Advanced Feature Cards with Glassmorphism */
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2rem;
            margin-top: 4rem;
        }
        
        .feature-card {
            background: var(--card-bg);
            backdrop-filter: blur(10px);
            padding: 2.5rem;
            border-radius: 20px;
            border: 1px solid var(--border);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
            overflow: hidden;
        }
        
        .feature-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.1), rgba(var(--secondary-rgb), 0.1));
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .feature-card:hover::before {
            opacity: 1;
        }
        
        .feature-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 20px 60px rgba(var(--primary-rgb), 0.2);
            border-color: var(--primary);
        }
        
        .feature-icon {
            width: 70px;
            height: 70px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            border-radius: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            margin-bottom: 1.5rem;
            box-shadow: 0 10px 30px rgba(var(--primary-rgb), 0.3);
            transition: transform 0.3s ease;
        }
        
        .feature-card:hover .feature-icon {
            transform: rotate(5deg) scale(1.1);
        }
        
        .feature-card h3 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--text);
        }
        
        .feature-card p {
            color: ${isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
            line-height: 1.7;
        }
        
        /* Statistics Section */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .stat-card {
            text-align: center;
            padding: 2rem;
            background: var(--card-bg);
            border-radius: 20px;
            border: 1px solid var(--border);
            transition: all 0.3s ease;
        }
        
        .stat-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(var(--primary-rgb), 0.15);
        }
        
        .stat-number {
            font-size: 3.5rem;
            font-weight: 900;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 0.5rem;
        }
        
        .stat-label {
            font-size: 1.1rem;
            color: ${isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
            font-weight: 500;
        }
        
        /* Testimonials Carousel */
        .testimonials-container {
            position: relative;
            max-width: 900px;
            margin: 3rem auto 0;
            overflow: hidden;
        }
        
        .testimonials-slider {
            display: flex;
            transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .testimonial-card {
            min-width: 100%;
            padding: 2.5rem;
            background: var(--card-bg);
            border-radius: 20px;
            border: 1px solid var(--border);
            text-align: center;
        }
        
        .testimonial-text {
            font-size: 1.2rem;
            font-style: italic;
            color: var(--text);
            margin-bottom: 1.5rem;
            line-height: 1.8;
        }
        
        .testimonial-author {
            font-weight: 600;
            color: var(--primary);
        }
        
        .testimonial-role {
            color: ${isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'};
            font-size: 0.9rem;
        }
        
        .carousel-controls {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .carousel-btn {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 2px solid var(--primary);
            background: transparent;
            color: var(--primary);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            font-size: 1.2rem;
        }
        
        .carousel-btn:hover {
            background: var(--primary);
            color: white;
            transform: scale(1.1);
        }
        
        /* Gallery with Lightbox */
        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            margin-top: 3rem;
        }
        
        .gallery-item {
            position: relative;
            border-radius: 15px;
            overflow: hidden;
            cursor: pointer;
            aspect-ratio: 4/3;
            background: var(--card-bg);
        }
        
        .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }
        
        .gallery-item:hover img {
            transform: scale(1.1);
        }
        
        .gallery-item::after {
            content: '🔍';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            font-size: 2rem;
            transition: transform 0.3s ease;
            opacity: 0;
        }
        
        .gallery-item:hover::after {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        
        /* Lightbox */
        .lightbox {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 2000;
            align-items: center;
            justify-content: center;
        }
        
        .lightbox.active {
            display: flex;
        }
        
        .lightbox-content {
            max-width: 90%;
            max-height: 90%;
            position: relative;
        }
        
        .lightbox-close {
            position: absolute;
            top: -50px;
            right: 0;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            background: none;
            border: none;
        }
        
        /* Advanced Contact Form */
        .contact-form {
            max-width: 700px;
            margin: 3rem auto 0;
            background: var(--card-bg);
            padding: 3rem;
            border-radius: 20px;
            border: 1px solid var(--border);
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: var(--text);
        }
        
        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 1rem;
            border-radius: 10px;
            border: 2px solid var(--border);
            background: ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'};
            color: var(--text);
            font-family: inherit;
            font-size: 1rem;
            transition: all 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
        }
        
        .form-group textarea {
            resize: vertical;
            min-height: 120px;
        }
        
        /* Footer */
        footer {
            background: ${isDark ? 'rgba(10, 10, 10, 0.9)' : 'rgba(0, 0, 0, 0.02)'};
            padding: 4rem 20px 2rem;
            border-top: 1px solid var(--border);
            margin-top: 100px;
        }
        
        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 3rem;
            margin-bottom: 2rem;
        }
        
        .footer-section h3 {
            margin-bottom: 1rem;
            color: var(--text);
        }
        
        .footer-section p,
        .footer-section a {
            color: ${isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
            text-decoration: none;
            transition: color 0.3s ease;
        }
        
        .footer-section a:hover {
            color: var(--primary);
        }
        
        .footer-bottom {
            text-align: center;
            padding-top: 2rem;
            border-top: 1px solid var(--border);
            color: ${isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'};
        }
        
        /* Scroll Animations */
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }
            
            .hero h1 {
                font-size: 2.5rem;
            }
            
            .features-grid,
            .stats-grid {
                grid-template-columns: 1fr;
            }
            
            .cta-buttons {
                flex-direction: column;
            }
            
            .cta-button {
                width: 100%;
            }
        }
        
        /* Loading Animation */
        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <header id="header">
        <nav class="container">
            <div class="logo">${businessName || 'Mon Site'}</div>
            <ul class="nav-links">
                <li><a href="#accueil">Accueil</a></li>
                ${features.includes('services') ? '<li><a href="#services">Services</a></li>' : ''}
                ${features.includes('about') ? '<li><a href="#about">À propos</a></li>' : ''}
                ${features.includes('gallery') ? '<li><a href="#gallery">Galerie</a></li>' : ''}
                ${features.includes('contact') ? '<li><a href="#contact">Contact</a></li>' : ''}
            </ul>
            <div class="theme-toggle" id="themeToggle"></div>
        </nav>
    </header>
    
    <section class="hero" id="accueil">
        <div class="hero-content">
            <h1>${businessName || 'Bienvenue'}</h1>
            <p>${description || 'Votre site web professionnel créé avec l\'intelligence artificielle'}</p>
            <div class="cta-buttons">
                <a href="#contact" class="cta-button">Commencer maintenant</a>
                <a href="#services" class="cta-button secondary">En savoir plus</a>
            </div>
        </div>
    </section>
    
    ${features.includes('services') ? `
    <section id="services" class="fade-in">
        <div class="container">
            <h2 class="section-title">Nos Services</h2>
            <p class="section-subtitle">Des solutions innovantes pour répondre à tous vos besoins</p>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">🚀</div>
                    <h3>Service Premium</h3>
                    <p>Des solutions sur mesure conçues pour répondre parfaitement à vos besoins spécifiques et vous offrir une expérience exceptionnelle.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">✨</div>
                    <h3>Qualité Garantie</h3>
                    <p>Nous nous engageons à vous offrir le meilleur service possible avec une attention particulière aux détails et à l'excellence.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">💡</div>
                    <h3>Innovation</h3>
                    <p>Restez à la pointe de la technologie avec nos solutions innovantes qui s'adaptent aux dernières tendances du marché.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🎯</div>
                    <h3>Résultats Mesurables</h3>
                    <p>Suivez vos performances en temps réel avec nos outils d'analyse avancés et des rapports détaillés.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🤝</div>
                    <h3>Support Dédié</h3>
                    <p>Une équipe à votre écoute 24/7 pour vous accompagner et répondre à toutes vos questions rapidement.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">⚡</div>
                    <h3>Performance Optimale</h3>
                    <p>Des solutions optimisées pour des performances maximales et une expérience utilisateur fluide.</p>
                </div>
            </div>
        </div>
    </section>
    ` : ''}
    
    ${features.includes('about') ? `
    <section id="about" class="fade-in">
        <div class="container">
            <h2 class="section-title">À Propos</h2>
            <p class="section-subtitle">Découvrez notre histoire et notre mission</p>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-number" data-target="500">0</div>
                    <div class="stat-label">Projets Réalisés</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" data-target="98">0</div>
                    <div class="stat-label">Clients Satisfaits (%)</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" data-target="10">0</div>
                    <div class="stat-label">Années d'Expérience</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" data-target="24">0</div>
                    <div class="stat-label">Support 24/7</div>
                </div>
            </div>
        </div>
    </section>
    ` : ''}
    
    ${features.includes('testimonials') ? `
    <section id="testimonials" class="fade-in">
        <div class="container">
            <h2 class="section-title">Témoignages</h2>
            <p class="section-subtitle">Ce que nos clients disent de nous</p>
            <div class="testimonials-container">
                <div class="testimonials-slider" id="testimonialsSlider">
                    <div class="testimonial-card">
                        <p class="testimonial-text">"Un service exceptionnel ! L'équipe a su comprendre nos besoins et nous proposer des solutions parfaitement adaptées. Je recommande vivement !"</p>
                        <div class="testimonial-author">Marie Dupont</div>
                        <div class="testimonial-role">Directrice Marketing</div>
                    </div>
                    <div class="testimonial-card">
                        <p class="testimonial-text">"Professionnalisme et expertise au rendez-vous. Nous avons vu une amélioration significative de nos résultats depuis notre collaboration."</p>
                        <div class="testimonial-author">Jean Martin</div>
                        <div class="testimonial-role">CEO, TechCorp</div>
                    </div>
                    <div class="testimonial-card">
                        <p class="testimonial-text">"Une expérience client remarquable. L'équipe est réactive, à l'écoute et toujours prête à aller plus loin pour satisfaire nos attentes."</p>
                        <div class="testimonial-author">Sophie Bernard</div>
                        <div class="testimonial-role">Fondatrice, StartupX</div>
                    </div>
                </div>
                <div class="carousel-controls">
                    <button class="carousel-btn" onclick="prevTestimonial()">‹</button>
                    <button class="carousel-btn" onclick="nextTestimonial()">›</button>
                </div>
            </div>
        </div>
    </section>
    ` : ''}
    
    ${features.includes('gallery') ? `
    <section id="gallery" class="fade-in">
        <div class="container">
            <h2 class="section-title">Galerie</h2>
            <p class="section-subtitle">Découvrez nos réalisations</p>
            <div class="gallery-grid">
                <div class="gallery-item" onclick="openLightbox('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800')">
                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400" alt="Projet 1" loading="lazy">
                </div>
                <div class="gallery-item" onclick="openLightbox('https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800')">
                    <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400" alt="Projet 2" loading="lazy">
                </div>
                <div class="gallery-item" onclick="openLightbox('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800')">
                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400" alt="Projet 3" loading="lazy">
                </div>
                <div class="gallery-item" onclick="openLightbox('https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800')">
                    <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400" alt="Projet 4" loading="lazy">
                </div>
                <div class="gallery-item" onclick="openLightbox('https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800')">
                    <img src="https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=400" alt="Projet 5" loading="lazy">
                </div>
                <div class="gallery-item" onclick="openLightbox('https://images.unsplash.com/photo-1551434678-e076c223a692?w=800')">
                    <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400" alt="Projet 6" loading="lazy">
                </div>
            </div>
        </div>
    </section>
    
    <div class="lightbox" id="lightbox" onclick="closeLightbox()">
        <div class="lightbox-content">
            <button class="lightbox-close" onclick="closeLightbox()">×</button>
            <img id="lightboxImg" src="" alt="" style="max-width: 100%; max-height: 90vh; border-radius: 10px;">
        </div>
    </div>
    ` : ''}
    
    ${features.includes('contact') ? `
    <section id="contact" class="fade-in">
        <div class="container">
            <h2 class="section-title">Contactez-nous</h2>
            <p class="section-subtitle">Nous sommes là pour répondre à toutes vos questions</p>
            <form class="contact-form" id="contactForm" onsubmit="handleSubmit(event)">
                <div class="form-group">
                    <label for="name">Nom complet *</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="phone">Téléphone</label>
                    <input type="tel" id="phone" name="phone">
                </div>
                <div class="form-group">
                    <label for="message">Message *</label>
                    <textarea id="message" name="message" required></textarea>
                </div>
                <button type="submit" class="cta-button" style="width: 100%; margin-top: 1rem;">
                    <span id="submitText">Envoyer le message</span>
                    <span id="submitLoader" class="loading" style="display: none;"></span>
                </button>
            </form>
        </div>
    </section>
    ` : ''}
    
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>${businessName || 'Mon Site'}</h3>
                    <p>${description.substring(0, 100)}...</p>
                </div>
                <div class="footer-section">
                    <h3>Liens Rapides</h3>
                    <p><a href="#accueil">Accueil</a></p>
                    ${features.includes('services') ? '<p><a href="#services">Services</a></p>' : ''}
                    ${features.includes('about') ? '<p><a href="#about">À propos</a></p>' : ''}
                    ${features.includes('contact') ? '<p><a href="#contact">Contact</a></p>' : ''}
                </div>
                <div class="footer-section">
                    <h3>Contact</h3>
                    <p>Email: contact@example.com</p>
                    <p>Téléphone: +33 1 23 45 67 89</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; ${new Date().getFullYear()} ${businessName || 'Mon Site'}. Tous droits réservés.</p>
            </div>
        </div>
    </footer>
    
    <script>
        // Header scroll effect
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
        
        // Animated statistics
        ${features.includes('about') ? `
        function animateStats() {
            document.querySelectorAll('.stat-number').forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateStat = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.floor(current);
                        requestAnimationFrame(updateStat);
                    } else {
                        stat.textContent = target + (stat.getAttribute('data-target').includes('%') ? '%' : '+');
                    }
                };
                
                const statObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            updateStat();
                            statObserver.unobserve(entry.target);
                        }
                    });
                });
                
                statObserver.observe(stat);
            });
        }
        animateStats();
        ` : ''}
        
        // Testimonials carousel
        ${features.includes('testimonials') ? `
        let currentTestimonial = 0;
        const testimonials = document.querySelectorAll('.testimonial-card');
        const totalTestimonials = testimonials.length;
        
        function showTestimonial(index) {
            const slider = document.getElementById('testimonialsSlider');
            slider.style.transform = \`translateX(-\${index * 100}%)\`;
        }
        
        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
            showTestimonial(currentTestimonial);
        }
        
        function prevTestimonial() {
            currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
            showTestimonial(currentTestimonial);
        }
        
        // Auto-play testimonials
        setInterval(nextTestimonial, 5000);
        ` : ''}
        
        // Gallery lightbox
        ${features.includes('gallery') ? `
        function openLightbox(imgSrc) {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightboxImg');
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeLightbox() {
            const lightbox = document.getElementById('lightbox');
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });
        ` : ''}
        
        // Form submission
        ${features.includes('contact') ? `
        function handleSubmit(e) {
            e.preventDefault();
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const submitText = document.getElementById('submitText');
            const submitLoader = document.getElementById('submitLoader');
            
            submitText.style.display = 'none';
            submitLoader.style.display = 'inline-block';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
                e.target.reset();
                submitText.style.display = 'inline';
                submitLoader.style.display = 'none';
                submitBtn.disabled = false;
            }, 1500);
        }
        ` : ''}
        
        // Theme toggle (dark mode simulation)
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                themeToggle.classList.toggle('active');
                // Note: Full dark mode implementation would require CSS variable updates
            });
        }
    </script>
</body>
</html>`

  return html
}

export async function POST(request: NextRequest) {
  try {
    const body: SiteRequest = await request.json()
    
    // Validation
    if (!body.type || !body.style || !body.description) {
      return NextResponse.json(
        { error: 'Champs requis manquants' },
        { status: 400 }
      )
    }
    
    // Génération du code
    const code = generateSiteCode(body)
    
    return NextResponse.json({ 
      code,
      success: true 
    })
  } catch (error) {
    console.error('IA Site API error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la génération du site' },
      { status: 500 }
    )
  }
}
