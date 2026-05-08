import Link from "next/link";
import Image from "next/image";
import { Download, ArrowRight, Wifi } from "lucide-react";
import { Metadata } from "next";
import FeatureCard from "@/components/FeatureCard";
import PricingCard from "@/components/PricingCard";
import TestimonialCard from "@/components/TestimonialCard";
import StepCard from "@/components/StepCard";
import iPhoneMockup from "@/components/iPhoneMockup";
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

        {/* Screenshot */}
        <div className="relative z-10 mt-20 w-full max-w-6xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-2xl">
            <Image
              src="/screenshot-scoreboard.png"
              alt="Sagitta Football Scoreboard in action"
              width={1920}
              height={1080}
              quality={90}
              className="w-full h-auto"
              priority
            />
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
              Built for professional football clubs
            </h2>
            <p className="text-lg text-[var(--color-muted)] mt-4">
              Everything you need to run a world-class matchday presentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* FEATURE 1 — Fully Customizable */}
            <div className="bg-[#1c1e21] border border-[var(--color-border)] rounded-xl p-6 transition-all hover:border-[var(--color-accent)] hover:-translate-y-1">
              <svg className="w-7 h-7 mb-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="21" x2="4" y2="14" />
                <line x1="4" y1="10" x2="4" y2="3" />
                <line x1="12" y1="21" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12" y2="3" />
                <line x1="20" y1="21" x2="20" y2="16" />
                <line x1="20" y1="12" x2="20" y2="3" />
                <line x1="1" y1="14" x2="7" y2="14" />
                <line x1="9" y1="8" x2="15" y2="8" />
                <line x1="17" y1="16" x2="23" y2="16" />
              </svg>
              <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-2">
                Fully Customizable
              </h3>
              <p className="text-[var(--color-muted)]">
                Adjust layouts, colors, fonts, and every visual element to match your club's identity perfectly.
              </p>
            </div>

            {/* FEATURE 2 — Team Logos */}
            <div className="bg-[#1c1e21] border border-[var(--color-border)] rounded-xl p-6 transition-all hover:border-[var(--color-accent)] hover:-translate-y-1">
              <svg className="w-7 h-7 mb-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-2">
                Team Logos
              </h3>
              <p className="text-[var(--color-muted)]">
                Display home and away crests on the scoreboard. Supports PNG and SVG with transparent backgrounds.
              </p>
            </div>

            {/* FEATURE 3 — Goal Animations */}
            <div className="bg-[#1c1e21] border border-[var(--color-border)] rounded-xl p-6 transition-all hover:border-[var(--color-accent)] hover:-translate-y-1">
              <svg className="w-7 h-7 mb-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-2">
                Goal Animations
              </h3>
              <p className="text-[var(--color-muted)]">
                Trigger a full-screen goal celebration animation the moment the net hits — with sound support.
              </p>
            </div>

            {/* FEATURE 4 — Card Animations */}
            <div className="bg-[#1c1e21] border border-[var(--color-border)] rounded-xl p-6 transition-all hover:border-[var(--color-accent)] hover:-translate-y-1">
              <svg className="w-7 h-7 mb-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
              </svg>
              <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-2">
                Yellow & Red Card Animations
              </h3>
              <p className="text-[var(--color-muted)]">
                Show yellow and red card overlays instantly when a disciplinary event happens.
              </p>
            </div>

            {/* FEATURE 5 — Substitution Animations */}
            <div className="bg-[#1c1e21] border border-[var(--color-border)] rounded-xl p-6 transition-all hover:border-[var(--color-accent)] hover:-translate-y-1">
              <svg className="w-7 h-7 mb-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="17 1 21 5 17 9" />
                <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                <polyline points="7 23 3 19 7 15" />
                <path d="M21 13v2a4 4 0 0 1-4 4H3" />
              </svg>
              <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-2">
                Substitution Animations
              </h3>
              <p className="text-[var(--color-muted)]">
                Display clean player-change graphics — basic name banners or full player photo cards if images are available.
              </p>
            </div>

            {/* FEATURE 6 — Sponsor Ticker */}
            <div className="bg-[#1c1e21] border border-[var(--color-border)] rounded-xl p-6 transition-all hover:border-[var(--color-accent)] hover:-translate-y-1">
              <svg className="w-7 h-7 mb-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                <line x1="7" y1="2" x2="7" y2="22" />
                <line x1="17" y1="2" x2="17" y2="22" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <line x1="2" y1="7" x2="7" y2="7" />
                <line x1="2" y1="17" x2="7" y2="17" />
                <line x1="17" y1="17" x2="22" y2="17" />
                <line x1="17" y1="7" x2="22" y2="7" />
              </svg>
              <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-2">
                Sponsor Ticker
              </h3>
              <p className="text-[var(--color-muted)]">
                A persistent banner cycling through sponsor images and short video clips — always visible during the match.
              </p>
            </div>

            {/* FEATURE 7 — Sponsor Loop */}
            <div className="bg-[#1c1e21] border border-[var(--color-border)] rounded-xl p-6 transition-all hover:border-[var(--color-accent)] hover:-translate-y-1">
              <svg className="w-7 h-7 mb-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-2">
                Sponsor Loop
              </h3>
              <p className="text-[var(--color-muted)]">
                A full-screen playlist of sponsor content. Play it before kick-off, during half-time, or after the final whistle.
              </p>
            </div>

            {/* FEATURE 8 — Layout Presets */}
            <div className="bg-[#1c1e21] border border-[var(--color-border)] rounded-xl p-6 transition-all hover:border-[var(--color-accent)] hover:-translate-y-1">
              <svg className="w-7 h-7 mb-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-2">
                Layout Presets
              </h3>
              <p className="text-[var(--color-muted)]">
                Save and switch between different scoreboard layouts in seconds. Perfect for different competitions or venues.
              </p>
            </div>

            {/* FEATURE 9 — Remote Control */}
            <div className="bg-[#1c1e21] border border-[var(--color-border)] rounded-xl p-6 transition-all hover:border-[var(--color-accent)] hover:-translate-y-1 relative">
              <div className="absolute -top-3 left-6">
                <span className="bg-[#4CAF50] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Works on local network
                </span>
              </div>
              <svg className="w-7 h-7 mb-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <line x1="12" y1="20" x2="12.01" y2="20" />
              </svg>
              <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-2">
                Remote Control
              </h3>
              <p className="text-[var(--color-muted)]">
                Connect any phone, tablet, or laptop on the local network to control the scoreboard wirelessly — score, timer, sponsor loop and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 4 — REMOTE CONTROL SHOWCASE
          ======================================== */}
      <section className="py-24 bg-[var(--color-bg)]">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left — Content */}
              <div>
                <div className="inline-flex items-center gap-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full px-4 py-2 mb-6">
                  <Wifi size={16} className="text-[var(--color-accent)]" />
                  <span className="text-sm text-[var(--color-muted)]">Works on local network</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-accent)] mb-6">
                  Control from anywhere
                </h2>
                <p className="text-lg text-[var(--color-muted)] mb-8">
                  Use your phone, tablet, or laptop to control the scoreboard wirelessly. No app needed — just open a browser and you're connected.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#4CAF50] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-[var(--color-muted)]">Update scores and timer from the sideline</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#4CAF50] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-[var(--color-muted)]">Trigger animations for goals, cards, substitutions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#4CAF50] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-[var(--color-muted)]">Manage sponsor loops during breaks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#4CAF50] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-[var(--color-muted)]">No installation required — works in any browser</span>
                  </li>
                </ul>
                <Link
                  href="/help#remote-control"
                  className="inline-flex items-center gap-2 text-[var(--color-cta)] hover:text-[var(--color-accent)] transition-colors font-medium"
                >
                  Learn how to set up remote control
                  <ArrowRight size={18} />
                </Link>
              </div>

              {/* Right — iPhone Mockup */}
              <div className="flex justify-center lg:justify-end">
                <iPhoneMockup 
                  screenshot="/screenshot-remote-control.png"
                  alt="Sagitta Remote Control on iPhone"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 5 — HOW IT WORKS
          ======================================== */}
      <section className="py-24 bg-[var(--color-surface)]">
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
          SECTION 6 — PRICING TEASER
          ======================================== */}
      <section className="py-24 bg-[var(--color-bg)]">
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
          SECTION 7 — CTA BANNER
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
