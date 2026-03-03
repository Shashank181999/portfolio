"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Check if preloader was already shown this session
    const hasSeenPreloader = sessionStorage.getItem("preloaderShown");

    if (hasSeenPreloader) {
      // Skip preloader on navigation
      setIsLoading(false);
      setIsVisible(false);
      return;
    }

    // First visit - show preloader
    setShouldShow(true);
    sessionStorage.setItem("preloaderShown", "true");

    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setIsVisible(false), 400);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible || !shouldShow) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-500 ${
        isLoading ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Logo/Name */}
        <div className="text-4xl font-light tracking-tight">
          <span className="text-white">Shashank</span>
          <span className="text-gradient">.</span>
        </div>

        {/* Loading animation */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>

        {/* Loading bar */}
        <div className="w-48 h-0.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full animate-loading-bar"
          />
        </div>
      </div>
    </div>
  );
}
