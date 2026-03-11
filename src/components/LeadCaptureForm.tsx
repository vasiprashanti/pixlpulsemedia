import { useState, FormEvent } from "react";

const budgetOptions = [
  "₹1,000 – ₹5,000",
  "₹5,000 – ₹10,000",
  "₹10,000 – ₹25,000",
  "₹50,000 – ₹1,00,000",
  "₹5,00,000+",
];

const LeadCaptureForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    businessName: "",
    email: "",
    website: "",
    budget: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.businessName) return;
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="lead-capture" className="py-[8vh] px-[5vw] bg-section">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-primary text-[2.5rem] font-bold font-display mb-4">Thank You!</h2>
          <p className="text-muted-foreground text-lg">We'll get back to you shortly.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="lead-capture" className="py-[8vh] px-[5vw] bg-section">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-primary text-[2.5rem] font-bold font-display mb-4">
            Ready to Stop Missing Out on Sales?
          </h2>
          <p className="text-muted-foreground">
            Let's uncover what's holding your marketing back and fix it—so you start seeing real revenue, fast.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card p-8 rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.08)] flex flex-col gap-6"
        >
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-2">Name *</label>
            <input
              type="text"
              required
              maxLength={100}
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="py-3 px-4 rounded-xl border border-input bg-background text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-2">Mobile Number *</label>
            <input
              type="tel"
              required
              maxLength={15}
              value={formData.mobile}
              onChange={(e) => handleChange("mobile", e.target.value)}
              className="py-3 px-4 rounded-xl border border-input bg-background text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-2">Business Name *</label>
            <input
              type="text"
              required
              maxLength={100}
              value={formData.businessName}
              onChange={(e) => handleChange("businessName", e.target.value)}
              className="py-3 px-4 rounded-xl border border-input bg-background text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-2">Business Email (optional)</label>
            <input
              type="email"
              maxLength={255}
              placeholder="you@company.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="py-3 px-4 rounded-xl border border-input bg-background text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-2">Website (optional)</label>
            <input
              type="url"
              maxLength={255}
              value={formData.website}
              onChange={(e) => handleChange("website", e.target.value)}
              className="py-3 px-4 rounded-xl border border-input bg-background text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-2">Monthly marketing budget (INR)</label>
            <select
              value={formData.budget}
              onChange={(e) => handleChange("budget", e.target.value)}
              className="py-3 px-4 rounded-xl border border-input bg-background text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            >
              <option value="">Select a range</option>
              {budgetOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="py-3 px-6 rounded-xl gradient-purple text-primary-foreground font-semibold transition-all hover:brightness-110 disabled:opacity-50 w-full sm:w-auto"
          >
            {loading ? "Sending..." : "Book an Intro Call →"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default LeadCaptureForm;
