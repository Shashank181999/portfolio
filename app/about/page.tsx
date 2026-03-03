"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Link from "next/link";
import gsap from "gsap";

// Smooth CSS-based scroll reveal
function ScrollReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
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

  return (
    <div
      ref={ref}
      className={`${className} transition-transform duration-700 ease-out ${
        isVisible ? "translate-y-0" : "translate-y-10"
      }`}
    >
      {children}
    </div>
  );
}

export default function About() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if preloader was already shown (navigation vs first load)
    const hasSeenPreloader = sessionStorage.getItem("preloaderShown");
    const preloaderDelay = hasSeenPreloader ? 0.1 : 1.1;

    const ctx = gsap.context(() => {
      // Set initial states immediately to prevent flicker
      gsap.set(".about-badge", { y: 30, opacity: 0 });
      gsap.set(".about-title span", { y: 80, opacity: 0 });
      gsap.set(".about-desc", { y: 40, opacity: 0 });
      gsap.set(".about-cta", { y: 30, opacity: 0 });
      gsap.set(".scene-3d", { scale: 0.8, opacity: 0, rotateY: -20 });
      gsap.set(".monitor", { y: 60, opacity: 0 });
      gsap.set(".code-line", { x: -30, opacity: 0 });
      gsap.set(".info-card", { y: 40, opacity: 0 });

      // Hero animations
      const tl = gsap.timeline({ delay: preloaderDelay });

      tl.to(".about-badge", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      })
      .to(".about-title span", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      }, "-=0.4")
      .to(".about-desc", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      }, "-=0.5")
      .to(".about-cta", {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      }, "-=0.4");

      // 3D Scene animation
      gsap.to(".scene-3d", {
        scale: 1,
        opacity: 1,
        rotateY: 0,
        duration: 1.4,
        delay: preloaderDelay + 0.3,
        ease: "power3.out",
      });

      gsap.to(".monitor", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        delay: preloaderDelay + 0.6,
        ease: "power3.out",
      });

      gsap.to(".code-line", {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        delay: preloaderDelay + 1,
        ease: "power2.out",
      });

      // Info cards with stagger
      gsap.to(".info-card", {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        delay: preloaderDelay + 1.3,
        ease: "power3.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const skills = [
    {
      title: "Frontend Development",
      icon: "🎨",
      color: "from-violet-500/20 to-purple-500/20",
      borderColor: "hover:border-violet-500/50",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    },
    {
      title: "Backend Development",
      icon: "⚙️",
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "hover:border-blue-500/50",
      items: ["Node.js", "Python", "PostgreSQL", "MongoDB", "GraphQL"],
    },
    {
      title: "AI & Automation",
      icon: "🤖",
      color: "from-emerald-500/20 to-green-500/20",
      borderColor: "hover:border-emerald-500/50",
      items: ["OpenAI", "LangChain", "Automation", "Chatbots", "ML"],
    },
    {
      title: "Cloud & DevOps",
      icon: "☁️",
      color: "from-orange-500/20 to-amber-500/20",
      borderColor: "hover:border-orange-500/50",
      items: ["AWS", "Docker", "CI/CD", "Kubernetes", "Vercel"],
    },
  ];

  const experience = [
    {
      period: "2023 - Present",
      role: "Full Stack Developer",
      company: "PDC Consult",
      location: "Dubai, UAE",
      desc: "Building scalable web applications and AI-powered automation solutions. Leading frontend development and implementing modern tech stack.",
      skills: ["React", "Node.js", "AI Automation", "AWS"],
    },
    {
      period: "2020 - 2023",
      role: "Web Developer",
      company: "SofSter",
      location: "India",
      desc: "Developed responsive web applications and collaborated with design teams to create engaging user experiences.",
      skills: ["JavaScript", "React", "CSS", "UI/UX"],
    },
  ];

  const education = {
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science",
    school: "Chandigarh Engineering College",
    location: "Landran, Punjab",
    year: "2020",
  };

  // Code lines for the 3D monitor
  const codeLines = [
    { indent: 0, color: "text-purple-400", text: "const", rest: "developer = {", restColor: "text-zinc-300" },
    { indent: 1, color: "text-blue-400", text: "name:", rest: "'Shashank Jamwal'", restColor: "text-green-400" },
    { indent: 1, color: "text-blue-400", text: "title:", rest: "'Full Stack Dev'", restColor: "text-green-400" },
    { indent: 1, color: "text-blue-400", text: "location:", rest: "'Dubai, UAE'", restColor: "text-green-400" },
    { indent: 1, color: "text-blue-400", text: "skills:", rest: "[...]", restColor: "text-zinc-400" },
    { indent: 1, color: "text-blue-400", text: "available:", rest: "true", restColor: "text-orange-400" },
    { indent: 0, color: "text-zinc-300", text: "};", rest: "", restColor: "" },
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
      name: "Email",
      url: "mailto:shashank.jamwal24@gmail.com",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/971562106197",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
    },
    {
      name: "Phone",
      url: "tel:+971562106197",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
  ];

  return (
    <div ref={pageRef} className="bg-black">
      {/* Hero Section with 3D Scene */}
      <section className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />

        <div className="container-custom px-6 md:px-12 lg:px-20 pt-28 pb-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-7rem)]">

            {/* Left - Content */}
            <div>
              <div className="about-badge inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-zinc-400 mb-8">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                About Me
              </div>

              <h1 className="about-title mb-8">
                <span className="block text-4xl md:text-5xl text-zinc-600 font-light mb-2">Crafting</span>
                <span className="block text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-none">Digital</span>
                <span className="block text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-gradient leading-none">Experiences</span>
              </h1>

              <p className="about-desc text-lg text-zinc-500 max-w-md mb-4 leading-relaxed">
                I&apos;m <span className="text-white font-medium">Shashank Jamwal</span>, a Full Stack Developer & Automation Specialist based in <span className="text-violet-400">Dubai</span>.
              </p>

              <p className="about-desc text-lg text-zinc-500 max-w-md mb-8 leading-relaxed">
                With 4+ years of experience, I build <span className="text-violet-400">Websites, CRM, CMS, Publisher Dashboards</span> & AI solutions with Stripe integration. Custom trading indicators and automation bots that trade by themselves.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link href="/contact" className="about-cta btn-primary group">
                  Get in Touch
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a href="https://linkedin.com/in/shashank-jamwal-20b7a9188" target="_blank" rel="noopener noreferrer" className="about-cta btn-secondary">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target={link.url.startsWith("http") ? "_blank" : undefined}
                    rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="info-card flex items-center gap-3 p-3 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-violet-400 transition-colors">
                      {link.icon}
                    </div>
                    <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right - 3D Coding Scene */}
            <div className="relative flex items-center justify-center">
              <div className="scene-3d relative" style={{ perspective: "1000px" }}>
                <div className="relative" style={{ transformStyle: "preserve-3d", transform: "rotateX(10deg) rotateY(-10deg)" }}>

                  {/* Main Monitor */}
                  <div className="monitor relative w-80 md:w-96 h-52 md:h-60 bg-zinc-900 rounded-xl border border-zinc-700 overflow-hidden" style={{ transform: "translateZ(20px)" }}>
                    <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800 border-b border-zinc-700">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                      <div className="flex-1 text-center text-xs text-zinc-500 font-mono">about.ts</div>
                    </div>

                    <div className="p-4 font-mono text-xs md:text-sm">
                      {codeLines.map((line, i) => (
                        <div key={i} className="code-line flex" style={{ paddingLeft: `${line.indent * 16}px` }}>
                          <span className={line.color}>{line.text}</span>
                          {line.rest && <span className={`${line.restColor} ml-1`}>{line.rest}</span>}
                        </div>
                      ))}
                      <div className="code-line flex items-center mt-2">
                        <span className="text-zinc-500">{">"}</span>
                        <span className="w-2 h-4 bg-violet-500 ml-1 animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Monitor Stand */}
                  <div className="flex justify-center" style={{ transform: "translateZ(10px)" }}>
                    <div className="w-6 h-8 bg-zinc-800 rounded-b-lg" />
                  </div>
                  <div className="flex justify-center" style={{ transform: "translateZ(5px)" }}>
                    <div className="w-24 h-2 bg-zinc-800 rounded-full" />
                  </div>

                  {/* Secondary Monitor */}
                  <div
                    className="monitor absolute -right-12 top-6 w-36 h-24 bg-zinc-900 rounded-lg border border-zinc-700 overflow-hidden opacity-80"
                    style={{ transform: "translateZ(10px) rotateY(25deg)" }}
                  >
                    <div className="flex items-center gap-1.5 px-2 py-1.5 bg-zinc-800 border-b border-zinc-700">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500/60" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                        <div className="w-2 h-2 rounded-full bg-green-500/60" />
                      </div>
                    </div>
                    <div className="p-2 font-mono text-[9px] text-zinc-500">
                      <div className="code-line text-blue-400">$ npm run build</div>
                      <div className="code-line text-green-400">✓ Compiled</div>
                      <div className="code-line text-zinc-400">Ready to deploy</div>
                    </div>
                  </div>

                  {/* Keyboard */}
                  <div
                    className="w-64 h-7 mt-4 mx-auto bg-zinc-800 rounded-lg border border-zinc-700"
                    style={{ transform: "translateZ(0px) rotateX(-30deg)" }}
                  >
                    <div className="flex gap-1 p-1.5 justify-center">
                      {[...Array(10)].map((_, i) => (
                        <div key={i} className="w-4 h-2 bg-zinc-700 rounded-sm" />
                      ))}
                    </div>
                  </div>

                  {/* Coffee */}
                  <div className="absolute -left-10 bottom-6 w-7 h-9 bg-zinc-800 rounded-b-lg border border-zinc-700" style={{ transform: "translateZ(15px)" }}>
                    <div className="absolute -right-2 top-2 w-2.5 h-3 border-2 border-zinc-700 rounded-r-full" />
                  </div>

                  {/* Plant */}
                  <div className="absolute -right-6 bottom-3" style={{ transform: "translateZ(25px)" }}>
                    <div className="w-5 h-7 bg-zinc-800 rounded-lg border border-zinc-700" />
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className="w-1.5 h-3 bg-emerald-600 rounded-full transform -rotate-12" />
                      <div className="w-1.5 h-3 bg-emerald-600 rounded-full transform rotate-12 -mt-1.5 ml-0.5" />
                      <div className="w-1.5 h-4 bg-emerald-500 rounded-full -mt-2" />
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-56 h-3 bg-violet-500/20 blur-xl rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-black border-t border-zinc-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-full text-xs text-zinc-500 uppercase tracking-wider mb-6">Expertise</span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight">
              Skills & <span className="text-gradient">Technologies</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, i) => (
              <ScrollReveal
                key={i}
                className={`skill-card p-6 rounded-3xl bg-gradient-to-br ${skill.color} border border-zinc-800 ${skill.borderColor} transition-all duration-300 group`}
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-900/80 border border-zinc-700 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <h3 className="text-lg font-normal mb-4 text-white">{skill.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, j) => (
                    <span key={j} className="px-2.5 py-1 bg-black/30 border border-zinc-700/50 rounded-lg text-xs text-zinc-300">
                      {item}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-black border-t border-zinc-900">
        <div className="container-custom">
          <div className="mb-16">
            <span className="inline-flex px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-full text-xs text-zinc-500 uppercase tracking-wider mb-6">Career</span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight">
              Work <span className="text-gradient">Experience</span>
            </h2>
          </div>

          <div className="relative max-w-3xl">
            {/* Timeline line */}
            <div className="timeline-line absolute left-0 md:left-[120px] top-0 bottom-0 w-px bg-gradient-to-b from-violet-500 via-purple-500 to-zinc-800" />

            <div className="space-y-8">
              {experience.map((exp, i) => (
                <ScrollReveal key={i} className="exp-card relative pl-8 md:pl-40">
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-[120px] top-2 w-3 h-3 -translate-x-1/2 rounded-full bg-violet-500 border-4 border-black" />

                  {/* Period - desktop */}
                  <div className="hidden md:block absolute left-0 top-0 w-24 text-right">
                    <span className="text-sm text-zinc-600 font-mono">{exp.period}</span>
                  </div>

                  <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-colors">
                    {/* Period - mobile */}
                    <span className="md:hidden text-xs text-zinc-600 font-mono mb-2 block">{exp.period}</span>

                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl font-normal text-white">{exp.role}</h3>
                      <span className="px-2 py-0.5 bg-violet-500/10 border border-violet-500/20 rounded text-xs text-violet-400">{exp.company}</span>
                    </div>
                    <p className="text-sm text-zinc-600 mb-3 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {exp.location}
                    </p>
                    <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{exp.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, j) => (
                        <span key={j} className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-500">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="education-section py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-black border-t border-zinc-900">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div>
              <div className="mb-8">
                <span className="inline-flex px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-full text-xs text-zinc-500 uppercase tracking-wider mb-6">Education</span>
                <h2 className="text-4xl md:text-5xl font-light tracking-tight">
                  Academic <span className="text-gradient">Background</span>
                </h2>
              </div>

              <ScrollReveal className="edu-card p-6 md:p-8 rounded-3xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-zinc-800">
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-2xl md:text-3xl shrink-0">
                    🎓
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-normal text-white mb-1">{education.degree}</h3>
                    <p className="text-violet-400 mb-2">{education.field}</p>
                    <p className="text-zinc-400 mb-1">{education.school}</p>
                    <p className="text-sm text-zinc-600 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {education.location} • {education.year}
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Additional Info */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                  <div className="text-2xl font-bold text-gradient mb-1">B.Tech</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider">Degree</div>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                  <div className="text-2xl font-bold text-gradient mb-1">2020</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider">Graduated</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <ScrollReveal className="relative order-first lg:order-last">
              <div className="relative rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80"
                  alt="College Campus"
                  className="w-full h-[300px] md:h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                      <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white font-medium">Chandigarh Engineering College</div>
                      <div className="text-xs text-zinc-400">Punjab, India</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-black border-t border-zinc-900">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "4+", label: "Years Experience", icon: "⏱️" },
              { value: "50+", label: "Projects Delivered", icon: "🚀" },
              { value: "30+", label: "Happy Clients", icon: "😊" },
              { value: "100%", label: "Dedication", icon: "💯" },
            ].map((stat, i) => (
              <ScrollReveal key={i} className="stat-card p-6 md:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 text-center hover:border-zinc-700 transition-colors group">
                <div className="text-3xl mb-3 group-hover:scale-125 transition-transform">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-xs text-zinc-600 uppercase tracking-wider">{stat.label}</div>
              </ScrollReveal>
            ))}
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
                Ready to <span className="text-gradient">Collaborate?</span>
              </h2>
              <p className="text-zinc-500 mb-10 max-w-md mx-auto">
                Let&apos;s discuss your next project and bring your ideas to life.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="btn-primary group">
                  Start a Project
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a href="https://linkedin.com/in/shashank-jamwal-20b7a9188" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  View LinkedIn
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 md:px-12 lg:px-20 border-t border-zinc-900 bg-black">
        <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold">
            Shashank<span className="text-gradient">.</span>
          </div>
          <div className="text-zinc-600 text-sm">© {new Date().getFullYear()} Shashank Jamwal</div>
          <div className="flex gap-4">
            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : undefined}
                rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
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
