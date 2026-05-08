export default function Loading() {
  return (
    <div className="py-20 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-8 h-8 border-4 border-[var(--color-border)] border-t-[var(--color-accent)] rounded-full animate-spin mb-4" />
        <p className="text-[var(--color-muted)]">Loading contact page...</p>
      </div>
    </div>
  );
}
