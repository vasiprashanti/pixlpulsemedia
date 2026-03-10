import { useEffect, useRef, useState } from "react";
import { services } from "@/data/services";

const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const items = itemRefs.current;
      const offset = window.innerHeight / 3;
      for (let i = items.length - 1; i >= 0; i--) {
        const el = items[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            setActiveIndex(i);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-[120px] px-[5vw] bg-muted">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-10 lg:gap-20 items-start">
        {/* Left sidebar */}
        <div className="md:flex-shrink-0 md:w-[250px] md:sticky md:top-[120px] self-start w-full">
          <h2 className="text-primary text-[2.5rem] lg:text-[2.6rem] mb-4 lg:mb-[30px] font-display font-bold">
            Services
          </h2>
          <ul className="flex md:flex-col gap-5 overflow-x-auto md:overflow-visible whitespace-nowrap md:whitespace-normal scrollbar-none">
            {services.map((s, i) => (
              <li
                key={s.id}
                className={`cursor-pointer font-semibold text-sm md:text-base transition-colors py-1 md:py-[10px] flex-shrink-0 ${
                  i === activeIndex ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => itemRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })}
              >
                {s.shortTitle}
              </li>
            ))}
          </ul>
        </div>

        {/* Right content */}
        <div className="flex-1 min-w-0">
          {services.map((s, i) => (
            <div
              key={s.id}
              ref={(el) => { itemRefs.current[i] = el; }}
              className="min-h-[80vh] md:min-h-[80vh] flex flex-col justify-center mb-[100px] last:mb-0"
            >
              <div className="w-full h-[38vh] md:h-[60vh] rounded-2xl overflow-hidden mb-[30px]">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <h3 className="text-2xl md:text-[28px] font-bold mb-[10px]">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-base md:text-[17px]">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
