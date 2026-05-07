export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-[var(--color-border)] border-t-[var(--color-cta)] rounded-full animate-spin" />
        <p className="text-[var(--color-muted)] text-sm">Loading...</p>
      </div>
    </div>
  );
}
