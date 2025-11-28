'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Bell } from 'lucide-react'

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

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    }

    const currentInput = input
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
        <div className="fixed bottom-24 left-6 z-50 w-80 bg-gradient-to-r from-red-600/95 to-blue-600/95 backdrop-blur-lg border border-red-500/30 rounded-xl shadow-2xl p-4 animate-slide-up">
          <div className="flex items-start gap-3">
            <div className="bg-white/20 rounded-full p-2 flex-shrink-0">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-semibold text-sm mb-1">Bienvenue ! 👋</h4>
              <p className="text-white/90 text-xs mb-3">
                Besoin d&apos;aide ? Notre assistant est là pour vous accompagner !
              </p>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <button
                onClick={() => {
                  setShowNotification(false)
                  setIsOpen(true)
                }}
                className="w-full bg-white/20 hover:bg-white/30 text-white text-xs font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Parler à l&apos;assistant
              </button>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="text-white/80 hover:text-white transition-colors flex-shrink-0"
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
          className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none"
          aria-label="Ouvrir le chatbot"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Fenêtre du chatbot */}
      {isMounted && isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-96 h-[600px] bg-black/95 backdrop-blur-lg border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* En-tête */}
          <div className="bg-gradient-to-r from-red-600 to-blue-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Assistant digitalpro</h3>
                <p className="text-white/80 text-xs">En ligne</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
              aria-label="Fermer le chatbot"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Zone de messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-900/50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'bot' && (
                  <div className="bg-gradient-to-r from-red-600 to-blue-600 rounded-full p-2 h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white'
                      : 'bg-neutral-800 text-neutral-100 border border-neutral-700'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                </div>
                {message.sender === 'user' && (
                  <div className="bg-neutral-700 rounded-full p-2 h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="bg-gradient-to-r from-red-600 to-blue-600 rounded-full p-2 h-8 w-8 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-neutral-800 text-neutral-100 border border-neutral-700 rounded-2xl px-4 py-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Zone de saisie */}
          <div className="p-4 bg-neutral-900/80 border-t border-neutral-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tapez votre message..."
                className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg px-4 py-2 transition-all"
                aria-label="Envoyer le message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
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

