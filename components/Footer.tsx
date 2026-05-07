import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

const FOOTER_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/download", label: "Download" },
  { href: "/help", label: "Help" },
  { href: "/purchase", label: "Purchase" },
  { href: "/privacy", label: "Privacy Policy" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1c1e21] border-t border-[var(--color-border)] mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Left Column - Logo & Tagline */}
          <div>
            <Link href="/" className="inline-block mb-4" aria-label="Sagitta Home">
              <Image
                src={logo}
                alt="Sagitta Football Scoreboard Software Logo"
                width={120}
                height={120}
                quality={100}
                className="h-[120px] w-auto"
                style={{ objectFit: 'contain' }}
              />
            </Link>
            <p className="text-[13px] text-[var(--color-muted)] leading-relaxed">
              Professional scoreboard software for football clubs.
            </p>
          </div>

          {/* Center Column - Navigation Links */}
          <div>
            <ul className="space-y-2">
              {FOOTER_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Contact & Copyright */}
          <div className="space-y-3">
            <a
              href="mailto:support@sagitta.app"
              className="block text-[13px] text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
            >
              support@sagitta.app
            </a>
            <p className="text-[13px] text-[var(--color-muted)]">
              © 2025 Sagitta. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
