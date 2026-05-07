import { ShoppingBag, Wifi, Laptop } from "lucide-react";

interface LicenseInfoProps {
  type: "buy-once" | "activation" | "hardware";
  title: string;
  description: string;
}

const iconMap = {
  "buy-once": ShoppingBag,
  "activation": Wifi,
  "hardware": Laptop,
};

export default function LicenseInfo({ type, title, description }: LicenseInfoProps) {
  const Icon = iconMap[type];

  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-[var(--color-cta)]" />
      </div>
      <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-2">
        {title}
      </h3>
      <p className="text-[var(--color-muted)] text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
