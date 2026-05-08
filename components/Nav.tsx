"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/public/logo.png";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/download", label: "Download" },
  { href: "/help", label: "Help" },
  { href: "/purchase", label: "Purchase" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#1c1e21] sticky top-0 z-50 h-16 shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
      <div className="container mx-auto px-6 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center min-h-[44px]" aria-label="Sagitta Home">
            <Image
              src={logo}
              alt="Sagitta Football Scoreboard Software Logo"
              width={48}
              height={48}
              quality={100}
              priority
              className="h-12 w-auto"
              style={{ objectFit: 'contain' }}
            />
          </Link>

          {/* Desktop Navigation - Center */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-[var(--color-accent)] pb-1 border-b-2",
                    pathname === link.href
                      ? "text-[var(--color-accent)] border-white"
                      : "text-[var(--color-muted)] border-transparent"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA - Right */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/purchase"
              className="px-5 py-2 bg-[#e8e0d0] text-[#1c1e21] rounded-full font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Buy Now
            </Link>
          </div>

          {/* Mobile Menu Button - Only visible on mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden text-[var(--color-accent)] p-2 min-h-[44px] min-w-[44px] items-center justify-center"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--color-surface)] border-t border-[var(--color-border)]">
          <div className="container mx-auto px-6 py-4">
            <ul className="space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block text-base font-medium transition-colors py-2",
                      pathname === link.href
                        ? "text-[var(--color-accent)]"
                        : "text-[var(--color-muted)] hover:text-[var(--color-accent)]"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/purchase"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-5 py-2 bg-[#e8e0d0] text-[#1c1e21] rounded-full font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  Buy Now
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
