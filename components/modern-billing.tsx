"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  CreditCard,
  FileText,
  Plus,
  Trash2,
  Calculator,
  Calendar,
  User,
  Download,
  Search,
  Sparkles,
  Check,
  Receipt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import LuxSectionHeader from "@/components/lux-section-header";
import LuxReveal from "@/components/lux-reveal";
import { useCookieConsent } from "@/components/cookie-consent-provider";
import { escapeHtml } from "@/lib/security";

const luxFieldClass =
  "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400";

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  clientAddress?: string;
  items: InvoiceItem[];
  subtotal: number;
  tax?: number;
  discount?: number;
  total: number;
  dueDate?: string;
  notes?: string;
  createdAt: string;
  status: "paid" | "pending" | "overdue";
}

const PRESET_ITEMS = [
  { label: "+ Site Vitrine", description: "Création Site Vitrine Sur Mesure", unitPrice: 200000 },
  { label: "+ Pack Premium", description: "Site Next.js / React + SEO", unitPrice: 500000 },
  { label: "+ E-commerce", description: "Boutique en ligne + Paiements", unitPrice: 650000 },
  { label: "+ Maintenance", description: "Forfait Maintenance & Sécurité", unitPrice: 75000 },
];

const ModernBilling = () => {
  const [activeTab, setActiveTab] = useState<"pricing" | "invoice" | "history">("pricing");
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    { description: "", quantity: 1, unitPrice: 0, total: 0 },
  ]);
  const [clientInfo, setClientInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [invoiceSettings, setInvoiceSettings] = useState({
    tax: 0,
    discount: 0,
    dueDate: "",
    notes: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "paid" | "pending" | "overdue">("all");
  const { hasConsent } = useCookieConsent();
  const allowPreferences = hasConsent("preferences");

  useEffect(() => {
    if (!allowPreferences) return;
    const savedInvoices = localStorage.getItem("invoices");
    if (savedInvoices) {
      try {
        const parsed = JSON.parse(savedInvoices);
        setInvoices(parsed);
      } catch (error) {
        console.error("Erreur lors du chargement des factures:", error);
      }
    }
  }, [allowPreferences]);

  const persistInvoices = (updated: Invoice[]) => {
    setInvoices(updated);
    if (allowPreferences) {
      localStorage.setItem("invoices", JSON.stringify(updated));
    }
  };

  const toggleInvoiceStatus = (id: string) => {
    const updated = invoices.map((inv) =>
      inv.id === id
        ? { ...inv, status: inv.status === "paid" ? ("pending" as const) : ("paid" as const) }
        : inv
    );
    persistInvoices(updated);
    toast.success("Statut de la facture mis à jour");
  };

  const deleteInvoice = (id: string) => {
    const updatedInvoices = invoices.filter((inv) => inv.id !== id);
    persistInvoices(updatedInvoices);
    toast.success("Facture supprimée");
  };

  const downloadInvoice = (invoice: Invoice) => {
    const html = generateInvoiceHTML(invoice);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `facture-${invoice.invoiceNumber}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Facture téléchargée");
  };

  const generateInvoiceHTML = (invoice: Invoice): string => {
    const subtotal = invoice.subtotal;
    const taxAmount = invoice.tax ? (subtotal * invoice.tax) / 100 : 0;
    const discountAmount = invoice.discount ? (subtotal * invoice.discount) / 100 : 0;
    const total = invoice.total;

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 800px; margin: 0 auto; padding: 32px; }
    .header { border-bottom: 3px solid #516699; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: flex-start; }
    .logo { font-size: 24px; font-weight: bold; color: #516699; }
    .invoice-info { display: flex; justify-content: space-between; margin-bottom: 30px; gap: 24px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
    th { background-color: #f3f4f6; font-weight: bold; }
    .totals { margin-top: 20px; text-align: right; }
    .total-row { display: flex; justify-content: flex-end; margin-bottom: 8px; }
    .total-label { width: 160px; text-align: right; margin-right: 20px; }
    .total-value { width: 160px; text-align: right; font-weight: bold; }
    .grand-total { font-size: 20px; color: #516699; border-top: 2px solid #516699; padding-top: 10px; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="logo">digitalpro solutions</div>
      <p style="margin:4px 0 0;color:#6b7280;">Agence d'intelligence numérique</p>
    </div>
    <div style="text-align:right;">
      <h1 style="margin:0;">FACTURE</h1>
      <p style="margin:4px 0;"><strong>N° :</strong> ${escapeHtml(invoice.invoiceNumber)}</p>
      <p style="margin:4px 0;"><strong>Date :</strong> ${new Date(invoice.createdAt).toLocaleDateString("fr-FR")}</p>
      ${invoice.dueDate ? `<p style="margin:4px 0;"><strong>Échéance :</strong> ${new Date(invoice.dueDate).toLocaleDateString("fr-FR")}</p>` : ""}
    </div>
  </div>
  <div class="invoice-info">
    <div>
      <h3>Facturé à :</h3>
      <p><strong>${escapeHtml(invoice.clientName)}</strong></p>
      ${invoice.clientEmail ? `<p>${escapeHtml(invoice.clientEmail)}</p>` : ""}
      ${invoice.clientPhone ? `<p>${escapeHtml(invoice.clientPhone)}</p>` : ""}
      ${invoice.clientAddress ? `<p>${escapeHtml(invoice.clientAddress)}</p>` : ""}
    </div>
    <div style="text-align:right;">
      <h3>digitalpro solutions</h3>
      <p>Bvd Koffi Gadaud, Cocody</p>
      <p>Abidjan, Côte d'Ivoire</p>
      <p>digitalprosolutions27@gmail.com</p>
      <p>+225 07 48 97 60 31</p>
    </div>
  </div>
  <table>
    <thead>
      <tr><th>Description</th><th>Quantité</th><th>Prix unitaire</th><th>Total</th></tr>
    </thead>
    <tbody>
      ${invoice.items
        .map(
          (item) => `<tr>
            <td>${escapeHtml(item.description)}</td>
            <td>${item.quantity}</td>
            <td>${item.unitPrice.toLocaleString("fr-FR")} FCFA</td>
            <td>${item.total.toLocaleString("fr-FR")} FCFA</td>
          </tr>`
        )
        .join("")}
    </tbody>
  </table>
  <div class="totals">
    <div class="total-row"><span class="total-label">Sous-total :</span><span class="total-value">${subtotal.toLocaleString("fr-FR")} FCFA</span></div>
    ${invoice.tax ? `<div class="total-row"><span class="total-label">TVA (${invoice.tax}%) :</span><span class="total-value">${taxAmount.toLocaleString("fr-FR")} FCFA</span></div>` : ""}
    ${invoice.discount ? `<div class="total-row"><span class="total-label">Remise (${invoice.discount}%) :</span><span class="total-value">-${discountAmount.toLocaleString("fr-FR")} FCFA</span></div>` : ""}
    <div class="total-row grand-total"><span class="total-label">TOTAL :</span><span class="total-value">${total.toLocaleString("fr-FR")} FCFA</span></div>
  </div>
  ${invoice.notes ? `<div style="margin-top:30px;"><h3>Notes :</h3><p>${escapeHtml(invoice.notes).replace(/\n/g, "<br/>")}</p></div>` : ""}
</body>
</html>`;
  };

  const plans = [
    {
      index: 0,
      name: "Basic",
      tag: "Essentiel",
      price: "200.000 FCFA",
      priceValue: 200000,
      features: [
        "Entièrement réactif sur tous les écrans",
        "Conception + Développement",
        "Canal de communication privé",
        "Délai d'exécution de 1 à 3 jours",
      ],
      description:
        "Modules autonomes adaptés à vos besoins et facilement intégrables. Parfaits pour lancer votre présence rapidement.",
      button: "Choisir Basic",
      popular: false,
    },
    {
      index: 1,
      name: "Premium",
      tag: "Le plus choisi",
      price: "500.000 FCFA",
      priceValue: 500000,
      features: [
        "Entièrement réactif sur tous les écrans",
        "Code React / Next.js / Tailwind CSS",
        "Conception + développement + SEO de base",
        "Délai de réponse du support sous 24 heures",
        "Canal de communication privé",
        "Délai d'exécution de 3 à 5 jours",
      ],
      description:
        "Idéal pour les PME, startups et marques qui veulent un site élégant, rapide et structuré pour convertir.",
      button: "Choisir Premium",
      popular: true,
    },
    {
      index: 2,
      name: "Enterprise",
      tag: "Sur mesure",
      price: "Sur devis",
      features: [
        "Entièrement réactif sur tous les écrans",
        "Architecture React / Next.js / API dédiées",
        "Conception + développement complet",
        "Révisions illimitées durant le sprint",
        "Support prioritaire sous 24 heures",
        "File d'attente de développement dédiée",
        "Chef de projet attitré",
      ],
      description:
        "Conçu pour les organisations ambitieuses nécessitant intégrations métier, paiements ou applications SaaS.",
      button: "Configurer sur mesure",
      popular: false,
    },
  ];

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...invoiceItems];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    };
    newItems[index].total = newItems[index].quantity * newItems[index].unitPrice;
    setInvoiceItems(newItems);
  };

  const addItem = (preset?: { description: string; unitPrice: number }) => {
    if (
      preset &&
      invoiceItems.length === 1 &&
      !invoiceItems[0].description &&
      invoiceItems[0].unitPrice === 0
    ) {
      setInvoiceItems([
        {
          description: preset.description,
          quantity: 1,
          unitPrice: preset.unitPrice,
          total: preset.unitPrice,
        },
      ]);
      return;
    }
    setInvoiceItems([
      ...invoiceItems,
      {
        description: preset?.description ?? "",
        quantity: 1,
        unitPrice: preset?.unitPrice ?? 0,
        total: preset?.unitPrice ?? 0,
      },
    ]);
  };

  const removeItem = (index: number) => {
    setInvoiceItems(invoiceItems.filter((_, i) => i !== index));
  };

  const calculateTotals = () => {
    const subtotal = invoiceItems.reduce((sum, item) => sum + item.total, 0);
    const taxAmount = invoiceSettings.tax ? (subtotal * invoiceSettings.tax) / 100 : 0;
    const discountAmount = invoiceSettings.discount
      ? (subtotal * invoiceSettings.discount) / 100
      : 0;
    const total = Math.max(0, subtotal + taxAmount - discountAmount);
    return { subtotal, taxAmount, discountAmount, total };
  };

  const generateInvoice = async () => {
    if (!clientInfo.name || !clientInfo.email) {
      toast.error("Veuillez remplir le nom et l'email du client");
      return;
    }

    if (invoiceItems.some((item) => !item.description || item.total === 0)) {
      toast.error("Veuillez renseigner tous les articles avec un montant");
      return;
    }

    setIsGenerating(true);
    const { subtotal, total } = calculateTotals();

    try {
      const response = await fetch("/api/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceNumber: `INV-${Date.now()}`,
          clientName: clientInfo.name,
          clientEmail: clientInfo.email,
          clientPhone: clientInfo.phone || undefined,
          clientAddress: clientInfo.address || undefined,
          items: invoiceItems,
          subtotal,
          tax: invoiceSettings.tax || undefined,
          discount: invoiceSettings.discount || undefined,
          total,
          dueDate: invoiceSettings.dueDate || undefined,
          notes: invoiceSettings.notes || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const newInvoice: Invoice = {
          id: `inv-${Date.now()}`,
          invoiceNumber: data.invoiceNumber || `INV-${Date.now()}`,
          clientName: clientInfo.name,
          clientEmail: clientInfo.email,
          clientPhone: clientInfo.phone || undefined,
          clientAddress: clientInfo.address || undefined,
          items: invoiceItems,
          subtotal,
          tax: invoiceSettings.tax || undefined,
          discount: invoiceSettings.discount || undefined,
          total,
          dueDate: invoiceSettings.dueDate || undefined,
          notes: invoiceSettings.notes || undefined,
          createdAt: new Date().toISOString(),
          status: "pending",
        };

        persistInvoices([newInvoice, ...invoices]);
        toast.success("Facture générée et enregistrée !");
        setInvoiceItems([{ description: "", quantity: 1, unitPrice: 0, total: 0 }]);
        setClientInfo({ name: "", email: "", phone: "", address: "" });
        setInvoiceSettings({ tax: 0, discount: 0, dueDate: "", notes: "" });
        setActiveTab("history");
      } else {
        toast.error(data.error || "Erreur lors de la génération de la facture");
      }
    } catch {
      toast.error("Erreur lors de la génération de la facture");
    } finally {
      setIsGenerating(false);
    }
  };

  const { subtotal, taxAmount, discountAmount, total } = calculateTotals();

  const historySummary = useMemo(() => {
    const totalBilled = invoices.reduce((sum, inv) => sum + inv.total, 0);
    const paidCount = invoices.filter((inv) => inv.status === "paid").length;
    const pendingCount = invoices.filter((inv) => inv.status !== "paid").length;
    return { totalBilled, paidCount, pendingCount };
  }, [invoices]);

  return (
    <div className="relative w-full py-2 md:py-4 overflow-hidden">
      <div className="lux-section-premium lux-section-spotlight relative z-10 max-w-7xl mx-auto">
        <LuxSectionHeader
          indexLabel="01"
          label="Tarifs & Facturation"
          title="Des offres transparentes et un studio de facturation intégré"
          description="Comparez nos formules ou générez instantanément une facture proforma personnalisée."
          align="center"
        />

        <div className="flex justify-center mb-10 gap-2.5 flex-wrap">
          {[
            { id: "pricing", label: "Nos Tarifs", icon: CreditCard },
            { id: "invoice", label: "Studio Facture", icon: FileText },
            { id: "history", label: `Historique (${invoices.length})`, icon: Calendar },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as "pricing" | "invoice" | "history")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "lux-chip-active"
                  : "lux-chip hover:border-[var(--brand-blue)]"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1 : TARIFS */}
        {activeTab === "pricing" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-10"
          >
            <div className="grid md:grid-cols-3 gap-6 items-stretch">
              {plans.map((plan, index) => (
                <LuxReveal key={plan.name} delay={index * 0.08} className="h-full flex">
                  <div
                    className={`relative w-full h-full flex flex-col p-6 md:p-8 ${
                      plan.popular ? "lux-card-featured" : "lux-card-interactive"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="lux-chip !text-[10px] uppercase tracking-wider">
                        {plan.tag}
                      </span>
                      {plan.popular ? (
                        <span className="inline-flex items-center gap-1 rounded-full brand-bg-red px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">
                          <Sparkles className="w-3 h-3" />
                          Recommandé
                        </span>
                      ) : null}
                    </div>

                    <h3 className="lux-heading text-3xl font-bold mb-2">{plan.name}</h3>
                    <div className="font-display text-3xl font-bold text-[var(--brand-blue)] tabular-nums mb-3">
                      {plan.price}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">{plan.description}</p>

                    <ul className="space-y-3 mb-8 flex-grow">
                      {plan.features.map((feature) => (
                        <li key={feature} className="text-sm flex items-start gap-2.5 text-slate-700">
                          <CheckCircle2
                            className={`w-4 h-4 mt-0.5 shrink-0 ${
                              plan.popular ? "text-[var(--brand-red)]" : "text-[var(--brand-blue)]"
                            }`}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => {
                        setActiveTab("invoice");
                        if (plan.priceValue) {
                          setInvoiceItems([
                            {
                              description: `Pack ${plan.name} — Digitalpro Solutions`,
                              quantity: 1,
                              unitPrice: plan.priceValue,
                              total: plan.priceValue,
                            },
                          ]);
                        }
                      }}
                      className={`w-full !py-5 rounded-full font-semibold ${
                        plan.popular ? "lux-btn-accent" : "lux-btn-primary"
                      }`}
                    >
                      {plan.button}
                    </Button>
                  </div>
                </LuxReveal>
              ))}
            </div>

            <div className="lux-card-interactive p-6 overflow-x-auto">
              <h3 className="lux-heading text-xl mb-4">Comparatif des prestations incluses</h3>
              <table className="w-full text-left text-xs md:text-sm min-w-[540px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="py-3 pr-4 font-medium">Livrable / Garantie</th>
                    <th className="py-3 px-4 font-semibold text-slate-900">Basic</th>
                    <th className="py-3 px-4 font-semibold text-[var(--brand-blue)]">Premium</th>
                    <th className="py-3 pl-4 font-semibold text-slate-900">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ["Design responsive multi-écrans", true, true, true],
                    ["Stack Next.js / React haute performance", false, true, true],
                    ["Optimisation SEO & Analytics", false, true, true],
                    ["Révisions illimitées & Chef de projet", false, false, true],
                    ["Support prioritaire 24h", false, true, true],
                  ].map(([label, b, p, e]) => (
                    <tr key={String(label)} className="hover:bg-slate-50/90 transition-colors">
                      <td className="py-3 pr-4 text-slate-800">{label}</td>
                      {[b, p, e].map((has, i) => (
                        <td key={i} className="py-3 px-4">
                          {has ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* TAB 2 : STUDIO FACTURE */}
        {activeTab === "invoice" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start"
          >
            <div className="xl:col-span-7 lux-card-interactive p-6 md:p-7 space-y-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="lux-heading text-2xl flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[var(--brand-blue)]" />
                  Éditeur de facture
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_ITEMS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => addItem(preset)}
                      className="lux-chip !text-[11px] hover:border-[var(--brand-blue)] transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-[var(--brand-blue)]" />
                  Informations client
                </h3>
                <div className="grid md:grid-cols-2 gap-3.5">
                  <Input
                    placeholder="Nom complet *"
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                    className={luxFieldClass}
                  />
                  <Input
                    type="email"
                    placeholder="Email *"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                    className={luxFieldClass}
                  />
                  <Input
                    type="tel"
                    placeholder="Téléphone"
                    value={clientInfo.phone}
                    onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                    className={luxFieldClass}
                  />
                  <Input
                    placeholder="Adresse / Ville"
                    value={clientInfo.address}
                    onChange={(e) => setClientInfo({ ...clientInfo, address: e.target.value })}
                    className={luxFieldClass}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-[var(--brand-blue)]" />
                    Prestations &amp; articles
                  </h3>
                  <Button
                    type="button"
                    onClick={() => addItem()}
                    variant="outline"
                    size="sm"
                    className="lux-btn-ghost !px-3.5 !py-1.5 text-xs"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1.5" />
                    Ajouter ligne
                  </Button>
                </div>

                <div className="space-y-3">
                  {invoiceItems.map((item, index) => (
                    <div
                      key={index}
                      className="grid md:grid-cols-12 gap-2.5 items-center bg-slate-50 p-3.5 rounded-xl border border-slate-200"
                    >
                      <div className="md:col-span-5">
                        <Input
                          placeholder="Description de la prestation"
                          value={item.description}
                          onChange={(e) => updateItem(index, "description", e.target.value)}
                          className={luxFieldClass}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Input
                          type="number"
                          min={1}
                          placeholder="Qté"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(index, "quantity", Math.max(1, parseInt(e.target.value) || 1))
                          }
                          className={luxFieldClass}
                        />
                      </div>
                      <div className="md:col-span-3">
                        <Input
                          type="number"
                          min={0}
                          placeholder="Prix unit."
                          value={item.unitPrice}
                          onChange={(e) =>
                            updateItem(index, "unitPrice", parseFloat(e.target.value) || 0)
                          }
                          className={luxFieldClass}
                        />
                      </div>
                      <div className="md:col-span-2 flex items-center justify-end gap-1.5">
                        <span className="text-xs font-mono font-semibold text-slate-900 tabular-nums truncate">
                          {item.total.toLocaleString("fr-FR")} F
                        </span>
                        <Button
                          type="button"
                          onClick={() => removeItem(index)}
                          variant="ghost"
                          size="sm"
                          disabled={invoiceItems.length === 1}
                          className="h-8 w-8 p-0 hover:bg-red-50"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-3.5">
                <div>
                  <label className="text-xs text-slate-600 mb-1.5 block font-medium">TVA (%)</label>
                  <Input
                    type="number"
                    min={0}
                    value={invoiceSettings.tax}
                    onChange={(e) =>
                      setInvoiceSettings({
                        ...invoiceSettings,
                        tax: parseFloat(e.target.value) || 0,
                      })
                    }
                    className={luxFieldClass}
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-600 mb-1.5 block font-medium">
                    Remise (%)
                  </label>
                  <Input
                    type="number"
                    min={0}
                    value={invoiceSettings.discount}
                    onChange={(e) =>
                      setInvoiceSettings({
                        ...invoiceSettings,
                        discount: parseFloat(e.target.value) || 0,
                      })
                    }
                    className={luxFieldClass}
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-600 mb-1.5 block font-medium">Échéance</label>
                  <Input
                    type="date"
                    value={invoiceSettings.dueDate}
                    onChange={(e) =>
                      setInvoiceSettings({ ...invoiceSettings, dueDate: e.target.value })
                    }
                    className={luxFieldClass}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-600 mb-1.5 block font-medium">
                  Notes ou conditions
                </label>
                <Textarea
                  value={invoiceSettings.notes}
                  onChange={(e) => setInvoiceSettings({ ...invoiceSettings, notes: e.target.value })}
                  placeholder="Ex : Règlement par virement, Wave ou Orange Money sous 15 jours..."
                  className={luxFieldClass}
                  rows={2}
                />
              </div>

              <Button
                type="button"
                onClick={generateInvoice}
                disabled={isGenerating}
                className="w-full lux-btn-primary !py-6 text-base"
              >
                {isGenerating ? "Génération en cours..." : "Générer et enregistrer la facture"}
              </Button>
            </div>

            {/* Aperçu live de la facture */}
            <aside className="xl:col-span-5 xl:sticky xl:top-28 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_20px_55px_rgba(15,23,42,0.08)]">
              <div className="h-1.5 w-full bg-[var(--brand-blue)]" aria-hidden />
              <div className="p-6 space-y-5">
                <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand-blue)] font-semibold">
                      Aperçu Temps Réel
                    </span>
                    <h3 className="font-display text-2xl font-bold text-slate-900 mt-0.5">
                      digitalpro solutions
                    </h3>
                    <p className="text-[11px] text-slate-500">Cocody, Abidjan · Côte d&apos;Ivoire</p>
                  </div>
                  <span className="lux-chip font-mono text-[10px]">PROFORMA</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-slate-500 mb-1">Facturé à :</p>
                    <p className="font-semibold text-slate-900">
                      {clientInfo.name || "Nom du client"}
                    </p>
                    <p className="text-slate-600 truncate">{clientInfo.email || "email@client.com"}</p>
                    {clientInfo.phone ? <p className="text-slate-600">{clientInfo.phone}</p> : null}
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500 mb-1">Échéance :</p>
                    <p className="font-mono text-slate-900 font-medium">
                      {invoiceSettings.dueDate
                        ? new Date(invoiceSettings.dueDate).toLocaleDateString("fr-FR")
                        : "À réception"}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-2 text-xs">
                  {invoiceItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-2">
                      <span className="text-slate-800 truncate">
                        {item.quantity}x {item.description || `Prestation #${idx + 1}`}
                      </span>
                      <span className="font-mono font-semibold text-slate-900 shrink-0 tabular-nums">
                        {item.total.toLocaleString("fr-FR")} F
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5 text-xs pt-2 border-t border-slate-200">
                  <div className="flex justify-between text-slate-600">
                    <span>Sous-total</span>
                    <span className="tabular-nums">{subtotal.toLocaleString("fr-FR")} FCFA</span>
                  </div>
                  {invoiceSettings.tax > 0 ? (
                    <div className="flex justify-between text-slate-600">
                      <span>TVA ({invoiceSettings.tax}%)</span>
                      <span className="tabular-nums">{taxAmount.toLocaleString("fr-FR")} FCFA</span>
                    </div>
                  ) : null}
                  {invoiceSettings.discount > 0 ? (
                    <div className="flex justify-between text-slate-600">
                      <span>Remise ({invoiceSettings.discount}%)</span>
                      <span className="tabular-nums">
                        -{discountAmount.toLocaleString("fr-FR")} FCFA
                      </span>
                    </div>
                  ) : null}
                  <div className="flex justify-between items-baseline pt-3 border-t border-slate-200">
                    <span className="text-sm font-bold text-slate-900">TOTAL TTC</span>
                    <span className="font-display text-2xl font-bold text-[var(--brand-red)] tabular-nums">
                      {total.toLocaleString("fr-FR")} FCFA
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </motion.div>
        )}

        {/* TAB 3 : HISTORIQUE */}
        {activeTab === "history" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-5xl mx-auto space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="lux-card-kpi p-5">
                <p className="text-xs text-slate-500 mb-1">Volume total facturé</p>
                <p className="font-display text-2xl font-bold text-slate-900 tabular-nums">
                  {historySummary.totalBilled.toLocaleString("fr-FR")} FCFA
                </p>
              </div>
              <div className="lux-card-kpi p-5">
                <p className="text-xs text-slate-500 mb-1">Factures réglées</p>
                <p className="font-display text-2xl font-bold text-emerald-600 tabular-nums">
                  {historySummary.paidCount}
                </p>
              </div>
              <div className="lux-card-kpi p-5">
                <p className="text-xs text-slate-500 mb-1">En attente / suivi</p>
                <p className="font-display text-2xl font-bold text-[var(--brand-blue)] tabular-nums">
                  {historySummary.pendingCount}
                </p>
              </div>
            </div>

            <div className="lux-card-interactive p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Rechercher par N°, client ou email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`${luxFieldClass} pl-10`}
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "all" as const, label: "Toutes" },
                    { id: "paid" as const, label: "Payées" },
                    { id: "pending" as const, label: "En attente" },
                    { id: "overdue" as const, label: "En retard" },
                  ].map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setFilterStatus(st.id)}
                      className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                        filterStatus === st.id ? "lux-chip-active" : "lux-chip"
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              {invoices.length === 0 ? (
                <div className="text-center py-12 text-slate-600 space-y-4">
                  <Receipt className="w-12 h-12 mx-auto text-[var(--brand-blue)] opacity-75" />
                  <div>
                    <p className="text-base font-semibold text-slate-900">
                      Aucune facture générée pour le moment
                    </p>
                    <p className="text-xs mt-1 text-slate-500">
                      Créez votre première facture depuis l&apos;onglet Studio Facture.
                    </p>
                  </div>
                  <Button
                    type="button"
                    onClick={() => setActiveTab("invoice")}
                    className="lux-btn-primary !px-5 !py-2.5 text-xs"
                  >
                    Créer une facture
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {invoices
                    .filter((invoice) => {
                      const matchesSearch =
                        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        invoice.clientEmail.toLowerCase().includes(searchTerm.toLowerCase());
                      const isOverdue =
                        invoice.dueDate &&
                        new Date(invoice.dueDate) < new Date() &&
                        invoice.status !== "paid";
                      const effectiveStatus = isOverdue ? "overdue" : invoice.status;
                      const matchesFilter =
                        filterStatus === "all" || effectiveStatus === filterStatus;
                      return matchesSearch && matchesFilter;
                    })
                    .map((invoice) => {
                      const isOverdue =
                        invoice.dueDate &&
                        new Date(invoice.dueDate) < new Date() &&
                        invoice.status !== "paid";
                      const status = isOverdue ? "overdue" : invoice.status;

                      return (
                        <div
                          key={invoice.id}
                          className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 hover:border-[var(--brand-blue)] transition-colors"
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex-1 space-y-1.5">
                              <div className="flex items-center gap-3 flex-wrap">
                                <h3 className="text-base font-mono font-semibold text-slate-900">
                                  {invoice.invoiceNumber}
                                </h3>
                                <span
                                  className={`px-3 py-0.5 rounded-full text-[11px] font-semibold ${
                                    status === "paid"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : status === "overdue"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-amber-100 text-amber-800"
                                  }`}
                                >
                                  {status === "paid"
                                    ? "Payée"
                                    : status === "overdue"
                                      ? "En retard"
                                      : "En attente"}
                                </span>
                              </div>
                              <p className="text-xs text-slate-600">
                                <span className="text-[var(--brand-blue)] font-medium">Client :</span>{" "}
                                {invoice.clientName} ({invoice.clientEmail})
                              </p>
                              <p className="text-xs text-slate-600">
                                <span className="text-[var(--brand-blue)] font-medium">Émise le :</span>{" "}
                                {new Date(invoice.createdAt).toLocaleDateString("fr-FR", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                            </div>

                            <div className="flex flex-col md:items-end gap-2.5">
                              <div className="text-xl font-bold text-[var(--brand-red)] tabular-nums">
                                {invoice.total.toLocaleString("fr-FR")} FCFA
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <Button
                                  type="button"
                                  onClick={() => toggleInvoiceStatus(invoice.id)}
                                  variant="outline"
                                  size="sm"
                                  className="lux-btn-ghost !px-3 !py-1.5 text-xs"
                                >
                                  {invoice.status === "paid" ? "Marquer en attente" : "Marquer payée"}
                                </Button>
                                <Button
                                  type="button"
                                  onClick={() => downloadInvoice(invoice)}
                                  variant="outline"
                                  size="sm"
                                  className="lux-btn-ghost !px-3 !py-1.5 text-xs"
                                >
                                  <Download className="w-3.5 h-3.5 mr-1.5" />
                                  Télécharger
                                </Button>
                                <Button
                                  type="button"
                                  onClick={() => deleteInvoice(invoice.id)}
                                  variant="outline"
                                  size="sm"
                                  className="bg-red-50 border-red-200 text-red-600 hover:bg-red-100 !px-2.5"
                                  aria-label="Supprimer la facture"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ModernBilling;
