'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Bell, Sparkles, ShieldCheck } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  // Initialiser les messages avec une fonction pour éviter les problèmes d'hydratation
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: '1',
      text: 'Bonjour ! Je suis l&apos;assistant virtuel de digitalpro solutions. Comment puis-je vous aider aujourd&apos;hui ?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [hasShownWelcome, setHasShownWelcome] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // S'assurer que le composant est monté côté client avant d'afficher
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Afficher une notification de bienvenue au chargement de la page
  useEffect(() => {
    if (isMounted && !hasShownWelcome) {
      // Attendre un peu avant d'afficher la notification
      const timer = setTimeout(() => {
        setShowNotification(true)
        setHasShownWelcome(true)
        
        // Masquer la notification après 5 secondes
        setTimeout(() => {
          setShowNotification(false)
        }, 5000)
      }, 2000) // Attendre 2 secondes après le chargement

      return () => clearTimeout(timer)
    }
  }, [isMounted, hasShownWelcome])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessageWithText = async (text: string) => {
    if (!text.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    }

    const currentInput = text
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Préparer l'historique de conversation pour le contexte
      const conversationHistory = messages
        .slice(-5) // Garder seulement les 5 derniers messages pour le contexte
        .map((msg) => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text,
        }))

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: currentInput,
          history: conversationHistory,
        }),
      })

      if (!response.ok) {
        throw new Error('Erreur de réponse du serveur')
      }

      const data = await response.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || 'Désolé, je n&apos;ai pas pu traiter votre demande.',
        sender: 'bot',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Désolé, une erreur est survenue. Veuillez réessayer dans un instant.',
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const sendMessage = async () => {
    await sendMessageWithText(input)
  }

  const handleQuickAction = async (prompt: string) => {
    await sendMessageWithText(prompt)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Notification de bienvenue */}
      {isMounted && showNotification && !isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-80 rounded-2xl border border-[rgba(81,102,153,0.35)] bg-[rgba(14,16,24,0.96)] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl animate-slide-up">
          <div className="flex items-start gap-3">
            <div className="lux-icon-badge flex-shrink-0 p-2.5 text-[var(--brand-blue-light)]">
              <Bell className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h4 className="mb-1 text-sm font-semibold text-[var(--lux-champagne)]">Bienvenue</h4>
              <p className="mb-3 text-xs leading-relaxed lux-muted">
                Expérience concierge activée : réponses prioritaires sur vos besoins web, SEO et acquisition.
              </p>
              <button
                onClick={() => {
                  setShowNotification(false)
                  setIsOpen(true)
                }}
                className="w-full rounded-xl border border-white/20 bg-[var(--brand-blue)] px-4 py-2 text-xs font-medium text-white transition hover:bg-[var(--brand-blue-light)]"
              >
                Démarrer la conversation
              </button>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="lux-muted transition hover:text-[var(--lux-champagne)] flex-shrink-0"
              aria-label="Fermer la notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Bouton flottant pour ouvrir le chatbot */}
      {isMounted && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group fixed bottom-6 left-6 z-50 rounded-2xl border border-[rgba(81,102,153,0.4)] bg-[rgba(14,16,24,0.95)] p-4 text-[var(--lux-champagne)] shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--brand-blue-light)]"
          aria-label="Ouvrir le chatbot"
        >
          <div className="absolute -inset-0.5 -z-10 rounded-[18px] bg-[var(--brand-blue)] opacity-25 blur-md transition group-hover:opacity-40" />
          <div className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6" />
            <Sparkles className="h-4 w-4 text-[var(--brand-red)]" />
          </div>
        </button>
      )}

      {/* Fenêtre du chatbot */}
      {isMounted && isOpen && (
        <div className="fixed bottom-6 left-6 z-50 flex h-[440px] w-[24rem] flex-col overflow-hidden rounded-3xl border border-[rgba(81,102,153,0.35)] bg-[rgba(12,14,20,0.98)] shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:h-[460px]">
          {/* En-tête */}
          <div className="relative overflow-hidden border-b border-[rgba(81,102,153,0.25)] bg-[rgba(16,18,26,0.95)] p-4">
            <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-[rgba(81,102,153,0.12)] blur-2xl" />
            <div className="pointer-events-none absolute -left-8 -bottom-10 h-28 w-28 rounded-full bg-[rgba(204,38,40,0.08)] blur-2xl" />
            <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="lux-icon-badge p-2.5">
                <Bot className="h-5 w-5 text-[var(--brand-blue-light)]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-wide text-[var(--lux-champagne)]">Assistant digitalpro</h3>
                <div className="mt-0.5 flex items-center gap-2 text-[11px] lux-muted">
                  <span className="inline-flex h-2 w-2 rounded-full bg-[var(--brand-red)] shadow-[0_0_10px_var(--lux-glow-red)] animate-pulse" />
                  <span>Conseiller IA en ligne</span>
                </div>
              </div>
            </div>
            <div className="mr-2 hidden items-center gap-1 rounded-full border border-[rgba(81,102,153,0.35)] bg-[rgba(81,102,153,0.08)] px-2 py-1 text-[10px] lux-muted sm:flex">
              <ShieldCheck className="h-3.5 w-3.5 text-[var(--brand-blue-light)]" />
              Réponses sécurisées
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg border border-[rgba(81,102,153,0.35)] bg-[rgba(255,255,255,0.04)] p-1.5 lux-muted transition hover:text-[var(--lux-champagne)]"
              aria-label="Fermer le chatbot"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          </div>

          <div className="border-b border-[rgba(81,102,153,0.2)] px-4 py-2 text-[11px] lux-muted">
            Assistance premium sur vos projets digitaux - réponse en quelques secondes
          </div>

          <div className="border-b border-[rgba(81,102,153,0.2)] bg-[rgba(255,255,255,0.02)] px-3 py-2">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleQuickAction('Je souhaite un devis personnalisé pour mon projet.')}
                disabled={isLoading}
                className="lux-chip text-[11px] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Demander un devis
              </button>
              <button
                onClick={() => handleQuickAction('Je veux prendre un rendez-vous rapide cette semaine.')}
                disabled={isLoading}
                className="lux-chip text-[11px] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Prendre RDV
              </button>
              <button
                onClick={() => handleQuickAction('Pouvez-vous faire un audit rapide de mon site ?')}
                disabled={isLoading}
                className="lux-chip text-[11px] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Audit express
              </button>
            </div>
          </div>

          {/* Zone de messages */}
          <div className="custom-scrollbar flex-1 space-y-4 overflow-y-auto bg-[radial-gradient(circle_at_top_right,rgba(81,102,153,0.12),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(204,38,40,0.08),transparent_40%),var(--lux-bg-soft)] p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'bot' && (
                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[var(--brand-blue)] shadow-lg">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                    message.sender === 'user'
                      ? 'border border-[rgba(81,102,153,0.35)] bg-[var(--brand-blue)] text-white shadow-[0_10px_30px_rgba(81,102,153,0.25)]'
                      : 'border border-[rgba(81,102,153,0.25)] bg-[rgba(255,255,255,0.04)] text-[var(--lux-champagne)]'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                </div>
                {message.sender === 'user' && (
                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl lux-icon-badge-red p-0">
                    <User className="h-4 w-4 text-[var(--brand-red-light)]" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-[var(--brand-blue)]">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="rounded-2xl border border-[rgba(81,102,153,0.25)] bg-[rgba(255,255,255,0.04)] px-4 py-2.5 text-[var(--lux-champagne)]">
                  <div className="mb-1 text-[11px] lux-muted">L&apos;assistant rédige une réponse...</div>
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce animate-bounce-delay-0 rounded-full bg-[var(--brand-blue-light)]"></span>
                    <span className="h-2 w-2 animate-bounce animate-bounce-delay-140 rounded-full bg-[var(--brand-blue-light)]"></span>
                    <span className="h-2 w-2 animate-bounce animate-bounce-delay-280 rounded-full bg-[var(--brand-blue-light)]"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Zone de saisie */}
          <div className="border-t border-[rgba(81,102,153,0.25)] bg-[rgba(16,18,26,0.95)] p-4">
            <div className="flex gap-2 rounded-2xl border border-[rgba(81,102,153,0.3)] bg-[rgba(255,255,255,0.03)] p-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Posez votre question..."
                className="flex-1 rounded-xl border border-transparent bg-transparent px-4 py-2.5 text-sm text-[var(--lux-champagne)] placeholder:text-[var(--lux-muted)] outline-none transition focus:border-[rgba(81,102,153,0.45)] focus:ring-2 focus:ring-[rgba(81,102,153,0.25)]"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="rounded-xl border border-[rgba(81,102,153,0.3)] bg-[var(--brand-blue)] px-4 py-2 text-white transition hover:bg-[var(--brand-blue-light)] disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Envoyer le message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] lux-muted">
              Propulsé par IA - vérifiez les informations critiques avant décision.
            </p>
          </div>
        </div>
      )}

      {/* Version mobile responsive */}
      {isMounted && isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsOpen(false)} />
      )}
    </>
  )
}

