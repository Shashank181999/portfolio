"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasSeenPreloader = sessionStorage.getItem("preloaderShown");
    const preloaderDelay = hasSeenPreloader ? 0.1 : 1.1;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(".contact-hero > *", { y: 60, opacity: 0 });
      gsap.set(".contact-card", { y: 30, opacity: 0 });
      gsap.set(".contact-form", { y: 40, opacity: 0 });
      gsap.set(".contact-map", { y: 40, opacity: 0 });

      // Animations
      gsap.to(".contact-hero > *", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        delay: preloaderDelay,
        ease: "power3.out",
      });

      gsap.to(".contact-card", {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        delay: preloaderDelay + 0.3,
        ease: "power3.out",
      });

      gsap.to(".contact-form", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: preloaderDelay + 0.5,
        ease: "power3.out",
      });

      gsap.to(".contact-map", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: preloaderDelay + 0.7,
        ease: "power3.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "cdc2d069-768f-474e-97f9-3197c418ce0a",
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `New Contact Form Message from ${form.name}`,
          from_name: "Portfolio Contact Form",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        alert("Something went wrong. Please try again or contact via WhatsApp.");
        setStatus("idle");
      }
    } catch (error) {
      alert("Something went wrong. Please try again or contact via WhatsApp.");
      setStatus("idle");
    }

    setTimeout(() => setStatus("idle"), 3000);
  };

  const contacts = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: "Email",
      value: "shashank.jamwal24@gmail.com",
      href: "mailto:shashank.jamwal24@gmail.com",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: "Phone",
      value: "+971 56 210 6197",
      href: "tel:+971562106197",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      label: "WhatsApp",
      value: "Chat on WhatsApp",
      href: "https://wa.me/971562106197",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: "Location",
      value: "Barsha Heights, Dubai",
      href: "https://maps.google.com/?q=Barsha+Heights+Dubai",
    },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/shashank-jamwal-20b7a9188",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/shashank.jamwal",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: "https://facebook.com/shashankjamwal",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
  ];

  return (
    <div ref={pageRef} className="bg-black min-h-screen">
      {/* Hero */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 pt-32">
        <div className="container-custom">
          <div className="contact-hero max-w-2xl mb-16">
            <span className="inline-flex px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-full text-xs text-zinc-500 uppercase tracking-wider mb-6">Get in Touch</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-6 tracking-tight">
              <span className="block text-zinc-400">Let&apos;s Start a</span>
              <span className="block font-normal text-gradient">Conversation</span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-500 leading-relaxed">
              Have a project in mind? I&apos;d love to hear from you. Let&apos;s create something amazing together.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
            {contacts.map((contact, i) => (
              <a
                key={i}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="contact-card p-5 md:p-6 bg-zinc-950 border border-zinc-800 rounded-2xl hover:border-violet-500/50 hover:-translate-y-1 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-violet-400 transition-colors">
                    {contact.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-zinc-600 uppercase tracking-wider mb-1">
                      {contact.label}
                    </div>
                    <div className="text-sm text-zinc-300 truncate">{contact.value}</div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Form & Map Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Form */}
            <div className="contact-form">
              <div className="p-6 sm:p-8 md:p-10 bg-zinc-950 border border-zinc-800 rounded-3xl">
                <h2 className="text-xl md:text-2xl font-light mb-8">Send a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                  <div>
                    <label className="block text-sm text-zinc-500 mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:border-violet-500 focus:outline-none transition-colors text-sm md:text-base"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-500 mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:border-violet-500 focus:outline-none transition-colors text-sm md:text-base"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-500 mb-2">Your Message</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:border-violet-500 focus:outline-none transition-colors resize-none text-sm md:text-base"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status !== "idle"}
                    className={`w-full sm:w-auto px-8 py-3 rounded-full font-normal transition-all flex items-center justify-center gap-2 ${
                      status === "sent"
                        ? "bg-emerald-500 text-white"
                        : "bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:scale-105"
                    } disabled:opacity-70`}
                  >
                    {status === "sending" ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : status === "sent" ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Message Sent!
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Map */}
            <div className="contact-map">
              <div className="h-full min-h-[400px] lg:min-h-0 bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden relative">
                {/* Map Header */}
                <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-zinc-950 to-transparent">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                      <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white font-normal">Barsha Heights</div>
                      <div className="text-xs text-zinc-500">Dubai, UAE</div>
                    </div>
                  </div>
                </div>

                {/* Google Map Embed */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14438.470089685857!2d55.17491!3d25.0968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b5402c126e3%3A0xb9511e6655c46d7c!2sBarsha%20Heights%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1709500000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.9) contrast(0.9)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                />

                {/* Map Footer */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-zinc-950 to-transparent">
                  <a
                    href="https://maps.google.com/?q=Barsha+Heights+Dubai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/90 border border-zinc-800 rounded-full text-sm text-zinc-300 hover:text-white hover:border-violet-500/50 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-t border-zinc-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-light mb-4">Connect on Social</h2>
            <p className="text-zinc-500">Follow me for updates and insights</p>
          </div>
          <div className="flex justify-center gap-4">
            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-violet-400 hover:border-violet-500/50 hover:-translate-y-1 transition-all"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 md:px-12 lg:px-20 border-t border-zinc-900">
        <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-light">
            Shashank<span className="text-gradient">.</span>
          </div>
          <div className="text-zinc-600 text-sm">© {new Date().getFullYear()} Shashank Jamwal. All rights reserved</div>
          <div className="flex gap-4">
            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-violet-400 hover:border-zinc-700 transition-all"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
