import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pillars = ["Creative Visuals", "Strategic Thinking", "Data Insights", "Audience Behavior"];

const AboutPage = () => {
  const { isDark, toggle } = useTheme();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero title
      gsap.from(".about-hero-title", { opacity: 0, y: 60, duration: 1, delay: 0.3 });
      gsap.from(".about-hero-sub", { opacity: 0, y: 40, duration: 1, delay: 0.6 });
      gsap.from(".about-scroll-indicator", { opacity: 0, duration: 1, delay: 1.2 });

      // All reveal sections
      gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%", end: "top 50%", scrub: false },
          opacity: 0,
          y: 50,
          duration: 0.8,
        });
      });

      // Staggered lines
      gsap.utils.toArray<HTMLElement>(".reveal-stagger").forEach((group) => {
        const lines = group.querySelectorAll(".stagger-line");
        gsap.from(lines, {
          scrollTrigger: { trigger: group, start: "top 80%" },
          opacity: 0,
          y: 30,
          stagger: 0.15,
          duration: 0.6,
        });
      });

      // Chat bubbles — each reveals individually on scroll
      gsap.utils.toArray<HTMLElement>(".chat-bubble").forEach((bubble) => {
        gsap.from(bubble, {
          scrollTrigger: { trigger: bubble, start: "top 88%" },
          opacity: 0,
          y: 30,
          duration: 0.5,
        });
      });

      // Big insight text
      gsap.from(".insight-text", {
        scrollTrigger: { trigger: ".insight-text", start: "top 80%", end: "top 40%", scrub: true },
        opacity: 0,
        scale: 0.85,
      });

      // Pillar cards
      gsap.set(".pillar-card", { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: ".pillars-grid",
        start: "top 85%",
        onEnter: () => {
          gsap.to(".pillar-card", {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: "power2.out",
          });
        },
        once: true,
      });

      // Ending vision
      gsap.from(".vision-line", {
        scrollTrigger: { trigger: ".vision-section", start: "top 75%" },
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.7,
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative flex flex-col justify-center items-center min-h-screen px-[5vw] grid-bg">
        <h1 className="about-hero-title font-display text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] font-bold leading-[1.15] text-center max-w-[900px]">
          About <span className="text-primary">PixelPulse</span> Media
        </h1>
        <p className="about-hero-sub text-muted-foreground text-lg sm:text-xl mt-6 text-center max-w-[600px]">
          Once upon an idea… PixelPulse was born.
        </p>
        <div className="about-scroll-indicator absolute bottom-[6vh] animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </section>

      {/* ── Story Begins ── */}
      <section className="py-[12vh] px-[5vw]">
        <div className="max-w-[700px] mx-auto space-y-16">
          <div className="reveal-section">
            <p className="text-foreground text-lg sm:text-xl leading-relaxed">
              We're the PixelPulse team — a group of curious creators, marketers, and visual storytellers who noticed something interesting about brands online.
            </p>
          </div>

          <div className="reveal-stagger space-y-3">
            <p className="stagger-line text-foreground text-xl sm:text-2xl font-display font-bold">
              Everyone was creating content.
            </p>
            <p className="stagger-line text-muted-foreground text-xl sm:text-2xl font-display">
              But very few were actually building presence.
            </p>
          </div>

          {/* iMessage-style chat bubbles */}
          <div className="chat-bubbles space-y-5 max-w-[500px]">
            <div className="chat-bubble bg-card border-2 border-foreground dark:border-[#333] rounded-2xl rounded-bl-sm px-5 py-4 shadow-[4px_4px_0_rgba(0,0,0,0.08)] dark:shadow-[4px_4px_0_rgba(0,0,0,0.4)] w-fit max-w-[85%]">
              <p className="text-muted-foreground text-base sm:text-lg">So we decided to look deeper.</p>
            </div>
            <div className="chat-bubble bg-card border-2 border-foreground dark:border-[#333] rounded-2xl rounded-bl-sm px-5 py-4 shadow-[4px_4px_0_rgba(0,0,0,0.08)] dark:shadow-[4px_4px_0_rgba(0,0,0,0.4)] w-fit max-w-[85%]">
              <p className="text-foreground text-lg sm:text-xl font-medium">What makes people stop scrolling?</p>
            </div>
            <div className="chat-bubble bg-card border-2 border-foreground dark:border-[#333] rounded-2xl rounded-bl-sm px-5 py-4 shadow-[4px_4px_0_rgba(0,0,0,0.08)] dark:shadow-[4px_4px_0_rgba(0,0,0,0.4)] w-fit max-w-[85%]">
              <p className="text-foreground text-lg sm:text-xl font-medium">What makes them remember a brand?</p>
            </div>
            <div className="chat-bubble gradient-purple border-2 border-foreground dark:border-[#333] rounded-2xl rounded-bl-sm px-5 py-4 shadow-[6px_6px_0_rgba(0,0,0,0.12)] dark:shadow-[6px_6px_0_rgba(0,0,0,0.6)] w-fit max-w-[85%]">
              <p className="text-primary-foreground text-lg sm:text-xl font-bold">What makes attention turn into growth?</p>
            </div>
          </div>

          <div className="reveal-section">
            <p className="text-primary text-xl sm:text-2xl font-display font-bold">
              That curiosity led to PixelPulse Media.
            </p>
          </div>
        </div>
      </section>

      {/* ── Building ── */}
      <section className="py-[10vh] px-[5vw] bg-section">
        <div className="max-w-[700px] mx-auto space-y-12">
          <div className="reveal-section">
            <p className="text-muted-foreground text-base sm:text-lg italic">
              Fueled by creativity and constant learning
            </p>
            <p className="text-foreground text-2xl sm:text-3xl font-display font-bold mt-2">
              We started building.
            </p>
          </div>

          <div className="reveal-stagger space-y-3">
            <p className="stagger-line text-muted-foreground text-lg">Not just campaigns.</p>
            <p className="stagger-line text-muted-foreground text-lg">Not just posts.</p>
          </div>

          <div className="reveal-section">
            <p className="text-foreground text-lg sm:text-xl leading-relaxed">
              But <span className="font-semibold">visual identity</span>, <span className="font-semibold">digital presence</span>, and <span className="font-semibold">brand momentum</span>.
            </p>
          </div>

          <div className="reveal-section">
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              We explored industries, studied markets, observed audience behavior, and understood one powerful thing:
            </p>
          </div>
        </div>
      </section>

      {/* ── Insight Moment ── */}
      <section className="min-h-[60vh] flex items-center justify-center px-[5vw] grid-bg">
        <h2 className="insight-text font-display text-[2.5rem] sm:text-[4rem] lg:text-[5rem] font-bold text-center text-primary leading-[1.1]">
          Attention drives<br />everything.
        </h2>
      </section>

      {/* ── Brand Philosophy ── */}
      <section className="py-[12vh] px-[5vw]">
        <div className="max-w-[700px] mx-auto space-y-12">
          <div className="reveal-section">
            <p className="text-foreground text-xl sm:text-2xl font-display font-bold">
              But PixelPulse isn't just about marketing.
            </p>
            <p className="text-muted-foreground text-base sm:text-lg mt-4 leading-relaxed">
              It's about understanding the psychology behind why people engage with brands.
            </p>
          </div>

        </div>

        {/* We Combine Grid — matches Plans card styling */}
        <h2 className="text-primary text-[2.5rem] lg:text-[3.5rem] font-bold font-display text-left max-w-[900px] mx-auto mb-[60px] mt-4">
          We combine
        </h2>
        <div className="pillars-grid max-w-[900px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10">
          {pillars.map((title) => (
            <div
              key={title}
              className="pillar-card flex items-center justify-center bg-card p-9 border-2 border-foreground dark:border-[#333] shadow-[8px_8px_0_rgba(0,0,0,0.12)] dark:shadow-[8px_8px_0_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-[6px] hover:shadow-[12px_12px_0_rgba(0,0,0,0.15)] dark:hover:shadow-[12px_12px_0_rgba(0,0,0,0.8)]"
            >
              <h3 className="text-primary text-[1.4rem] font-display font-bold text-center">
                {title}
              </h3>
            </div>
          ))}
        </div>

        <div className="max-w-[700px] mx-auto mt-12 reveal-section">
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            to help brands stand out in a crowded digital world.
          </p>
        </div>
      </section>

      {/* ── Why We Exist ── */}
      <section className="py-[12vh] px-[5vw] bg-section">
        <div className="max-w-[700px] mx-auto space-y-12">
          <div className="reveal-section">
            <p className="text-foreground text-2xl sm:text-3xl font-display font-bold">
              Because every brand has a story.
            </p>
            <p className="text-muted-foreground text-lg mt-3">
              But not every brand knows how to show it.
            </p>
          </div>

          <div className="reveal-section border-l-2 border-primary pl-6">
            <p className="text-foreground text-base sm:text-lg leading-relaxed">
              That's where we come in. PixelPulse helps businesses transform ideas into digital presence — the kind people <span className="font-semibold">notice</span>, <span className="font-semibold">remember</span>, and <span className="font-semibold">trust</span>.
            </p>
          </div>

          <div className="reveal-stagger space-y-3">
            <p className="stagger-line text-muted-foreground text-lg">
              So whether you're starting from zero
            </p>
            <p className="stagger-line text-muted-foreground text-lg">
              Or ready to scale your brand further
            </p>
            <p className="stagger-line text-foreground text-xl font-display font-bold mt-2">
              We're here to help you grow.
            </p>
          </div>
        </div>
      </section>

      {/* ── Ending Vision ── */}
      <section className="vision-section min-h-[50vh] flex flex-col items-center justify-center px-[5vw] grid-bg">
        <p className="vision-line font-display text-2xl sm:text-3xl font-bold text-center">
          Pixel<span className="text-primary">Pulse</span> Media
        </p>
        <div className="vision-line w-16 h-[2px] bg-primary my-6" />
        <p className="vision-line text-muted-foreground text-lg sm:text-xl text-center">
          Turning attention into growth.
        </p>
      </section>

      <Footer />
      <ThemeToggle isDark={isDark} toggle={toggle} />
    </div>
  );
};

export default AboutPage;
