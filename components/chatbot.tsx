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
        <div className="fixed bottom-24 left-6 z-50 w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_20px_60px_rgba(2,6,23,0.12)] backdrop-blur-2xl animate-slide-up">
          <div className="flex items-start gap-3">
            <div className="rounded-full border border-slate-200 bg-slate-100 p-2.5 text-blue-600 flex-shrink-0">
              <Bell className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h4 className="mb-1 text-sm font-semibold text-slate-900">Bienvenue</h4>
              <p className="mb-3 text-xs leading-relaxed text-slate-600">
                Expérience concierge activée : réponses prioritaires sur vos besoins web, SEO et acquisition.
              </p>
              <button
                onClick={() => {
                  setShowNotification(false)
                  setIsOpen(true)
                }}
                className="w-full rounded-xl border border-white/20 bg-gradient-to-r from-red-500/90 to-blue-500/90 px-4 py-2 text-xs font-medium text-white transition hover:from-red-500 hover:to-blue-500"
              >
                Démarrer la conversation
              </button>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="text-slate-500 transition hover:text-slate-900 flex-shrink-0"
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
          className="group fixed bottom-6 left-6 z-50 rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 shadow-[0_12px_40px_rgba(15,23,42,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(15,23,42,0.2)]"
          aria-label="Ouvrir le chatbot"
        >
          <div className="absolute -inset-0.5 -z-10 rounded-[18px] bg-gradient-to-r from-red-500/40 via-fuchsia-500/30 to-blue-500/40 opacity-80 blur-md transition group-hover:opacity-100" />
          <div className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6" />
            <Sparkles className="h-4 w-4 text-blue-600" />
          </div>
        </button>
      )}

      {/* Fenêtre du chatbot */}
      {isMounted && isOpen && (
        <div className="fixed bottom-6 left-6 z-50 flex h-[440px] w-[24rem] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(2,6,23,0.2)] backdrop-blur-2xl sm:h-[460px]">
          {/* En-tête */}
          <div className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-r from-red-50 to-blue-50 p-4">
            <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-blue-500/10 blur-2xl" />
            <div className="pointer-events-none absolute -left-8 -bottom-10 h-28 w-28 rounded-full bg-red-500/10 blur-2xl" />
            <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-slate-200 bg-white p-2.5">
                <Bot className="h-5 w-5 text-slate-900" />
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-wide text-slate-900">Assistant digitalpro</h3>
                <div className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-600">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
                  <span>Conseiller IA en ligne</span>
                </div>
              </div>
            </div>
            <div className="mr-2 hidden items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] text-slate-600 sm:flex">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
              Réponses sécurisées
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Fermer le chatbot"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          </div>

          <div className="border-b border-slate-200 bg-white px-4 py-2 text-[11px] text-slate-600">
            Assistance premium sur vos projets digitaux - réponse en quelques secondes
          </div>

          <div className="border-b border-slate-200 bg-slate-50 px-3 py-2">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleQuickAction('Je souhaite un devis personnalisé pour mon projet.')}
                disabled={isLoading}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Demander un devis
              </button>
              <button
                onClick={() => handleQuickAction('Je veux prendre un rendez-vous rapide cette semaine.')}
                disabled={isLoading}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Prendre RDV
              </button>
              <button
                onClick={() => handleQuickAction('Pouvez-vous faire un audit rapide de mon site ?')}
                disabled={isLoading}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Audit express
              </button>
            </div>
          </div>

          {/* Zone de messages */}
          <div className="custom-scrollbar flex-1 space-y-4 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.08),transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(239,68,68,0.08),transparent_40%),#ffffff] p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'bot' && (
                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-red-500/90 to-blue-500/90 shadow-lg">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                    message.sender === 'user'
                      ? 'border border-red-400/30 bg-gradient-to-br from-red-500 to-blue-500 text-white shadow-[0_10px_30px_rgba(59,130,246,0.25)]'
                      : 'border border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                </div>
                {message.sender === 'user' && (
                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-100">
                    <User className="h-4 w-4 text-slate-900" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-red-500/90 to-blue-500/90">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-slate-700">
                  <div className="mb-1 text-[11px] text-slate-500">L&apos;assistant rédige une réponse...</div>
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce animate-bounce-delay-0 rounded-full bg-slate-400"></span>
                    <span className="h-2 w-2 animate-bounce animate-bounce-delay-140 rounded-full bg-slate-400"></span>
                    <span className="h-2 w-2 animate-bounce animate-bounce-delay-280 rounded-full bg-slate-400"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Zone de saisie */}
          <div className="border-t border-slate-200 bg-slate-50 p-4">
            <div className="flex gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-inner shadow-slate-100/50">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Posez votre question..."
                className="flex-1 rounded-xl border border-transparent bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-red-400/40 focus:ring-2 focus:ring-red-400/30"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="rounded-xl border border-red-300/30 bg-gradient-to-r from-red-500 to-blue-500 px-4 py-2 text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Envoyer le message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-slate-500">
              Propulsé par IA - vérifiez les informations critiques avant décision.
            </p>
          </div>
        </div>
      )}

      {/* Version mobile responsive */}
      {isMounted && isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-slate-900/20" onClick={() => setIsOpen(false)} />
      )}
    </>
  )
}

