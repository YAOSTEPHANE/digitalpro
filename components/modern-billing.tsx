"use client";

import { useState, useEffect } from "react";
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
  Eye,
  Search,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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

const ModernBilling = () => {
  const [activeTab, setActiveTab] = useState<"pricing" | "invoice" | "history">("pricing");
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    { description: "", quantity: 1, unitPrice: 0, total: 0 }
  ]);
  const [clientInfo, setClientInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const [invoiceSettings, setInvoiceSettings] = useState({
    tax: 0,
    discount: 0,
    dueDate: "",
    notes: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "paid" | "pending" | "overdue">("all");

  // Charger les factures depuis localStorage
  useEffect(() => {
    const savedInvoices = localStorage.getItem("invoices");
    if (savedInvoices) {
      try {
        const parsed = JSON.parse(savedInvoices);
        setInvoices(parsed);
      } catch (error) {
        console.error("Erreur lors du chargement des factures:", error);
      }
    }
  }, []);

  // Sauvegarder les factures dans localStorage
  const saveInvoice = (invoice: Invoice) => {
    const updatedInvoices = [invoice, ...invoices];
    setInvoices(updatedInvoices);
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
  };

  // Supprimer une facture
  const deleteInvoice = (id: string) => {
    const updatedInvoices = invoices.filter(inv => inv.id !== id);
    setInvoices(updatedInvoices);
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
    toast.success("Facture supprimée");
  };

  // Télécharger une facture en HTML
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

  // Générer le HTML de la facture
  const generateInvoiceHTML = (invoice: Invoice): string => {
    const subtotal = invoice.subtotal;
    const taxAmount = invoice.tax ? (subtotal * invoice.tax) / 100 : 0;
    const discountAmount = invoice.discount ? (subtotal * invoice.discount) / 100 : 0;
    const total = invoice.total;

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            border-bottom: 3px solid #8b5cf6;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: #8b5cf6;
          }
          .invoice-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
          }
          .client-info, .company-info {
            flex: 1;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          th {
            background-color: #f8f9fa;
            font-weight: bold;
          }
          .totals {
            margin-top: 20px;
            text-align: right;
          }
          .total-row {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 10px;
          }
          .total-label {
            width: 150px;
            text-align: right;
            margin-right: 20px;
          }
          .total-value {
            width: 150px;
            text-align: right;
            font-weight: bold;
          }
          .grand-total {
            font-size: 20px;
            color: #8b5cf6;
            border-top: 2px solid #8b5cf6;
            padding-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">digitalpro solutions</div>
          <h1>FACTURE</h1>
          <p><strong>Numéro:</strong> ${invoice.invoiceNumber}</p>
          <p><strong>Date:</strong> ${new Date(invoice.createdAt).toLocaleDateString('fr-FR')}</p>
          ${invoice.dueDate ? `<p><strong>Date d'échéance:</strong> ${new Date(invoice.dueDate).toLocaleDateString('fr-FR')}</p>` : ''}
        </div>

        <div class="invoice-info">
          <div class="client-info">
            <h3>Facturé à:</h3>
            <p><strong>${invoice.clientName}</strong></p>
            ${invoice.clientEmail ? `<p>${invoice.clientEmail}</p>` : ''}
            ${invoice.clientPhone ? `<p>${invoice.clientPhone}</p>` : ''}
            ${invoice.clientAddress ? `<p>${invoice.clientAddress}</p>` : ''}
          </div>
          <div class="company-info">
            <h3>digitalpro solutions</h3>
            <p>Bvd Koffi Gadaud, Cocody</p>
            <p>Abidjan, Côte d'Ivoire</p>
            <p>Email: digitalprosolutions27@gmail.com</p>
            <p>Tél: +225 07 48 97 60 31</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantité</th>
              <th>Prix unitaire</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${invoice.items.map(item => `
              <tr>
                <td>${item.description}</td>
                <td>${item.quantity}</td>
                <td>${item.unitPrice.toLocaleString('fr-FR')} FCFA</td>
                <td>${item.total.toLocaleString('fr-FR')} FCFA</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="totals">
          <div class="total-row">
            <span class="total-label">Sous-total:</span>
            <span class="total-value">${subtotal.toLocaleString('fr-FR')} FCFA</span>
          </div>
          ${invoice.tax ? `
            <div class="total-row">
              <span class="total-label">TVA (${invoice.tax}%):</span>
              <span class="total-value">${taxAmount.toLocaleString('fr-FR')} FCFA</span>
            </div>
          ` : ''}
          ${invoice.discount ? `
            <div class="total-row">
              <span class="total-label">Remise (${invoice.discount}%):</span>
              <span class="total-value">-${discountAmount.toLocaleString('fr-FR')} FCFA</span>
            </div>
          ` : ''}
          <div class="total-row grand-total">
            <span class="total-label">TOTAL:</span>
            <span class="total-value">${total.toLocaleString('fr-FR')} FCFA</span>
          </div>
        </div>

        ${invoice.notes ? `
          <div style="margin-top: 30px;">
            <h3>Notes:</h3>
            <p>${invoice.notes}</p>
          </div>
        ` : ''}
      </body>
      </html>
    `;
  };

  const plans = [
    {
      index: 0,
      name: "Basic",
      price: "200.000 FCFA",
      priceValue: 200000,
      features: [
        "Entièrement réactif sur tous les écrans",
        "Conception + Développement",
        "Canal de communication privé",
        "Délai d'exécution de 1 à 3 jours",
      ],
      style: "rounded-3xl py-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-50",
      description: "Composants autonomes adaptés à vos besoins et facilement intégrables. Parfaits pour les éléments ou sections de sites web.",
      button: "Acheter maintenant",
      popular: false,
    },
    {
      index: 1,
      name: "Premium",
      price: "500.000 FCFA",
      priceValue: 500000,
      features: [
        "Entièrement réactif sur tous les écrans",
        "Code React / Next.js / Tailwind CSS",
        "Conception + développement",
        "Délai de réponse du support de 24 heures",
        "Canal de communication privé",
        "Délai d'exécution de 3 à 5 jours",
      ],
      style: "rounded-3xl py-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-50",
      description: "Idéal pour les startups en phase de démarrage, les entreprises et les freelances qui ont besoin d'un volet marketing pour présenter leur travail et leur vision.",
      button: "Acheter maintenant",
      popular: true,
    },
    {
      index: 2,
      name: "Enterprise",
      feature: "Contactez-nous",
      price: "Sur devis",
      features: [
        "Entièrement réactif sur tous les écrans",
        "Code React / Next.js / Tailwind CSS",
        "Conception + développement",
        "Révisions illimitées",
        "Délai de réponse du support de 24 heures",
        "Canal de communication privé",
        "File d'attente de développement prioritaire",
        "Chef de projet dédié",
      ],
      style: "h-full rounded-3xl py-10 flex flex-col bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-50",
      description: "Idéal pour les petites entreprises et les startups qui ont besoin d'un site web performant qui a fière allure et convertit les visiteurs en clients.",
      button: "Contactez-nous",
      popular: false,
    },
  ];

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...invoiceItems];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    };
    
    // Recalculer le total
    newItems[index].total = newItems[index].quantity * newItems[index].unitPrice;
    setInvoiceItems(newItems);
  };

  const addItem = () => {
    setInvoiceItems([...invoiceItems, { description: "", quantity: 1, unitPrice: 0, total: 0 }]);
  };

  const removeItem = (index: number) => {
    setInvoiceItems(invoiceItems.filter((_, i) => i !== index));
  };

  const calculateTotals = () => {
    const subtotal = invoiceItems.reduce((sum, item) => sum + item.total, 0);
    const taxAmount = invoiceSettings.tax ? (subtotal * invoiceSettings.tax) / 100 : 0;
    const discountAmount = invoiceSettings.discount ? (subtotal * invoiceSettings.discount) / 100 : 0;
    const total = subtotal + taxAmount - discountAmount;
    return { subtotal, taxAmount, discountAmount, total };
  };

  const generateInvoice = async () => {
    if (!clientInfo.name || !clientInfo.email) {
      toast.error("Veuillez remplir les informations du client");
      return;
    }

    if (invoiceItems.some(item => !item.description || item.total === 0)) {
      toast.error("Veuillez remplir tous les articles de la facture");
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
        // Créer l'objet facture pour l'historique
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

        // Sauvegarder la facture
        saveInvoice(newInvoice);

        toast.success("Facture générée et envoyée avec succès!");
        // Réinitialiser le formulaire
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

  return (
    <div className="relative w-full min-h-screen py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-black" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">
              Facturation
            </span>
          </h1>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Gérez vos tarifs et générez vos factures facilement
          </p>
        </motion.div>

        {/* Onglets */}
        <div className="flex justify-center mb-8 gap-4">
          {[
            { id: "pricing", label: "Tarifs", icon: CreditCard },
            { id: "invoice", label: "Créer une facture", icon: FileText },
            { id: "history", label: "Historique", icon: Calendar },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "pricing" | "invoice" | "history")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contenu des onglets */}
        {activeTab === "pricing" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative h-full flex flex-col border rounded-3xl px-6 ${
                    plan.popular
                      ? "border-purple-500 shadow-lg shadow-purple-500/20 scale-105"
                      : "border-neutral-800"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Populaire
                    </div>
                  )}
                  
                  <div className={plan.style}>
                    <div className="text-4xl flex items-center font-medium mb-4">
                      {plan.name}
                      {plan.feature === "Contactez-nous" && (
                        <div className="text-sm font-medium text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full ml-4">
                          {plan.feature}
                        </div>
                      )}
                    </div>
                    <div className="text-3xl pt-6 text-white">{plan.price}</div>
                    <div className="py-6 text-neutral-400">{plan.description}</div>

                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="text-lg py-2 flex items-center text-neutral-300">
                          <CheckCircle2 className={`mr-2 text-xl ${
                            plan.feature === "Contactez-nous" ? "text-blue-400" : "text-green-500"
                          }`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto mb-6">
                    {index === 2 ? (
                      <Button
                        onClick={() => setActiveTab("invoice")}
                        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                      >
                        {plan.button}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          setActiveTab("invoice");
                          setClientInfo(prev => ({ ...prev }));
                          const priceValue = plan.priceValue ?? 0;
                          setInvoiceItems([{
                            description: plan.name,
                            quantity: 1,
                            unitPrice: priceValue,
                            total: priceValue
                          }]);
                        }}
                        className="w-full bg-gradient-to-r from-emerald-500 to-blue-400 hover:from-emerald-600 hover:to-blue-500"
                      >
                        {plan.button}
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "invoice" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-gradient-to-br from-neutral-900/90 to-black border border-purple-500/20 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-purple-400" />
                Créer une nouvelle facture
              </h2>

              {/* Informations client */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-400" />
                  Informations client
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Nom complet *"
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                    className="bg-neutral-800 border-neutral-700 text-white"
                  />
                  <Input
                    type="email"
                    placeholder="Email *"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                    className="bg-neutral-800 border-neutral-700 text-white"
                  />
                  <Input
                    type="tel"
                    placeholder="Téléphone"
                    value={clientInfo.phone}
                    onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                    className="bg-neutral-800 border-neutral-700 text-white"
                  />
                  <Input
                    placeholder="Adresse"
                    value={clientInfo.address}
                    onChange={(e) => setClientInfo({ ...clientInfo, address: e.target.value })}
                    className="bg-neutral-800 border-neutral-700 text-white"
                  />
                </div>
              </div>

              {/* Articles */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-purple-400" />
                    Articles
                  </h3>
                  <Button onClick={addItem} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {invoiceItems.map((item, index) => (
                    <div key={index} className="grid md:grid-cols-12 gap-4 items-end bg-neutral-800/50 p-4 rounded-lg">
                      <div className="md:col-span-5">
                        <Input
                          placeholder="Description"
                          value={item.description}
                          onChange={(e) => updateItem(index, "description", e.target.value)}
                          className="bg-neutral-900 border-neutral-700 text-white"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Input
                          type="number"
                          placeholder="Quantité"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value) || 0)}
                          className="bg-neutral-900 border-neutral-700 text-white"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Input
                          type="number"
                          placeholder="Prix unitaire"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(index, "unitPrice", parseFloat(e.target.value) || 0)}
                          className="bg-neutral-900 border-neutral-700 text-white"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Input
                          value={`${item.total.toLocaleString('fr-FR')} FCFA`}
                          disabled
                          className="bg-neutral-900 border-neutral-700 text-white"
                        />
                      </div>
                      <div className="md:col-span-1">
                        <Button
                          onClick={() => removeItem(index)}
                          variant="ghost"
                          size="sm"
                          disabled={invoiceItems.length === 1}
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Paramètres */}
              <div className="mb-8 grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-neutral-400 mb-2 block">TVA (%)</label>
                  <Input
                    type="number"
                    value={invoiceSettings.tax}
                    onChange={(e) => setInvoiceSettings({ ...invoiceSettings, tax: parseFloat(e.target.value) || 0 })}
                    className="bg-neutral-800 border-neutral-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-neutral-400 mb-2 block">Remise (%)</label>
                  <Input
                    type="number"
                    value={invoiceSettings.discount}
                    onChange={(e) => setInvoiceSettings({ ...invoiceSettings, discount: parseFloat(e.target.value) || 0 })}
                    className="bg-neutral-800 border-neutral-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-neutral-400 mb-2 block">Date d&apos;échéance</label>
                  <Input
                    type="date"
                    value={invoiceSettings.dueDate}
                    onChange={(e) => setInvoiceSettings({ ...invoiceSettings, dueDate: e.target.value })}
                    className="bg-neutral-800 border-neutral-700 text-white"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="text-sm text-neutral-400 mb-2 block">Notes</label>
                <Textarea
                  value={invoiceSettings.notes}
                  onChange={(e) => setInvoiceSettings({ ...invoiceSettings, notes: e.target.value })}
                  placeholder="Notes additionnelles..."
                  className="bg-neutral-800 border-neutral-700 text-white"
                  rows={3}
                />
              </div>

              {/* Totaux */}
              <div className="bg-neutral-800/50 rounded-lg p-6 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-neutral-400">Sous-total:</span>
                  <span className="text-white font-medium">{subtotal.toLocaleString('fr-FR')} FCFA</span>
                </div>
                {invoiceSettings.tax > 0 && (
                  <div className="flex justify-between mb-2">
                    <span className="text-neutral-400">TVA ({invoiceSettings.tax}%):</span>
                    <span className="text-white font-medium">{taxAmount.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                )}
                {invoiceSettings.discount > 0 && (
                  <div className="flex justify-between mb-2">
                    <span className="text-neutral-400">Remise ({invoiceSettings.discount}%):</span>
                    <span className="text-white font-medium">-{discountAmount.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                )}
                <div className="flex justify-between pt-4 border-t border-neutral-700">
                  <span className="text-xl font-bold text-white">TOTAL:</span>
                  <span className="text-xl font-bold text-purple-400">{total.toLocaleString('fr-FR')} FCFA</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button
                  onClick={generateInvoice}
                  disabled={isGenerating}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {isGenerating ? "Génération..." : "Générer et envoyer la facture"}
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "history" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-gradient-to-br from-neutral-900/90 to-black border border-purple-500/20 rounded-2xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-purple-400" />
                  Historique des factures
                </h2>

                {/* Recherche et filtres */}
                <div className="flex gap-3">
                  <div className="relative flex-1 max-w-xs">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <Input
                      placeholder="Rechercher..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-neutral-800 border-neutral-700 text-white pl-10"
                    />
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
                      className="bg-neutral-800 border border-neutral-700 text-white rounded-md px-10 py-2 appearance-none cursor-pointer"
                    >
                      <option value="all">Tous</option>
                      <option value="paid">Payées</option>
                      <option value="pending">En attente</option>
                      <option value="overdue">En retard</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Liste des factures */}
              {invoices.length === 0 ? (
                <div className="text-center py-12 text-neutral-400">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-neutral-600" />
                  <p>Aucune facture générée pour le moment</p>
                  <p className="text-sm mt-2">Les factures générées apparaîtront ici</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {invoices
                    .filter((invoice) => {
                      const matchesSearch =
                        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        invoice.clientEmail.toLowerCase().includes(searchTerm.toLowerCase());
                      const matchesFilter = filterStatus === "all" || invoice.status === filterStatus;
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
                          className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6 hover:border-purple-500/50 transition-colors"
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold text-white">
                                  {invoice.invoiceNumber}
                                </h3>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    status === "paid"
                                      ? "bg-green-500/20 text-green-400"
                                      : status === "overdue"
                                      ? "bg-red-500/20 text-red-400"
                                      : "bg-yellow-500/20 text-yellow-400"
                                  }`}
                                >
                                  {status === "paid"
                                    ? "Payée"
                                    : status === "overdue"
                                    ? "En retard"
                                    : "En attente"}
                                </span>
                              </div>
                              <div className="text-sm text-neutral-400 space-y-1">
                                <p>
                                  <span className="text-neutral-500">Client:</span>{" "}
                                  {invoice.clientName}
                                </p>
                                <p>
                                  <span className="text-neutral-500">Email:</span>{" "}
                                  {invoice.clientEmail}
                                </p>
                                <p>
                                  <span className="text-neutral-500">Date:</span>{" "}
                                  {new Date(invoice.createdAt).toLocaleDateString("fr-FR", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </p>
                                {invoice.dueDate && (
                                  <p>
                                    <span className="text-neutral-500">Échéance:</span>{" "}
                                    {new Date(invoice.dueDate).toLocaleDateString("fr-FR")}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <div className="text-2xl font-bold text-purple-400">
                                {invoice.total.toLocaleString("fr-FR")} FCFA
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => downloadInvoice(invoice)}
                                  variant="outline"
                                  size="sm"
                                  className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600"
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Télécharger
                                </Button>
                                <Button
                                  onClick={() => deleteInvoice(invoice.id)}
                                  variant="outline"
                                  size="sm"
                                  className="bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30"
                                >
                                  <Trash2 className="w-4 h-4" />
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


