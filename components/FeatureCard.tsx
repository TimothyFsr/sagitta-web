import { 
  Monitor,
  Shield,
  ClipboardList,
  PauseCircle,
  Cast,
  WifiOff,
  type LucideIcon 
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "monitor": Monitor,
  "shield": Shield,
  "clipboard-list": ClipboardList,
  "pause-circle": PauseCircle,
  "cast": Cast,
  "wifi-off": WifiOff,
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  const Icon = iconMap[icon] || Monitor;

  return (
    <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl hover:border-[var(--color-accent)] transition-colors group">
      <div className="w-12 h-12 bg-[var(--color-bg)] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[var(--color-cta)] transition-colors">
        <Icon className="w-6 h-6 text-[var(--color-accent)] group-hover:text-[var(--color-bg)]" />
      </div>
      <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-2">
        {title}
      </h3>
      <p className="text-[var(--color-muted)]">
        {description}
      </p>
    </div>
  );
}
