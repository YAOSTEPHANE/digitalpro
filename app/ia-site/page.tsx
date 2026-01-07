"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Palette, 
  Layout, 
  Code, 
  Download, 
  Copy, 
  CheckCircle2,
  Wand2,
  Zap,
  FileCode,
  Loader2,
  Monitor,
  LayoutTemplate
} from "lucide-react";
import ModernNavbar from "@/components/modern-navbar";
import { Spotlight } from "@/components/ui/spotlight";
import StarsBackground from "@/components/stars-background";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const SITE_TYPES = [
  "Site vitrine",
  "Site e-commerce",
  "Blog",
  "Portfolio",
  "Site d'entreprise",
  "Landing page"
];

const STYLES = [
  { value: "moderne", label: "Moderne" },
  { value: "minimaliste", label: "Minimaliste" },
  { value: "sombre", label: "Sombre" },
  { value: "dégradé", label: "Avec dégradés" },
  { value: "classique", label: "Classique" }
];

const FEATURES = [
  { id: "services", label: "Section Services" },
  { id: "contact", label: "Formulaire de contact" },
  { id: "about", label: "Section À propos" },
  { id: "testimonials", label: "Témoignages" },
  { id: "gallery", label: "Galerie d'images" },
  { id: "blog", label: "Section Blog" }
];

const COLOR_PRESETS = [
  ["#ef4444", "#3b82f6", "#fbbf24"], // Rouge, Bleu, Jaune
  ["#8b5cf6", "#ec4899", "#06b6d4"], // Violet, Rose, Cyan
  ["#10b981", "#3b82f6", "#f59e0b"], // Vert, Bleu, Orange
  ["#6366f1", "#ec4899", "#14b8a6"], // Indigo, Rose, Teal
  ["#f97316", "#eab308", "#22c55e"], // Orange, Jaune, Vert
];

// Templates prédéfinis
const TEMPLATES = [
  {
    id: "corporate",
    name: "Entreprise Moderne",
    description: "Site professionnel pour entreprises avec toutes les sections essentielles",
    type: "Site d'entreprise",
    style: "moderne",
    colors: ["#1e40af", "#3b82f6", "#60a5fa"],
    features: ["services", "about", "contact", "testimonials"],
    preview: "🏢"
  },
  {
    id: "portfolio",
    name: "Portfolio Créatif",
    description: "Portfolio élégant pour créatifs et freelances",
    type: "Portfolio",
    style: "minimaliste",
    colors: ["#8b5cf6", "#a78bfa", "#c4b5fd"],
    features: ["gallery", "about", "contact"],
    preview: "🎨"
  },
  {
    id: "ecommerce",
    name: "Boutique E-commerce",
    description: "Site e-commerce complet avec galerie et formulaire de contact",
    type: "Site e-commerce",
    style: "moderne",
    colors: ["#ef4444", "#f97316", "#fbbf24"],
    features: ["services", "gallery", "contact", "testimonials"],
    preview: "🛒"
  },
  {
    id: "landing",
    name: "Landing Page",
    description: "Page d'atterrissage moderne et accrocheuse",
    type: "Landing page",
    style: "dégradé",
    colors: ["#ec4899", "#8b5cf6", "#06b6d4"],
    features: ["services", "contact", "testimonials"],
    preview: "🚀"
  },
  {
    id: "blog",
    name: "Blog Moderne",
    description: "Blog élégant avec section articles et contact",
    type: "Blog",
    style: "classique",
    colors: ["#10b981", "#3b82f6", "#f59e0b"],
    features: ["blog", "about", "contact"],
    preview: "📝"
  },
  {
    id: "restaurant",
    name: "Restaurant & Café",
    description: "Site pour restaurant avec galerie et menu",
    type: "Site vitrine",
    style: "moderne",
    colors: ["#dc2626", "#ea580c", "#f59e0b"],
    features: ["services", "gallery", "contact", "testimonials"],
    preview: "🍽️"
  }
];

export default function IASitePage() {
  const [step, setStep] = useState(0); // 0 = templates, 1 = formulaire, 2 = personnalisation, 3 = résultat
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    type: "",
    style: "",
    colors: COLOR_PRESETS[0],
    features: [] as string[],
    description: "",
    businessName: "",
    businessType: ""
  });

  // Charger un template
  const loadTemplate = (template: typeof TEMPLATES[0]) => {
    setFormData({
      type: template.type,
      style: template.style,
      colors: template.colors,
      features: template.features,
      description: `Site ${template.name.toLowerCase()} avec toutes les fonctionnalités modernes`,
      businessName: "",
      businessType: ""
    });
    setStep(1);
    toast.success(`Template "${template.name}" chargé !`);
  };

  // Nettoyer l'URL blob quand le composant se démonte
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleColorChange = (index: number, color: string) => {
    const newColors = [...formData.colors];
    newColors[index] = color;
    setFormData({ ...formData, colors: newColors });
  };

  const handleFeatureToggle = (featureId: string) => {
    const features = formData.features.includes(featureId)
      ? formData.features.filter(f => f !== featureId)
      : [...formData.features, featureId];
    setFormData({ ...formData, features });
  };

  const handleGenerate = async () => {
    if (!formData.type || !formData.style || !formData.description) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/ia-site", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la génération");
      }

      const data = await response.json();
      setGeneratedCode(data.code);
      
      // Créer une URL blob pour l'aperçu
      const blob = new Blob([data.code], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      
      setStep(3);
      setViewMode("preview");
      toast.success("Site généré avec succès !");
    } catch (error) {
      toast.error("Une erreur est survenue lors de la génération");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      toast.success("Code copié dans le presse-papier !");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (generatedCode) {
      const blob = new Blob([generatedCode], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${formData.businessName || "site"}-${Date.now()}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Fichier téléchargé !");
    }
  };

  return (
    <div className="w-full min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <StarsBackground />
      <ModernNavbar
        scrollToWebsiteDesign={() => {}}
        scrollToGraphicDesign={() => {}}
        scrollToShopifyStores={() => {}}
        scrollToBrands={() => {}}
        scrollToServices={() => {}}
      />
      <Spotlight className="hidden md:flex md:-top-80 left-80" fill="white" />

      <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600/20 to-blue-600/20 border border-red-500/30 rounded-full px-6 py-2 mb-6">
            <Wand2 className="w-4 h-4 text-red-400 animate-pulse" />
            <span className="text-sm text-red-300 font-medium">
              Générateur IA
            </span>
            <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-red-200 to-blue-200">
            Créez votre site internet avec l&apos;IA
          </h1>
          
          <p className="text-lg text-white max-w-2xl mx-auto">
            Décrivez votre projet et recevez un site web complet, prêt à l&apos;emploi, 
            généré en quelques secondes par notre intelligence artificielle.
          </p>
        </motion.div>

        {/* Étapes */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            {[0, 1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step >= s
                      ? "bg-gradient-to-r from-red-600 to-blue-600 text-white"
                      : "bg-neutral-800 text-neutral-400"
                  }`}
                >
                  {s === 0 ? "🎨" : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 transition-all ${
                      step > s ? "bg-gradient-to-r from-red-600 to-blue-600" : "bg-neutral-800"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Étape 0: Templates */}
        {step === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-2">
                <LayoutTemplate className="w-8 h-8 text-red-400" />
                Choisissez un template
              </h2>
              <p className="text-white/70">Ou créez votre site à partir de zéro</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {TEMPLATES.map((template) => (
                <motion.div
                  key={template.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 cursor-pointer hover:border-red-500/50 transition-all group"
                  onClick={() => loadTemplate(template)}
                >
                  <div className="text-5xl mb-4 text-center">{template.preview}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{template.name}</h3>
                  <p className="text-white/70 text-sm mb-4">{template.description}</p>
                  <div className="flex gap-1 justify-center">
                    {template.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-6 rounded-full border border-neutral-700"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="border-neutral-700 text-white hover:bg-neutral-800"
              >
                Créer à partir de zéro
                <Wand2 className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Étape 1: Formulaire */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 md:p-10">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                <Layout className="w-6 h-6 text-red-400" />
                Informations de base
              </h2>

              <div className="space-y-6">
                <div>
                  <Label className="text-white mb-2 block">Type de site *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white [&>span]:text-white">
                      <SelectValue placeholder="Sélectionnez un type" className="text-white placeholder:text-white" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-800 border-neutral-700 text-white">
                      {SITE_TYPES.map((type) => (
                        <SelectItem key={type} value={type} className="text-white hover:bg-neutral-700 focus:bg-neutral-700">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-white mb-2 block">Style visuel *</Label>
                  <Select
                    value={formData.style}
                    onValueChange={(value) => setFormData({ ...formData, style: value })}
                  >
                    <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white [&>span]:text-white">
                      <SelectValue placeholder="Sélectionnez un style" className="text-white placeholder:text-white" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-800 border-neutral-700 text-white">
                      {STYLES.map((style) => (
                        <SelectItem key={style.value} value={style.value} className="text-white hover:bg-neutral-700 focus:bg-neutral-700">
                          {style.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-white mb-2 block">Nom de l&apos;entreprise</Label>
                  <Input
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="Ex: Digitalpro Solutions"
                    className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">Type d&apos;activité</Label>
                  <Input
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    placeholder="Ex: Agence digitale, Restaurant, Boutique..."
                    className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">Description du projet *</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Décrivez votre projet, vos besoins, votre vision..."
                    className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 min-h-[120px]"
                  />
                </div>
              </div>

              <Button
                onClick={() => setStep(2)}
                disabled={!formData.type || !formData.style || !formData.description}
                className="w-full mt-8 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white"
              >
                Continuer
                <Zap className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Étape 2: Personnalisation */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 md:p-10">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                <Palette className="w-6 h-6 text-red-400" />
                Personnalisation
              </h2>

              <div className="space-y-8">
                {/* Couleurs */}
                <div>
                  <Label className="text-white mb-4 block">Couleurs du site</Label>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {formData.colors.map((color, index) => (
                      <div key={index} className="space-y-2">
                        <Label className="text-white text-sm">
                          {index === 0 ? "Primaire" : index === 1 ? "Secondaire" : "Accent"}
                        </Label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={color}
                            onChange={(e) => handleColorChange(index, e.target.value)}
                            className="w-16 h-12 rounded-lg border border-neutral-700 cursor-pointer"
                          />
                          <Input
                            value={color}
                            onChange={(e) => handleColorChange(index, e.target.value)}
                            className="bg-neutral-800 border-neutral-700 text-white flex-1"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {COLOR_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        onClick={() => setFormData({ ...formData, colors: preset })}
                        className="flex gap-1 p-2 border border-neutral-700 rounded-lg hover:border-red-500 transition-colors"
                      >
                        {preset.map((c, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fonctionnalités */}
                <div>
                  <Label className="text-white mb-4 block">Fonctionnalités à inclure</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {FEATURES.map((feature) => (
                      <div
                        key={feature.id}
                        className="flex items-center space-x-2 p-3 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors cursor-pointer"
                        onClick={() => handleFeatureToggle(feature.id)}
                      >
                        <Checkbox
                          checked={formData.features.includes(feature.id)}
                          onCheckedChange={() => handleFeatureToggle(feature.id)}
                          className="border-neutral-600 data-[state=checked]:bg-red-600"
                        />
                        <Label className="text-white cursor-pointer">{feature.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 border-neutral-700 text-white hover:bg-neutral-800"
                >
                  Retour
                </Button>
                <Button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Génération en cours...
                    </>
                  ) : (
                    <>
                      Générer le site
                      <Sparkles className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Étape 3: Résultat */}
        {step === 3 && generatedCode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 md:p-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                  <FileCode className="w-6 h-6 text-red-400" />
                  Votre site est prêt !
                </h2>
                <div className="flex gap-2">
                  <Button
                    onClick={handleCopy}
                    variant="outline"
                    className="border-neutral-700 text-white hover:bg-neutral-800"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Copié !
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copier
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleDownload}
                    className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger
                  </Button>
                </div>
              </div>

              {/* Onglets Aperçu/Code */}
              <div className="flex gap-2 mb-4 border-b border-neutral-800">
                <button
                  onClick={() => setViewMode("preview")}
                  className={`px-4 py-2 font-medium transition-colors flex items-center gap-2 ${
                    viewMode === "preview"
                      ? "text-white border-b-2 border-red-500"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  Aperçu
                </button>
                <button
                  onClick={() => setViewMode("code")}
                  className={`px-4 py-2 font-medium transition-colors flex items-center gap-2 ${
                    viewMode === "code"
                      ? "text-white border-b-2 border-red-500"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <Code className="w-4 h-4" />
                  Code
                </button>
              </div>

              {/* Aperçu */}
              {viewMode === "preview" && previewUrl && (
                <div className="bg-neutral-950 rounded-lg overflow-hidden border border-neutral-800">
                  <div className="bg-neutral-900 px-4 py-2 flex items-center justify-between border-b border-neutral-800">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-xs text-neutral-400">Aperçu en direct</span>
                  </div>
                  <iframe
                    src={previewUrl}
                    className="w-full h-[600px] border-0"
                    title="Aperçu du site"
                    sandbox="allow-same-origin allow-scripts"
                  />
                </div>
              )}

              {/* Code */}
              {viewMode === "code" && (
                <div className="bg-neutral-950 rounded-lg p-4 overflow-auto max-h-[600px] border border-neutral-800">
                  <pre className="text-sm text-white whitespace-pre-wrap">
                    <code>{generatedCode}</code>
                  </pre>
                </div>
              )}

              <div className="mt-6 p-4 bg-blue-600/10 border border-blue-500/20 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-400">💡 Astuce :</strong> Copiez le code dans un fichier .html 
                  et ouvrez-le dans votre navigateur pour voir le résultat. Vous pouvez ensuite l&apos;héberger 
                  sur n&apos;importe quel service d&apos;hébergement web.
                </p>
              </div>

              <Button
                onClick={() => {
                  setStep(0);
                  setGeneratedCode(null);
                  setPreviewUrl(null);
                  if (previewUrl) {
                    URL.revokeObjectURL(previewUrl);
                  }
                  setFormData({
                    type: "",
                    style: "",
                    colors: COLOR_PRESETS[0],
                    features: [],
                    description: "",
                    businessName: "",
                    businessType: ""
                  });
                }}
                className="w-full mt-6 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white"
              >
                Créer un nouveau site
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

