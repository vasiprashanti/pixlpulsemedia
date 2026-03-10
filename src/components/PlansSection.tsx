import { plans } from "@/data/plans";

interface PlansSectionProps {
  onScrollTo: (id: string) => void;
}

const PlansSection = ({ onScrollTo }: PlansSectionProps) => {
  return (
    <section id="plans" className="bg-section py-[120px] px-[5vw]">
      <h2 className="text-primary text-[2.5rem] lg:text-[3.5rem] font-bold font-display text-left mb-[60px]">
        Plans
      </h2>
      <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="flex-1 flex flex-col justify-between bg-card p-8 rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
          >
            <div>
              <h3 className="text-primary text-[1.8rem] font-display font-bold mb-4">{plan.name}</h3>
              <p className="text-muted-foreground mb-4">{plan.description}</p>
              <ul className="mb-8">
                {plan.features.map((f, i) => (
                  <li key={i} className="py-2 text-muted-foreground">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => onScrollTo("lead-capture")}
              className="self-start py-3 px-6 rounded-xl gradient-purple text-primary-foreground font-semibold transition-all hover:brightness-110"
            >
              Get Started →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlansSection;
