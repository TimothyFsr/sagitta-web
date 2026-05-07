import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1
          className="text-[120px] font-normal text-[var(--color-accent)] mb-4 leading-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          404
        </h1>
        <h2 className="text-3xl font-bold text-[var(--color-accent)] mb-4">
          Page not found
        </h2>
        <p className="text-lg text-[var(--color-muted)] mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-cta)] text-[var(--color-bg)] rounded-full font-semibold hover:opacity-90 transition-opacity"
        >
          <Home size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
