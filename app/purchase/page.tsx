"use client";

import { useState } from "react";
import FAQAccordion from "@/components/FAQAccordion";
import { Check, Download, Laptop, Wifi } from "lucide-react";

const faqs = [
  {
    question: "How many devices can I use my license on?",
    answer:
      "Each license activates on exactly 1 Mac. If you need to run Sagitta on multiple devices, you'll need a separate license for each one.",
  },
  {
    question: "What if I get a new Mac?",
    answer:
      "Contact us at support@sagitta.app with your license key and we'll transfer your activation to the new device. We don't charge for migrations.",
  },
  {
    question: "What's the difference between Lifetime and Yearly?",
    answer:
      "Lifetime is a one-time payment — you own the software forever with all future updates included. Yearly is a lower upfront cost with an annual renewal to keep receiving updates and support.",
  },
  {
    question: "Can I try Sagitta before buying?",
    answer:
      "Yes — every download includes a free 14-day trial with all features unlocked. No credit card required.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes. If Sagitta doesn't work as expected on your system, we offer a full refund within 30 days of purchase.",
  },
  {
    question: "What is the Preconfigured Mac Setup?",
    answer:
      "We supply and configure a Mac Mini with Sagitta pre-installed. You receive a ready-to-use unit — just connect it to your screen and you're live. Contact us for availability and pricing in your region.",
  },
];

export default function PurchasePage() {
  const [isLifetime, setIsLifetime] = useState(true);

  return (
    <div className="py-20">
      {/* ========================================
          SECTION 1 — HERO
          ======================================== */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className="text-[52px] font-normal text-[var(--color-accent)] mb-4 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Simple, honest pricing
          </h1>
          <p className="text-xl text-[var(--color-muted)]">
            One-time or yearly — choose what works for your club. No hidden fees.
          </p>
        </div>
      </section>

      {/* ========================================
          SECTION 2 — LICENSE TOGGLE + PRICING CARDS
          ======================================== */}
      <section className="bg-[var(--color-surface)] py-20">
        <div className="container mx-auto px-6">
          {/* Toggle Switch */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center bg-[#1c1e21] rounded-full p-1 gap-1">
              <button
                onClick={() => setIsLifetime(true)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  isLifetime
                    ? "bg-[#e8e0d0] text-[#1c1e21]"
                    : "text-[var(--color-muted)] hover:text-[var(--color-accent)]"
                }`}
              >
                Lifetime
              </button>
              <button
                onClick={() => setIsLifetime(false)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  !isLifetime
                    ? "bg-[#e8e0d0] text-[#1c1e21]"
                    : "text-[var(--color-muted)] hover:text-[var(--color-accent)]"
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* CARD 1 — Lifetime License */}
            <div className="bg-[#1c1e21] border border-[var(--color-border)] rounded-2xl p-8 relative">
              {isLifetime && (
                <div className="absolute -top-3 left-8">
                  <span className="bg-[#4CAF50] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Best value
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold text-[var(--color-accent)] mb-2">
                Lifetime License
              </h3>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-[var(--color-accent)]">
                    €{isLifetime ? "149" : "49"}
                  </span>
                  <span className="text-[var(--color-muted)]">
                    {isLifetime ? "one-time" : "/ year"}
                  </span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-[var(--color-muted)]">
                  <Check size={20} className="text-[#4CAF50] mt-0.5 flex-shrink-0" />
                  <span>1 license key</span>
                </li>
                <li className="flex items-start gap-3 text-[var(--color-muted)]">
                  <Check size={20} className="text-[#4CAF50] mt-0.5 flex-shrink-0" />
                  <span>1 device only</span>
                </li>
                <li className="flex items-start gap-3 text-[var(--color-muted)]">
                  <Check size={20} className="text-[#4CAF50] mt-0.5 flex-shrink-0" />
                  <span>All core features included</span>
                </li>
                <li className="flex items-start gap-3 text-[var(--color-muted)]">
                  <Check size={20} className="text-[#4CAF50] mt-0.5 flex-shrink-0" />
                  <span>All future updates</span>
                </li>
                <li className="flex items-start gap-3 text-[var(--color-muted)]">
                  <Check size={20} className="text-[#4CAF50] mt-0.5 flex-shrink-0" />
                  <span>Email support</span>
                </li>
                <li className="flex items-start gap-3 text-[var(--color-muted)]">
                  <Check size={20} className="text-[#4CAF50] mt-0.5 flex-shrink-0" />
                  <span>Migrate to new device — contact support</span>
                </li>
              </ul>
              <a
                href="mailto:sales@sagitta.app"
                className="block w-full text-center px-6 py-3 bg-[#e8e0d0] text-[#1c1e21] rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                {isLifetime ? "Buy Lifetime License" : "Buy Yearly License"}
              </a>
            </div>

            {/* CARD 2 — Club Pro */}
            <div className="bg-[#1c1e21] border-2 border-[#e8e0d0] rounded-2xl p-8 relative">
              <div className="absolute -top-3 left-8">
                <span className="bg-[#e8e0d0] text-[#1c1e21] text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-accent)] mb-2">
                Club Pro
              </h3>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-[var(--color-accent)]">
                    €{isLifetime ? "299" : "89"}
                  </span>
                  <span className="text-[var(--color-muted)]">
                    {isLifetime ? "one-time" : "/ year"}
                  </span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-[var(--color-muted)]">
                  <Check size={20} className="text-[#4CAF50] mt-0.5 flex-shrink-0" />
                  <span>1 license key</span>
                </li>
                <li className="flex items-start gap-3 text-[var(--color-muted)]">
                  <Check size={20} className="text-[#4CAF50] mt-0.5 flex-shrink-0" />
                  <span>1 device only</span>
                </li>
                <li className="flex items-start gap-3 text-[var(--color-muted)]">
                  <Check size={20} className="text-[#4CAF50] mt-0.5 flex-shrink-0" />
                  <span>All core features included</span>
                </li>
                <li className="flex items-start gap-3 text-[var(--color-muted)]">
                  <Check size={20} className="text-[#4CAF50] mt-0.5 flex-shrink-0" />
                  <span>All future updates</span>
                </li>
                <li className="flex items-start gap-3 text-[var(--color-muted)]">
                  <Check size={20} className="text-[#4CAF50] mt-0.5 flex-shrink-0" />
                  <span>Priority email support</span>
                </li>
                <li className="flex items-start gap-3 text-[var(--color-muted)]">
                  <Check size={20} className="text-[#4CAF50] mt-0.5 flex-shrink-0" />
                  <span>Migrate to new device — contact support</span>
                </li>
                <li className="flex items-start gap-3 text-[var(--color-muted)]">
                  <Check size={20} className="text-[#4CAF50] mt-0.5 flex-shrink-0" />
                  <span>Onboarding call included</span>
                </li>
              </ul>
              <a
                href="mailto:sales@sagitta.app"
                className="block w-full text-center px-6 py-3 bg-[#e8e0d0] text-[#1c1e21] rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                {isLifetime ? "Buy Club Pro Lifetime" : "Buy Club Pro Yearly"}
              </a>
            </div>
          </div>

          {/* Note below cards */}
          <div className="max-w-5xl mx-auto mt-8">
            <p className="text-sm text-[var(--color-muted)] text-center">
              Each license is tied to a single device. To migrate your license to a new Mac,
              contact support@sagitta.app — we'll handle the transfer.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 3 — SETUP OPTIONS
          ======================================== */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[var(--color-accent)] mb-4">
                How do you want to get started?
              </h2>
              <p className="text-xl text-[var(--color-muted)]">
                Choose the setup that fits your club.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* OPTION 1 — DIY Install */}
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8">
                <div className="w-12 h-12 bg-[#1c1e21] rounded-full flex items-center justify-center mb-4">
                  <Download size={24} className="text-[#e8e0d0]" />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-accent)] mb-3">
                  Download & Install Yourself
                </h3>
                <p className="text-[var(--color-muted)] mb-4">
                  Download Sagitta, install it on your own Mac, and activate your license key.
                  Takes about 5 minutes.
                </p>
                <p className="text-sm font-semibold text-[var(--color-accent)] mb-6">
                  Included with any license
                </p>
                <a
                  href="/download"
                  className="block w-full text-center px-6 py-3 bg-[#e8e0d0] text-[#1c1e21] rounded-full font-medium hover:opacity-90 transition-opacity"
                >
                  Go to Download page
                </a>
              </div>

              {/* OPTION 2 — Preconfigured Mac Setup */}
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 relative">
                <div className="absolute -top-3 left-8">
                  <span className="bg-[#4CAF50] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Plug & play
                  </span>
                </div>
                <div className="w-12 h-12 bg-[#1c1e21] rounded-full flex items-center justify-center mb-4">
                  <Laptop size={24} className="text-[#e8e0d0]" />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-accent)] mb-3">
                  Complete Preconfigured Setup
                </h3>
                <p className="text-[var(--color-muted)] mb-4">
                  We ship you a Mac Mini with Sagitta pre-installed, configured, and ready to
                  plug in. Just connect to your display and you're live.
                </p>
                <p className="text-sm font-semibold text-[var(--color-accent)] mb-6">
                  From €599 (hardware + setup)
                </p>
                <a
                  href="mailto:sales@sagitta.app"
                  className="block w-full text-center px-6 py-3 bg-[#e8e0d0] text-[#1c1e21] rounded-full font-medium hover:opacity-90 transition-opacity"
                >
                  Contact us for a quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 4 — ADD-ONS
          ======================================== */}
      <section className="bg-[var(--color-surface)] py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[var(--color-accent)] mb-4">
                Optional add-ons
              </h2>
              <p className="text-xl text-[var(--color-muted)]">
                Enhance your setup with professional extras.
              </p>
            </div>

            {/* ADD-ON — Wireless Network Setup */}
            <div className="bg-[#1c1e21] border border-[var(--color-border)] rounded-2xl p-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-[#e8e0d0] rounded-full flex items-center justify-center flex-shrink-0">
                  <Wifi size={24} className="text-[#1c1e21]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[var(--color-accent)] mb-3">
                    Wireless Network Installation
                  </h3>
                  <p className="text-[var(--color-muted)] mb-6">
                    We install a dedicated local Wi-Fi network at your ground. Once set up, you
                    can control the scoreboard remotely from any laptop, tablet, or phone
                    connected to the network — from anywhere around the pitch.
                  </p>

                  <div className="mb-6">
                    <p className="text-sm font-semibold text-[var(--color-accent)] mb-3">
                      Includes:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3 text-[var(--color-muted)]">
                        <Check
                          size={20}
                          className="text-[#4CAF50] mt-0.5 flex-shrink-0"
                        />
                        <span>Hardware supplied and installed</span>
                      </li>
                      <li className="flex items-start gap-3 text-[var(--color-muted)]">
                        <Check
                          size={20}
                          className="text-[#4CAF50] mt-0.5 flex-shrink-0"
                        />
                        <span>Network configured for Sagitta remote control</span>
                      </li>
                      <li className="flex items-start gap-3 text-[var(--color-muted)]">
                        <Check
                          size={20}
                          className="text-[#4CAF50] mt-0.5 flex-shrink-0"
                        />
                        <span>Works with any device (phone, tablet, laptop)</span>
                      </li>
                      <li className="flex items-start gap-3 text-[var(--color-muted)]">
                        <Check
                          size={20}
                          className="text-[#4CAF50] mt-0.5 flex-shrink-0"
                        />
                        <span>No internet required — fully local</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <p className="text-sm font-semibold text-[var(--color-accent)]">
                      From €299 — contact us for a site assessment
                    </p>
                    <a
                      href="mailto:sales@sagitta.app"
                      className="px-6 py-3 bg-[#e8e0d0] text-[#1c1e21] rounded-full font-medium hover:opacity-90 transition-opacity"
                    >
                      Contact us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 5 — LICENSE FAQ
          ======================================== */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[var(--color-accent)] mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>
    </div>
  );
}
