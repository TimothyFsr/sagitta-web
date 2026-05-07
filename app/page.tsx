import Link from "next/link";
import { Download, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import FeatureCard from "@/components/FeatureCard";
import PricingCard from "@/components/PricingCard";
import TestimonialCard from "@/components/TestimonialCard";
import StepCard from "@/components/StepCard";
import { FEATURES, PRICING_TIERS, TESTIMONIALS, STEPS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Professional football scoreboard software for macOS. Trusted by clubs across Italy. Live scoreboard, team logos, match events, and more.",
};

export default function Home() {
  return (
    <>
      {/* ========================================
          SECTION 1 — HERO
          ======================================== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#1c1e21] px-6 py-32">
        {/* Subtle spotlight glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[800px] bg-white opacity-[0.04] rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)] mb-6">
            Scoreboard Software for Football Clubs
          </p>

          {/* Headline */}
          <h1 className="hero-title text-[42px] md:text-[72px] font-normal text-[var(--color-accent)] mb-6 leading-[1.1]">
            Your match, displayed perfectly.
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-[18px] text-[var(--color-muted)] mb-12 max-w-2xl mx-auto leading-relaxed">
            Sagitta is a professional scoreboard app for macOS. Built for club managers, broadcasters, and stadium operators.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              href="/download"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#e8e0d0] text-[#1c1e21] rounded-full font-semibold text-base hover:opacity-90 transition-opacity"
            >
              <Download size={20} />
              Download for Mac
            </Link>
            <Link
              href="/purchase"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-base hover:bg-white hover:text-[#1c1e21] transition-all"
            >
              View Pricing
            </Link>
          </div>

          {/* Badge */}
          <p className="text-sm text-[var(--color-muted)]">
            macOS 13+ required · Free 14-day trial
          </p>
        </div>

        {/* Screenshot Placeholder */}
        <div className="relative z-10 mt-20 w-full max-w-5xl mx-auto">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-16 text-center">
            <p className="text-[var(--color-muted)] text-lg">App screenshot goes here</p>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 2 — SOCIAL PROOF / REFERENCES
          ======================================== */}
      <section className="py-24 bg-[var(--color-bg)]">
        <div className="container mx-auto px-6">
          {/* Section Title */}
          <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)] text-center mb-12">
            Trusted by Clubs Across Italy
          </p>

          {/* Club Logos - Horizontal Scroll */}
          <div className="flex gap-6 overflow-x-auto pb-6 mb-16 scrollbar-hide justify-center flex-wrap">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[120px] h-[60px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg flex items-center justify-center"
              >
                <span className="text-xs text-[var(--color-muted)]">Club Logo</span>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                club={testimonial.club}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 3 — FEATURES
          ======================================== */}
      <section className="py-24 bg-[var(--color-surface)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-accent)] mb-4">
              Everything you need to run a professional scoreboard
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {FEATURES.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 4 — HOW IT WORKS
          ======================================== */}
      <section className="py-24 bg-[var(--color-bg)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-accent)] mb-4">
              Up and running in 3 steps
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 max-w-6xl mx-auto">
            {STEPS.map((step, index) => (
              <StepCard
                key={index}
                number={step.number}
                title={step.title}
                description={step.description}
                showConnector={index < STEPS.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 5 — PRICING TEASER
          ======================================== */}
      <section className="py-24 bg-[var(--color-surface)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-accent)] mb-4">
              Simple, transparent pricing
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {PRICING_TIERS.map((tier, index) => (
              <PricingCard
                key={index}
                name={tier.name}
                price={tier.price}
                description={tier.description}
                features={tier.features.map(f => ({ text: f, included: true }))}
                cta={tier.cta}
                ctaLink="/purchase"
                popular={tier.popular}
              />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/purchase"
              className="inline-flex items-center gap-2 text-[var(--color-cta)] hover:text-[var(--color-accent)] transition-colors font-medium"
            >
              See full pricing
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 6 — CTA BANNER
          ======================================== */}
      <section className="py-24 bg-[#242628]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-accent)] mb-4">
            Ready to take your scoreboard pro?
          </h2>
          <p className="text-lg text-[var(--color-muted)] mb-8 max-w-2xl mx-auto">
            Try Sagitta free for 14 days. No credit card required.
          </p>
          <Link
            href="/download"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#e8e0d0] text-[#1c1e21] rounded-full font-semibold text-base hover:opacity-90 transition-opacity"
          >
            <Download size={20} />
            Download for Mac
          </Link>
        </div>
      </section>
    </>
  );
}
