"use client";

import { useState, useEffect } from "react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showContacts, setShowContacts] = useState(false);

  const botMessages = [
    "Hey there! 👋",
    "I'm Shashank's assistant.",
    "Looking to start a project or have questions?",
    "Feel free to reach out through any of these channels:",
  ];

  const contacts = [
    {
      name: "WhatsApp",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      url: "https://wa.me/971562106197",
    },
    {
      name: "Email",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      url: "mailto:shashank.jamwal24@gmail.com",
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      url: "https://linkedin.com/in/shashank-jamwal-20b7a9188",
    },
    {
      name: "Instagram",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      url: "https://www.instagram.com/shashank.jamwal",
    },
    {
      name: "Facebook",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      url: "https://facebook.com/shashankjamwal",
    },
  ];

  useEffect(() => {
    if (isOpen && currentStep < botMessages.length) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setMessages((prev) => [...prev, { text: botMessages[currentStep], isBot: true }]);
        setIsTyping(false);
        setCurrentStep((prev) => prev + 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    if (currentStep === botMessages.length && !showContacts) {
      const timer = setTimeout(() => {
        setShowContacts(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentStep, showContacts]);

  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      setCurrentStep(0);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentStep(0);
    setShowContacts(false);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={isOpen ? handleClose : handleOpen}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? "bg-zinc-800 rotate-0"
            : "bg-gradient-to-r from-violet-500 to-purple-600 hover:scale-110"
        }`}
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-light">
            SJ
          </div>
          <div className="flex-1">
            <div className="text-white font-normal">Shashank&apos;s Assistant</div>
            <div className="text-white/70 text-xs flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Online
            </div>
          </div>
          <button
            onClick={resetChat}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                  msg.isBot
                    ? "bg-zinc-900 text-zinc-300 rounded-tl-sm"
                    : "bg-violet-500 text-white rounded-tr-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-zinc-900 px-4 py-3 rounded-2xl rounded-tl-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-zinc-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-zinc-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-zinc-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          {/* Contact buttons */}
          {showContacts && (
            <div className="space-y-2 pt-2">
              {contacts.map((contact, i) => (
                <a
                  key={i}
                  href={contact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm transition-all hover:border-violet-500/50 hover:text-white"
                >
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-violet-400">
                    {contact.icon}
                  </div>
                  <span>Connect via {contact.name}</span>
                  <svg className="w-4 h-4 ml-auto text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-zinc-800">
          <div className="text-center text-xs text-zinc-600">
            Choose a platform to connect with me
          </div>
        </div>
      </div>
    </>
  );
}
