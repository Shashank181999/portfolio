"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-black/90 backdrop-blur-xl border-b border-violet-500/50 shadow-lg shadow-violet-500/10" : ""
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
              SJ
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-semibold text-white">Shashank Jamwal</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-5 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                  pathname === link.href
                    ? "text-white bg-white/10"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-violet-500 rounded-full" />
                )}
              </Link>
            ))}
            <a
              href="https://wa.me/971562106197"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-6 py-2.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-medium rounded-full hover:shadow-lg hover:shadow-violet-500/30 hover:scale-105 transition-all duration-300"
            >
              Let&apos;s Talk
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-violet-500/10 hover:bg-violet-500/20 transition-colors"
          >
            <div className="relative w-5 h-4">
              <span
                className={`absolute left-0 h-0.5 w-5 bg-violet-400 rounded-full transition-all duration-300 ${
                  mobileOpen ? "top-[7px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-5 bg-violet-400 rounded-full transition-all duration-300 ${
                  mobileOpen ? "opacity-0 scale-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 bg-violet-400 rounded-full transition-all duration-300 ${
                  mobileOpen ? "top-[7px] -rotate-45" : "top-[14px]"
                }`}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="h-full flex flex-col items-center justify-center gap-6">
          {/* Mobile Logo */}
          <div className="mb-8 flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
              SJ
            </div>
            <span className="text-xl font-semibold text-white">Shashank Jamwal</span>
          </div>

          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-2xl font-light px-8 py-3 rounded-full transition-all duration-300 ${
                pathname === link.href
                  ? "text-white bg-violet-500/20 border border-violet-500/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/971562106197"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 px-10 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-medium rounded-full text-lg"
          >
            Let&apos;s Talk
          </a>
        </div>
      </div>
    </>
  );
}
