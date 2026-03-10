import { useState, useCallback } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onScrollTo: (id: string) => void;
}

const Navbar = ({ onScrollTo }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = useCallback(
    (id: string) => {
      onScrollTo(id);
      setMobileOpen(false);
    },
    [onScrollTo]
  );

  return (
    <nav className="fixed top-[1.5vh] left-1/2 -translate-x-1/2 w-[90%] max-w-[1200px] flex justify-between items-center py-[1.5vh] px-[2vw] rounded-2xl bg-[hsl(var(--nav-bg))] backdrop-blur-[10px] shadow-[0_6px_20px_rgba(0,0,0,0.08)] z-[1000]">
      <a href="#" className="font-bold text-[1.6rem] font-display">
        Pixel<span className="text-primary">Pulse</span>
      </a>

      <div className="hidden md:flex gap-8 font-normal">
        <button onClick={() => handleNav("services")} className="hover:text-primary transition-colors">
          Services
        </button>
        <button onClick={() => handleNav("plans")} className="hover:text-primary transition-colors">
          Case Studies
        </button>
      </div>

      <button
        onClick={() => handleNav("lead-capture")}
        className="hidden md:block py-[0.8vh] px-[2vw] rounded-xl gradient-purple text-primary-foreground font-semibold transition-all hover:brightness-110"
      >
        Book a Call
      </button>

      <button className="md:hidden text-2xl" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X /> : <Menu />}
      </button>

      {mobileOpen && (
        <div className="absolute top-[8vh] right-[2vw] bg-card p-4 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.1)] flex flex-col gap-3 md:hidden z-50">
          <button onClick={() => handleNav("services")} className="text-left hover:text-primary">
            Services
          </button>
          <button onClick={() => handleNav("plans")} className="text-left hover:text-primary">
            Case Studies
          </button>
          <button
            onClick={() => handleNav("lead-capture")}
            className="py-2 px-4 rounded-xl gradient-purple text-primary-foreground font-semibold"
          >
            Book a Call
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
