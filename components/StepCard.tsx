interface StepCardProps {
  number: number;
  title: string;
  description: string;
  showConnector?: boolean;
}

export default function StepCard({ number, title, description, showConnector = false }: StepCardProps) {
  return (
    <div className="relative flex-1">
      <div className="relative z-10">
        <div className="text-[80px] font-normal text-[var(--color-border)] mb-4 leading-none" style={{ fontFamily: 'var(--font-display)' }}>
          {number}
        </div>
        <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-3">
          {title}
        </h3>
        <p className="text-[var(--color-muted)]">
          {description}
        </p>
      </div>
      
      {showConnector && (
        <div className="hidden lg:block absolute top-12 left-full w-full h-[2px] border-t-2 border-dashed border-[var(--color-border)]" />
      )}
    </div>
  );
}
