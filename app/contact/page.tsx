"use client";

import { useState } from "react";
import { Mail, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General enquiry",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="py-20">
      {/* ========================================
          PAGE HERO
          ======================================== */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h1
            className="text-[52px] font-normal text-[var(--color-accent)] mb-4 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Get in touch
          </h1>
          <p className="text-xl text-[var(--color-muted)]">
            Questions about pricing, setup, or a custom quote? We're happy to help.
          </p>
        </div>
      </section>

      {/* ========================================
          TWO-COLUMN LAYOUT
          ======================================== */}
      <section className="bg-[var(--color-surface)] py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* LEFT COLUMN — CONTACT FORM (60%) */}
            <div className="lg:col-span-3">
              {status === "success" ? (
                <div className="bg-[#1c1e21] border border-[#4CAF50] rounded-xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#4CAF50] rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--color-accent)]">
                      Message sent!
                    </h3>
                  </div>
                  <p className="text-[var(--color-muted)]">
                    Thanks — we'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-[var(--color-accent)] mb-2"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1c1e21] border border-[var(--color-border)] rounded-lg text-[var(--color-accent)] focus:outline-none focus:border-[#e8e0d0] transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[var(--color-accent)] mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1c1e21] border border-[var(--color-border)] rounded-lg text-[var(--color-accent)] focus:outline-none focus:border-[#e8e0d0] transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-[var(--color-accent)] mb-2"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1c1e21] border border-[var(--color-border)] rounded-lg text-[var(--color-accent)] focus:outline-none focus:border-[#e8e0d0] transition-colors"
                    >
                      <option>General enquiry</option>
                      <option>Sales / pricing</option>
                      <option>Preconfigured Mac setup</option>
                      <option>Wireless network installation</option>
                      <option>License transfer</option>
                      <option>Technical support</option>
                      <option>Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[var(--color-accent)] mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1c1e21] border border-[var(--color-border)] rounded-lg text-[var(--color-accent)] focus:outline-none focus:border-[#e8e0d0] transition-colors resize-y"
                      placeholder="How can we help you?"
                    />
                  </div>

                  {/* Error State */}
                  {status === "error" && (
                    <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
                      <p className="text-red-400 text-sm">
                        Something went wrong. Please email us directly at{" "}
                        <a
                          href="mailto:support@sagitta.app"
                          className="underline hover:text-red-300"
                        >
                          support@sagitta.app
                        </a>
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full px-6 py-3 bg-[#e8e0d0] text-[#1c1e21] rounded-full font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* RIGHT COLUMN — INFO CARDS (40%) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Card 1 — Email */}
              <div className="bg-[#1c1e21] border border-[var(--color-border)] rounded-xl p-6">
                <div className="w-12 h-12 bg-[#e8e0d0] rounded-full flex items-center justify-center mb-4">
                  <Mail size={24} className="text-[#1c1e21]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-accent)] mb-2">
                  Email
                </h3>
                <a
                  href="mailto:support@sagitta.app"
                  className="text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors block mb-2"
                >
                  support@sagitta.app
                </a>
                <p className="text-sm text-[var(--color-muted)]">
                  We reply within 24 hours on working days
                </p>
              </div>

              {/* Card 2 — Sales */}
              <div className="bg-[#1c1e21] border border-[var(--color-border)] rounded-xl p-6">
                <div className="w-12 h-12 bg-[#e8e0d0] rounded-full flex items-center justify-center mb-4">
                  <Mail size={24} className="text-[#1c1e21]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-accent)] mb-2">
                  Sales
                </h3>
                <a
                  href="mailto:sales@sagitta.app"
                  className="text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors block mb-2"
                >
                  sales@sagitta.app
                </a>
                <p className="text-sm text-[var(--color-muted)]">
                  Pricing, bundles, and preconfigured setups
                </p>
              </div>

              {/* Card 3 — Hours */}
              <div className="bg-[#1c1e21] border border-[var(--color-border)] rounded-xl p-6">
                <div className="w-12 h-12 bg-[#e8e0d0] rounded-full flex items-center justify-center mb-4">
                  <Clock size={24} className="text-[#1c1e21]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-accent)] mb-2">
                  Hours
                </h3>
                <p className="text-[var(--color-muted)] mb-2">Within 24 hours</p>
                <p className="text-sm text-[var(--color-muted)]">
                  Monday – Friday, 9:00 – 18:00 CET
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
