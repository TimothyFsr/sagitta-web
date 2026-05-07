import PricingCard from "@/components/PricingCard";
import LicenseInfo from "@/components/LicenseInfo";
import FAQAccordion from "@/components/FAQAccordion";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Purchase",
  description:
    "Simple, transparent pricing for Sagitta. One-time payment, no subscriptions. Plans from €49 for single club to custom enterprise solutions.",
  openGraph: {
    title: "Purchase Sagitta - Simple Pricing",
    description: "One-time payment per license. No subscriptions. No hidden fees. From €49.",
  },
};

const pricingTiers = [
  {
    name: "Single Club",
    price: 49,
    description: "Perfect for a single club",
    features: [
      { text: "1 license key", included: true },
      { text: "Activate on up to 2 Macs", included: true },
      { text: "All core scoreboard features", included: true },
      { text: "Free updates for 12 months", included: true },
      { text: "Priority support", included: false },
      { text: "Multi-device management", included: false },
    ],
    cta: "Buy Single License",
    ctaLink: "#",
    popular: false,
  },
  {
    name: "Club Pro",
    price: 89,
    description: "For clubs with multiple operators",
    features: [
      { text: "1 license key", included: true },
      { text: "Activate on up to 5 Macs", included: true },
      { text: "All core scoreboard features", included: true },
      { text: "Free updates for 24 months", included: true },
      { text: "Priority email support", included: true },
      { text: "Multi-device management", included: false },
    ],
    cta: "Buy Club Pro",
    ctaLink: "#",
    popular: true,
  },
  {
    name: "Federation / League",
    price: "Contact us",
    description: "For leagues managing multiple clubs",
    features: [
      { text: "Unlimited license keys", included: true },
      { text: "Centralized license management dashboard", included: true },
      { text: "All core scoreboard features", included: true },
      { text: "Lifetime updates", included: true },
      { text: "Priority support + onboarding call", included: true },
      { text: "Custom branding options", included: true },
    ],
    cta: "Contact Us",
    ctaLink: "mailto:sales@sagitta.app",
    popular: false,
  },
];

const licenseInfo = [
  {
    type: "buy-once" as const,
    title: "Buy once, own it",
    description:
      "Pay one time and keep the software forever. Updates included for the period stated in your plan.",
  },
  {
    type: "activation" as const,
    title: "Online activation",
    description:
      "On first launch, Sagitta contacts our server to activate your key. After that, it works fully offline.",
  },
  {
    type: "hardware" as const,
    title: "Hardware-bound",
    description:
      "Your license is tied to specific Macs. Contact us to transfer your license to a new machine.",
  },
];

const faqs = [
  {
    question: "Can I try Sagitta before buying?",
    answer:
      "Yes — download includes a free 14-day trial with full features, no credit card required.",
  },
  {
    question: "What happens after my free update period ends?",
    answer:
      "You keep the version you have forever. To get newer versions, you can renew your update subscription at a discounted rate.",
  },
  {
    question: "How do I receive my license key?",
    answer:
      "Immediately after purchase, your license key is sent to the email address you used at checkout.",
  },
  {
    question: "Can I use my license on multiple computers?",
    answer:
      "Yes, depending on your plan. Single allows 2 Macs, Club Pro allows 5 Macs.",
  },
  {
    question: "What if I get a new Mac?",
    answer:
      "Contact our support team and we'll transfer your activation to the new machine.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 30-day money-back guarantee if Sagitta doesn't work as expected on your system.",
  },
];

export default function PurchasePage() {
  return (
    <div className="py-20">
      {/* ========================================
          SECTION 1 — PAGE HERO
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
            One-time payment per license. No subscriptions. No hidden fees.
          </p>
        </div>
      </section>

      {/* ========================================
          SECTION 2 — PRICING CARDS
          ======================================== */}
      <section className="bg-[var(--color-surface)] py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <PricingCard
                key={index}
                name={tier.name}
                price={tier.price}
                description={tier.description}
                features={tier.features}
                cta={tier.cta}
                ctaLink={tier.ctaLink}
                popular={tier.popular}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 3 — HOW LICENSING WORKS
          ======================================== */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-[var(--color-accent)] mb-12 text-center">
              How your license works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {licenseInfo.map((info, index) => (
                <LicenseInfo
                  key={index}
                  type={info.type}
                  title={info.title}
                  description={info.description}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 4 — FAQ
          ======================================== */}
      <section className="bg-[var(--color-surface)] py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[var(--color-accent)] mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 5 — PAYMENT NOTE
          ======================================== */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[var(--color-muted)] mb-6">
              Payments processed securely via Stripe. We accept all major credit
              cards and PayPal.
            </p>

            {/* Payment Logo Placeholders */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-20 h-12 bg-[var(--color-surface)] border border-[var(--color-border)] rounded flex items-center justify-center">
                <span className="text-xs text-[var(--color-muted)]">Stripe</span>
              </div>
              <div className="w-20 h-12 bg-[var(--color-surface)] border border-[var(--color-border)] rounded flex items-center justify-center">
                <span className="text-xs text-[var(--color-muted)]">PayPal</span>
              </div>
            </div>

            <p className="text-sm text-[var(--color-muted)]">
              Prices shown exclude VAT. VAT may be added at checkout depending on
              your location.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
