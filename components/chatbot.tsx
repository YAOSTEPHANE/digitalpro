"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Bell,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
  id: "1",
  text: "Bonjour ! Je suis l'assistant virtuel de digitalpro solutions. Comment puis-je vous aider aujourd'hui ?",
  sender: "bot",
  timestamp: new Date(),
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !hasShownWelcome) {
      const timer = setTimeout(() => {
        setShowNotification(true);
        setHasShownWelcome(true);

        setTimeout(() => {
          setShowNotification(false);
        }, 5000);
      }, 2400);

      return () => clearTimeout(timer);
    }
  }, [isMounted, hasShownWelcome]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  const sendMessageWithText = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    const currentInput = text;
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const conversationHistory = messages.slice(-5).map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput,
          history: conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur de réponse du serveur");
      }

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || "Désolé, je n'ai pas pu traiter votre demande.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Désolé, une erreur est survenue. Veuillez réessayer dans un instant.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessageWithText(input);
    }
  };

  const resetConversation = () => {
    setMessages([
      {
        ...INITIAL_MESSAGE,
        id: Date.now().toString(),
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <>
      {/* Notification de bienvenue */}
      {isMounted && showNotification && !isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-80 max-w-[calc(100vw-3rem)] rounded-2xl border border-slate-200 bg-white/98 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.14)] backdrop-blur-2xl animate-slide-up">
          <div className="flex items-start gap-3">
            <div className="lux-icon-badge flex-shrink-0 p-2.5 text-[var(--brand-blue)]">
              <Bell className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <h4 className="mb-1 text-sm font-semibold text-slate-900">
                Concierge Digitalpro
              </h4>
              <p className="mb-3 text-xs leading-relaxed text-slate-600">
                Une question sur nos délais, tarifs ou solutions ? Réponse instantanée ici.
              </p>
              <button
                type="button"
                onClick={() => {
                  setShowNotification(false);
                  setIsOpen(true);
                }}
                className="w-full rounded-xl bg-[var(--brand-blue)] px-4 py-2 text-xs font-medium text-white transition hover:bg-[var(--brand-blue-light)]"
              >
                Démarrer la conversation
              </button>
            </div>
            <button
              type="button"
              onClick={() => setShowNotification(false)}
              className="text-slate-400 transition hover:text-slate-900 flex-shrink-0"
              aria-label="Fermer la notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Bouton flottant */}
      {isMounted && !isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-900 shadow-[0_14px_36px_rgba(15,23,42,0.14)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--brand-blue)]"
          aria-label="Ouvrir le chatbot"
        >
          <span className="relative flex items-center justify-center">
            <MessageCircle className="h-5 w-5 text-[var(--brand-blue)] transition-transform duration-300 group-hover:scale-105" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-red)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--brand-red)] ring-2 ring-white" />
            </span>
          </span>
        </button>
      )}

      {/* Fenêtre du chatbot */}
      {isMounted && isOpen && (
        <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:bottom-6 sm:left-6 z-50 flex h-[72vh] max-h-[520px] sm:w-[25rem] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_28px_75px_rgba(15,23,42,0.18)] backdrop-blur-2xl">
          <div className="relative overflow-hidden border-b border-slate-200 bg-slate-50 p-4">
            <div className="relative flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="lux-icon-badge p-2.5">
                  <Bot className="h-5 w-5 text-[var(--brand-blue)]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-wide text-slate-900">
                    Assistant digitalpro
                  </h3>
                  <div className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-600">
                    <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    <span>Conseiller IA en ligne</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="hidden sm:flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] text-slate-600">
                  <ShieldCheck className="h-3 w-3 text-[var(--brand-blue)]" />
                  Sécurisé
                </div>
                <button
                  type="button"
                  onClick={resetConversation}
                  className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-500 transition hover:text-slate-900"
                  aria-label="Réinitialiser la conversation"
                  title="Nouvelle conversation"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-500 transition hover:text-slate-900"
                  aria-label="Fermer le chatbot"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="border-b border-slate-100 bg-white px-3 py-2.5">
            <div className="flex flex-wrap gap-1.5">
              {[
                {
                  label: "Demander un devis",
                  prompt: "Je souhaite un devis personnalisé pour mon projet.",
                },
                {
                  label: "Prendre RDV",
                  prompt: "Je veux prendre un rendez-vous rapide cette semaine.",
                },
                {
                  label: "Audit express",
                  prompt: "Pouvez-vous faire un audit rapide de mon site ?",
                },
              ].map((action) => (
                <button
                  key={action.label}
                  type="button"
                  onClick={() => sendMessageWithText(action.prompt)}
                  disabled={isLoading}
                  className="lux-chip text-[11px] hover:border-[var(--brand-blue)] transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          <div className="custom-scrollbar flex-1 space-y-4 overflow-y-auto bg-[#f4f7fc] p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2.5 ${message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                {message.sender === "bot" && (
                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--brand-blue)] shadow-sm">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${message.sender === "user"
                    ? "bg-[var(--brand-blue)] text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-800 shadow-2xs"
                    }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                </div>
                {message.sender === "user" && (
                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl lux-icon-badge-red p-0">
                    <User className="h-4 w-4 text-[var(--brand-red)]" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--brand-blue)]">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-slate-800">
                  <div className="mb-1 text-[11px] text-slate-500">Rédaction en cours...</div>
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce animate-bounce-delay-0 rounded-full bg-[var(--brand-blue)]" />
                    <span className="h-2 w-2 animate-bounce animate-bounce-delay-140 rounded-full bg-[var(--brand-blue)]" />
                    <span className="h-2 w-2 animate-bounce animate-bounce-delay-280 rounded-full bg-[var(--brand-blue)]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-slate-200 bg-white p-3.5">
            <div className="flex gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Posez votre question..."
                className="flex-1 rounded-xl border border-transparent bg-transparent px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => sendMessageWithText(input)}
                disabled={isLoading || !input.trim()}
                className="rounded-xl bg-[var(--brand-blue)] px-3.5 py-2 text-white transition hover:bg-[var(--brand-blue-light)] disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Envoyer le message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {isMounted && isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-slate-900/35 backdrop-blur-[2px]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
