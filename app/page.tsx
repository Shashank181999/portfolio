"use client";

import { useEffect, useRef, ReactNode, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Simple CSS-based reveal - smoothest approach
function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (isVisible) return "translate-x-0 translate-y-0 opacity-100";
    switch (direction) {
      case "left":
        return "-translate-x-6 opacity-0";
      case "right":
        return "translate-x-6 opacity-0";
      default:
        return "translate-y-8 opacity-0";
    }
  };

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${getTransform()}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const [heroImageVisible, setHeroImageVisible] = useState(false);

  // Hero image animation on scroll (for mobile)
  useEffect(() => {
    const el = heroImageRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !heroImageVisible) {
          setHeroImageVisible(true);
          gsap.to(".hero-image", {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          });
          gsap.to(".info-card", {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.3,
            ease: "power3.out",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [heroImageVisible]);

  useEffect(() => {
    const animationDelay = 0.1;

    const ctx = gsap.context(() => {
      // Set initial states immediately to prevent flicker
      gsap.set(".hero-badge", { y: 30, opacity: 0 });
      gsap.set(".hero-title", { y: 80, opacity: 0 });
      gsap.set(".hero-desc", { y: 40, opacity: 0 });
      gsap.set(".hero-cta", { y: 30, opacity: 0 });
      gsap.set(".stat-item", { y: 30, opacity: 0 });

      // Only set initial hidden state for hero-image on mobile
      if (window.innerWidth < 1024) {
        gsap.set(".hero-image", { x: 60, opacity: 0 });
        gsap.set(".info-card", { y: 40, opacity: 0 });
      }

      // Hero text animations (always run on load)
      gsap.to(".hero-badge", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: animationDelay,
        ease: "power3.out",
      });

      gsap.to(".hero-title", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        delay: animationDelay + 0.2,
        ease: "power3.out",
      });

      gsap.to(".hero-desc", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: animationDelay + 0.4,
        ease: "power3.out",
      });

      gsap.to(".hero-cta", {
        y: 0,
        opacity: 1,
        duration: 0.7,
        delay: animationDelay + 0.5,
        stagger: 0.15,
        ease: "power2.out",
      });

      gsap.to(".stat-item", {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        delay: animationDelay + 0.7,
        ease: "power3.out",
      });

      // On desktop, info cards still animate but hero image has no animation
      if (window.innerWidth >= 1024) {
        gsap.to(".info-card", {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          delay: animationDelay + 0.8,
          ease: "power3.out",
        });
      }

      // Process line
      gsap.fromTo(".process-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".process-section",
            start: "top 75%",
          },
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      title: "Full Stack Web Development",
      desc: "End-to-end web application development using modern technologies. From responsive frontends with React and Next.js to robust backends with Node.js and Python.",
      features: ["Single Page Applications", "Server-Side Rendering", "RESTful APIs", "Database Design"],
      tags: ["React", "Next.js", "Node.js", "TypeScript"],
    },
    {
      title: "CRM & CMS Development",
      desc: "Custom CRM and CMS solutions tailored to your business needs. Streamline operations, manage customers, and control content with powerful admin dashboards.",
      features: ["Custom CRM Systems", "Content Management", "Admin Dashboards", "User Management"],
      tags: ["React", "Node.js", "PostgreSQL", "Firebase"],
    },
    {
      title: "Trading Bots & Automation",
      desc: "Custom trading bots for Binance and crypto markets. Automated trading strategies, real-time signals, and AI-powered market analysis.",
      features: ["Auto Trading Bots", "Binance Integration", "Trading Signals", "Risk Management"],
      tags: ["Python", "Binance API", "AI/ML", "WebSocket"],
    },
    {
      title: "AI & Workflow Automation",
      desc: "Transform your business with intelligent automation. Custom AI chatbots, workflow automation tools, and smart integrations.",
      features: ["Custom AI Chatbots", "Workflow Automation", "API Integrations", "Data Processing"],
      tags: ["OpenAI", "LangChain", "Python", "Automation"],
    },
  ];

  const projects = [
    {
      logo: "https://pdc-consult.vercel.app/pdc-consult-logo.svg",
      title: "PDC Consult",
      desc: "Corporate website for a leading consultancy firm in Dubai. Features modern design, service showcases, project portfolio, and contact management system.",
      tags: ["Next.js", "Tailwind CSS", "Vercel", "GSAP"],
      category: "Corporate",
      link: "https://pdc-consult.vercel.app",
      hasLogo: true,
    },
    {
      logo: "https://landspot-nextjs.vercel.app/images/logo/landspot_w.svg",
      title: "LandSpot Real Estate",
      desc: "Real estate platform with property listings, advanced search filters, interactive maps, and inquiry management. Built for seamless property discovery.",
      tags: ["Next.js", "TypeScript", "Prisma", "Vercel"],
      category: "Real Estate",
      link: "https://landspot-nextjs.vercel.app",
      hasLogo: true,
    },
    {
      logo: "https://madeinteriorsdemo.web.app/assets/made-CPWcAThC.svg",
      title: "Made Interiors",
      desc: "Interior design portfolio showcasing stunning projects. Features gallery, service details, and client testimonials with elegant animations.",
      tags: ["React", "Firebase", "Tailwind CSS", "GSAP"],
      category: "Portfolio",
      link: "https://madeinteriorsdemo.web.app",
      hasLogo: true,
    },
    {
      logo: "https://marwaabdelaziz-demo.web.app/signature-logo.png",
      title: "Marwa Abdelaziz",
      desc: "Personal brand website with modern aesthetics, smooth animations, and responsive design. Showcases professional work and expertise.",
      tags: ["React", "Firebase", "CSS3", "Animations"],
      category: "Personal Brand",
      link: "https://marwaabdelaziz-demo.web.app",
      hasLogo: true,
    },
  ];

  const techStack = {
    frontend: {
      title: "Frontend",
      icon: "🎨",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion", "HTML5", "CSS3"],
    },
    backend: {
      title: "Backend & APIs",
      icon: "⚙️",
      items: ["Node.js", "Python", "Express", "FastAPI", "REST APIs", "GraphQL", "WebSockets", "JWT Auth"],
    },
    database: {
      title: "Database & BaaS",
      icon: "🗄️",
      items: ["Firebase", "Supabase", "Firestore", "MongoDB", "MySQL", "PostgreSQL"],
    },
    ai: {
      title: "AI & Automation",
      icon: "🤖",
      items: ["OpenAI API", "LangChain", "ChatGPT", "Trading Bots", "Web Scraping", "Automation Scripts"],
    },
    cloud: {
      title: "Cloud & DevOps",
      icon: "☁️",
      items: ["AWS", "Google Cloud", "Vercel", "Netlify", "Docker", "GitHub Actions", "CI/CD"],
    },
    tools: {
      title: "Tools & Platforms",
      icon: "🛠️",
      items: ["Git", "GitHub", "Figma", "VS Code", "Postman", "Binance API", "Stripe", "PayPal"],
    },
  };

  const process = [
    {
      step: "01",
      title: "Discovery",
      desc: "Understanding your goals, requirements, and target audience",
      icon: "🔍",
    },
    {
      step: "02",
      title: "Planning",
      desc: "Creating roadmap, architecture, and technical specifications",
      icon: "📋",
    },
    {
      step: "03",
      title: "Development",
      desc: "Building your solution with clean, maintainable code",
      icon: "💻",
    },
    {
      step: "04",
      title: "Testing",
      desc: "Rigorous testing to ensure quality and reliability",
      icon: "🧪",
    },
    {
      step: "05",
      title: "Deployment",
      desc: "Launching your project with monitoring and support",
      icon: "🚀",
    },
  ];

  const contactInfo = [
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
      value: "Chat Now",
      href: "https://wa.me/971562106197",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      label: "LinkedIn",
      value: "Connect",
      href: "https://linkedin.com/in/shashank-jamwal-20b7a9188",
    },
  ];

  return (
    <div ref={heroRef} className="bg-black">
      {/* Hero Section */}
      <section className="min-h-screen relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />

        <div className="container-custom px-6 md:px-12 lg:px-20 pt-28 pb-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-7rem)]">

            {/* Left - Content */}
            <div>
              <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-zinc-400 mb-8">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Available for Projects
              </div>

              <h1 className="mb-8">
                <span className="hero-title block text-4xl md:text-5xl text-zinc-600 font-light mb-2">Hi, I&apos;m</span>
                <span className="hero-title block text-6xl md:text-7xl lg:text-8xl font-light text-white leading-none tracking-tight">Shashank</span>
                <span className="hero-title block text-6xl md:text-7xl lg:text-8xl font-light text-gradient leading-none tracking-tight">Jamwal</span>
              </h1>

              <p className="hero-desc text-lg text-zinc-500 max-w-md mb-10 leading-relaxed">
                Full Stack Developer & Automation Specialist based in <span className="text-violet-400">Dubai</span>. Building Websites, CRM, CMS, Publisher Dashboards & AI solutions with Stripe integration. Custom trading indicators and automation bots that trade by themselves.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link href="/contact" className="hero-cta btn-primary group">
                  Start a Project
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/about" className="hero-cta btn-secondary">
                  About Me
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-10 pt-8 border-t border-zinc-900">
                {[
                  { value: "4+", label: "Years Exp." },
                  { value: "50+", label: "Projects" },
                  { value: "30+", label: "Clients" },
                ].map((stat, i) => (
                  <div key={i} className="stat-item">
                    <div className="text-3xl md:text-4xl font-light text-gradient">{stat.value}</div>
                    <div className="text-xs text-zinc-600 uppercase tracking-wider mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Profile Image */}
            <div className="relative">
              <div ref={heroImageRef} className="hero-image relative w-full max-w-md mx-auto">
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950">
                  <Image
                    src="/profile.jpeg"
                    alt="Shashank Jamwal"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 bg-black/60 backdrop-blur-sm border border-zinc-800 rounded-full">
                    <span className="text-base">🇦🇪</span>
                    <span className="text-xs text-white font-medium">Dubai</span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-xl font-normal text-white mb-1">Shashank Jamwal</div>
                    <div className="text-sm text-zinc-400">Full Stack Developer & AI Specialist</div>
                  </div>
                </div>
              </div>

              {/* Contact Cards Grid */}
              <div className="grid grid-cols-2 gap-3 mt-4 max-w-md mx-auto">
                {contactInfo.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="info-card flex items-center gap-3 p-4 bg-zinc-950 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-violet-400 transition-colors">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-zinc-600 uppercase tracking-wider">{item.label}</div>
                      <div className="text-sm text-zinc-300 truncate">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section relative py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t border-zinc-900 overflow-hidden bg-black">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src="/videos/circuit-bg.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/75 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-violet-950/30 via-transparent to-purple-950/30 z-[1]" />

        <div className="container-custom relative z-[2]">
          <div className="text-center mb-16">
            <span className="inline-flex px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full text-xs text-violet-400 uppercase tracking-wider mb-6">Services</span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
              What I <span className="text-gradient">Do</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Comprehensive development services to bring your ideas to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <ScrollReveal
                key={i}
                delay={i * 0.1}
                direction={i % 2 === 0 ? "left" : "right"}
                className="service-card group relative p-8 rounded-3xl bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                {/* Background glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  {/* Number indicator */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 text-sm font-mono">
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* Content */}
                  <div className="pt-6">
                    <h3 className="text-xl font-normal mb-3 text-white group-hover:text-violet-400 transition-colors">{service.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{service.desc}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="relative grid grid-cols-2 gap-x-4 gap-y-2 mt-6 pt-6 border-t border-zinc-800/50">
                  {service.features.map((feature, j) => (
                    <div key={j} className="feature-item flex items-center gap-2 text-sm text-zinc-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="relative flex flex-wrap gap-2 mt-5">
                  {service.tags.map((tag, j) => (
                    <span key={j} className="service-tag px-3 py-1.5 bg-black/50 backdrop-blur-sm border border-zinc-700/50 rounded-full text-xs text-zinc-300 group-hover:border-violet-500/30 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-black border-t border-zinc-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-full text-xs text-zinc-500 uppercase tracking-wider mb-6">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              A selection of projects showcasing my expertise in full-stack development, AI integration, and automation solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <ScrollReveal
                key={i}
                delay={i * 0.1}
                direction={i % 2 === 0 ? "left" : "right"}
                className="project-card group rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 overflow-hidden transition-all duration-300 hover:-translate-y-2"
              >
                <div className="h-56 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 flex items-center justify-center relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                      backgroundSize: '20px 20px'
                    }} />
                  </div>
                  {/* Logo Container */}
                  <div className="relative z-10 p-6 group-hover:scale-110 transition-transform duration-500">
                    {project.hasLogo ? (
                      <img
                        src={project.logo}
                        alt={project.title}
                        className="h-16 md:h-20 w-auto max-w-[200px] object-contain filter drop-shadow-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                          <span className="text-white text-2xl font-bold">MI</span>
                        </div>
                        <span className="text-white text-lg font-light tracking-widest uppercase">Made Interiors</span>
                      </div>
                    )}
                  </div>
                  {/* Number Badge */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/80 backdrop-blur-sm border border-zinc-700 flex items-center justify-center text-sm text-zinc-400 font-mono">
                    0{i + 1}
                  </div>
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 px-4 py-2 bg-violet-500/20 backdrop-blur-sm border border-violet-500/30 rounded-full text-xs text-violet-400 font-medium">
                    {project.category}
                  </div>
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-3 text-white group-hover:text-violet-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-sm mb-5 leading-relaxed">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, j) => (
                      <span key={j} className="px-3 py-1.5 bg-zinc-900/80 border border-zinc-700/50 rounded-lg text-xs text-zinc-400 hover:border-violet-500/30 hover:text-violet-400 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-5 py-2.5 bg-violet-500/10 border border-violet-500/30 rounded-full text-sm text-violet-400 hover:bg-violet-500/20 hover:border-violet-500/50 transition-all"
                  >
                    <span>View Live</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Marketing Section */}
      <section
        className="marketing-section relative py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t border-zinc-900 overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-violet-950/30 via-transparent to-purple-950/30 z-[1]" />

        <div className="container-custom relative z-[2]">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <ScrollReveal direction="left" className="marketing-content">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/20 border border-violet-500/30 rounded-full text-xs text-violet-300 uppercase tracking-wider mb-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Digital Marketing
              </span>

              <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-white">
                SEO Expert & <span className="text-gradient">Meta Ads</span> Specialist
              </h2>

              <p className="text-zinc-300 text-lg mb-8 leading-relaxed">
                As a developer who understands both code and marketing, I bring a unique perspective to digital advertising.
                I know exactly how to optimize your ad spend and maximize ROI with data-driven strategies.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: "🔍", title: "SEO Optimization", desc: "On-page & technical SEO to boost organic rankings" },
                  { icon: "📱", title: "Meta Ads", desc: "Facebook & Instagram campaigns with precise targeting" },
                  { icon: "💰", title: "Cost Optimization", desc: "Developer insight on reducing ad spend wastage" },
                  { icon: "📊", title: "Analytics & ROI", desc: "Data-driven decisions for maximum returns" },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl hover:border-violet-500/40 transition-colors group">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-normal mb-1">{item.title}</h3>
                        <p className="text-zinc-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/contact" className="btn-primary group">
                Boost Your Marketing
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </ScrollReveal>

            {/* Right - Stats/Features */}
            <ScrollReveal direction="right" className="marketing-stats">
              <div className="relative p-8 md:p-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-3xl">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-violet-500/30 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/30 rounded-full blur-2xl" />

                <div className="relative">
                  <h3 className="text-2xl font-light mb-8 text-center text-white">Why Developer + Marketer?</h3>

                  <div className="space-y-6">
                    {[
                      {
                        title: "Technical SEO Mastery",
                        desc: "I understand website architecture, page speed optimization, schema markup, and Core Web Vitals from a developer's perspective.",
                        icon: (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                        )
                      },
                      {
                        title: "Smart Ad Spend",
                        desc: "Knowing how pixels, tracking, and attribution work means I can set up campaigns that actually measure what matters.",
                        icon: (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )
                      },
                      {
                        title: "Conversion Optimization",
                        desc: "I build landing pages that convert, with A/B testing, fast load times, and optimized user journeys.",
                        icon: (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="text-white font-normal mb-1">{item.title}</h4>
                          <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
                    {[
                      { value: "150%", label: "Avg ROI Increase" },
                      { value: "40%", label: "Cost Reduction" },
                      { value: "2x", label: "Traffic Growth" },
                    ].map((stat, i) => (
                      <div key={i} className="text-center">
                        <div className="text-2xl md:text-3xl font-light text-gradient">{stat.value}</div>
                        <div className="text-xs text-zinc-400 mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Trading Experience Section */}
      <section className="products-section relative py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t border-zinc-900 overflow-hidden bg-black">
        <div className="container-custom relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-xs text-emerald-400 uppercase tracking-wider mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Trading Resources
            </span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
              Ebooks & <span className="text-gradient">Trading Tools</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
              Premium trading resources and custom-built indicators for Binance markets.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Ebook Card */}
            <ScrollReveal direction="left" className="group relative rounded-3xl overflow-hidden">
              {/* Background Image - Inspirational/Life */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />

              <div className="relative p-6 md:p-10 min-h-[540px] md:min-h-[480px] flex flex-col justify-end">
                {/* Badge */}
                <span className="absolute top-6 left-6 px-4 py-2 bg-violet-500/90 rounded-full text-xs text-white font-semibold uppercase tracking-wider">
                  Ebook
                </span>

                {/* Content */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-medium text-white mb-2">
                    70 Ways to Live Your Dream Life
                  </h3>
                  <p className="text-violet-300 text-sm mb-4">Transformational Guide</p>

                  <p className="text-zinc-300 mb-6 leading-relaxed">
                    Discover 70 powerful strategies to transform your life and achieve your dreams. A comprehensive guide to personal growth, mindset shifts, and creating the life you deserve.
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {["Personal Growth", "Mindset", "Goal Setting", "Life Design"].map((item, i) => (
                      <span key={i} className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs text-zinc-200 border border-white/10">
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <a href="https://e-bookdemo.web.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-full transition-all duration-300 group-hover:shadow-lg group-hover:shadow-violet-500/30">
                    <span>Get the Ebook</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Trading Indicators Card - My Creation */}
            <ScrollReveal direction="right" className="group relative rounded-3xl overflow-hidden">
              {/* Background Image - Trading Chart */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />

              <div className="relative p-6 md:p-10 min-h-[540px] md:min-h-[480px] flex flex-col justify-end">
                {/* Badge */}
                <div className="absolute top-6 left-6 flex flex-wrap items-center gap-2">
                  <span className="px-4 py-2 bg-violet-500/90 rounded-full text-xs text-white font-semibold uppercase tracking-wider">
                    My Creation
                  </span>
                  <span className="px-3 py-2 bg-white/90 rounded-full text-xs text-black font-bold flex items-center gap-1">
                    Binance
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-medium text-white mb-2">
                    Custom Binance Indicators
                  </h3>
                  <p className="text-violet-300 text-sm mb-4">Trading Tools</p>

                  <p className="text-zinc-300 mb-6 leading-relaxed">
                    Built by me for serious traders. Real-time signals, trend detection, and automated alerts designed specifically for Binance futures and spot markets.
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {["Real-time Signals", "Trend Detection", "Support/Resistance", "Auto Alerts"].map((item, i) => (
                      <span key={i} className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs text-zinc-200 border border-white/10">
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <a href="https://indicator-sniper.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-full transition-all duration-300 group-hover:shadow-lg group-hover:shadow-violet-500/30">
                    <span>View Indicators</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="tech-section py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-black border-t border-zinc-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-full text-xs text-zinc-500 uppercase tracking-wider mb-6">Tech Stack</span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
              Technologies I <span className="text-gradient">Use</span>
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              A comprehensive toolkit of modern technologies to build fast, scalable, and intelligent applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(techStack).map((category, i) => (
              <ScrollReveal
                key={i}
                delay={i * 0.1}
                className="tech-category p-6 rounded-3xl bg-zinc-950 border border-zinc-800"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xl">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-normal text-white">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item, j) => (
                    <span
                      key={j}
                      className="tech-item px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-zinc-400 hover:border-violet-500/50 hover:text-violet-400 transition-all duration-200 cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-black border-t border-zinc-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-full text-xs text-zinc-500 uppercase tracking-wider mb-6">Process</span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
              How I <span className="text-gradient">Work</span>
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              A structured approach to deliver high-quality solutions on time and within budget.
            </p>
          </div>

          <div className="relative">
            {/* Connection line - desktop */}
            <div className="process-line hidden md:block absolute top-16 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

            <div className="grid md:grid-cols-5 gap-6">
              {process.map((step, i) => (
                <ScrollReveal
                  key={i}
                  delay={i * 0.1}
                  className="process-step text-center"
                >
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 text-2xl mb-4 mx-auto">
                    {step.icon}
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-violet-500 text-white text-xs font-bold flex items-center justify-center">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-normal text-white mb-2">{step.title}</h3>
                  <p className="text-zinc-500 text-sm">{step.desc}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-black border-t border-zinc-900">
        <div className="container-custom">
          <ScrollReveal className="cta-content p-12 md:p-20 rounded-3xl bg-zinc-950 border border-zinc-800 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="relative">
              <span className="inline-flex px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-500 uppercase tracking-wider mb-8">Let&apos;s Connect</span>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
                Ready to Start Your<br /><span className="text-gradient">Next Project?</span>
              </h2>
              <p className="text-zinc-500 mb-10 max-w-lg mx-auto">
                Whether you need a web application, AI automation, or a complete digital solution, I&apos;m here to help bring your vision to life.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="btn-primary group">
                  Get in Touch
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a href="https://wa.me/971562106197" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 md:px-12 lg:px-20 border-t border-zinc-900 bg-black">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-xl font-normal">
              Shashank<span className="text-gradient">.</span>
            </div>
            <div className="text-zinc-600 text-sm">
              © {new Date().getFullYear()} Shashank Jamwal. All rights reserved.
            </div>
            <div className="flex gap-4">
              {contactInfo.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-violet-400 hover:border-zinc-700 transition-all"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
