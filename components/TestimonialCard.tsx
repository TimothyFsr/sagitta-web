interface TestimonialCardProps {
  quote: string;
  author: string;
  club: string;
}

export default function TestimonialCard({ quote, author, club }: TestimonialCardProps) {
  return (
    <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl">
      <p className="text-lg italic text-[var(--color-text)] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
        "{quote}"
      </p>
      <p className="text-[13px] text-[var(--color-muted)]">
        — {author}, {club}
      </p>
    </div>
  );
}
