import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/data/processSteps";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProcessSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".step-card-el");

      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 70%",
          onEnter: () => setActiveStep(i),
          onLeaveBack: () => setActiveStep(Math.max(0, i - 1)),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const fillPercent = ((activeStep + 1) / processSteps.length) * 100;

  return (
    <section id="process" ref={sectionRef} className="py-[8vh] px-[5vw] bg-section relative">
      <h2 className="text-primary text-[2.5rem] font-bold font-display mb-6">Process</h2>
      <p className="text-muted-foreground max-w-[600px] mb-12">
        A structured approach to building effective marketing systems.
      </p>

      <div className="relative w-full">
        {/* Lines - desktop only */}
        <div className="hidden sm:block absolute top-1/2 w-full h-1 rounded bg-border -translate-y-1/2 z-0" />
        <div
          className="hidden sm:block absolute top-1/2 h-1 rounded bg-primary -translate-y-1/2 z-0 transition-all duration-300"
          style={{ width: `${fillPercent}%` }}
        />

        <div className="flex flex-col sm:flex-row justify-between gap-8 relative z-10">
          {processSteps.map((step, i) => (
            <div
              key={step.number}
              className={`step-card-el flex-1 bg-card rounded-2xl p-8 shadow-[0_6px_20px_rgba(0,0,0,0.08)] text-left transition-all duration-300 ${
                i <= activeStep
                  ? "opacity-100 sm:-translate-y-[5px] shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
                  : "opacity-40 grayscale-[80%]"
              }`}
            >
              <div className="text-primary text-[2.5rem] font-bold mb-3">{step.number}</div>
              <div className="text-lg font-semibold mb-2">{step.title}</div>
              <div className="text-muted-foreground text-[0.95rem] leading-relaxed">{step.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
