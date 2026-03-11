import { useState, FormEvent } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookCallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const timeOptions = ["Morning", "Afternoon", "Evening"];
const categoryOptions = ["SEO", "Content Marketing", "Photography / Videography", "Paid Ads"];

const BookCallModal = ({ open, onOpenChange }: BookCallModalProps) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !date || !time || !category) return;

    const message = encodeURIComponent(
      `Hi, my name is ${name}.\n\nI am interested in your ${category} service.\n\nPreferred call date: ${format(date, "PPP")}\n\nPreferred time: ${time}\n\nCan you confirm availability?`
    );
    window.open(`https://wa.me/919849151536?text=${message}`, "_blank");
    onOpenChange(false);
    setName("");
    setDate(undefined);
    setTime("");
    setCategory("");
  };

  const inputClass =
    "py-3 px-4 rounded-xl border border-input bg-background text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all w-full";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="text-primary font-display text-2xl">Book a Call</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-2">Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-2">Preferred Call Date *</label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    inputClass,
                    "flex items-center justify-between text-left",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date ? format(date, "PPP") : "Pick a date"}
                  <CalendarIcon className="h-4 w-4 opacity-50" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < new Date()}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-2">Preferred Time *</label>
            <select
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={inputClass}
            >
              <option value="">Select time</option>
              {timeOptions.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-2">Query Category *</label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            >
              <option value="">Select category</option>
              {categoryOptions.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="py-3 px-6 rounded-xl gradient-purple text-primary-foreground font-semibold transition-all hover:brightness-110 mt-2"
          >
            Connect on WhatsApp
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookCallModal;
