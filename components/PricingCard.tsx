import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  name: string;
  price: number | string;
  description: string;
  features: PricingFeature[];
  cta: string;
  ctaLink: string;
  popular?: boolean;
}

export default function PricingCard({
  name,
  price,
  description,
  features,
  cta,
  ctaLink,
  popular = false,
}: PricingCardProps) {
  const isContactPrice = typeof price === "string";

  return (
    <div
      className={cn(
        "relative p-8 bg-[#242628] border rounded-2xl h-full flex flex-col",
        popular
          ? "border-white"
          : "border-[var(--color-border)]"
      )}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--color-cta)] text-[var(--color-bg)] rounded-full text-sm font-semibold">
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[var(--color-accent)] mb-2">
          {name}
        </h3>
        <p className="text-[var(--color-muted)]">{description}</p>
      </div>

      <div className="mb-8">
        {isContactPrice ? (
          <div className="text-3xl font-normal text-[var(--color-accent)]" style={{ fontFamily: "var(--font-display)" }}>
            {price}
          </div>
        ) : (
          <div className="flex items-start gap-1">
            <span className="text-3xl font-normal text-[var(--color-accent)] mt-1" style={{ fontFamily: "var(--font-display)" }}>
              €
            </span>
            <span className="text-[52px] font-normal text-[var(--color-accent)] leading-none" style={{ fontFamily: "var(--font-display)" }}>
              {price}
            </span>
          </div>
        )}
        {!isContactPrice && (
          <p className="text-[var(--color-muted)] text-sm mt-2">one-time</p>
        )}
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            {feature.included ? (
              <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
            ) : (
              <X className="w-5 h-5 text-[var(--color-muted)] flex-shrink-0 mt-0.5" />
            )}
            <span className={cn(
              "text-sm",
              feature.included ? "text-[var(--color-text)]" : "text-[var(--color-muted)]"
            )}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      <a
        href={ctaLink}
        className={cn(
          "block w-full py-3 rounded-lg font-semibold text-center transition-all",
          popular
            ? "bg-[var(--color-cta)] text-[var(--color-bg)] hover:opacity-90"
            : "bg-transparent border-2 border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)]"
        )}
      >
        {cta}
      </a>
    </div>
  );
}
