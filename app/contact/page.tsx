import { Mail, Clock } from "lucide-react";

export default function ContactPage() {

  return (
    <div className="py-20">
      {/* ========================================
          PAGE HERO
          ======================================== */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h1
            className="text-[52px] font-normal text-[var(--color-accent)] mb-4 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Get in touch
          </h1>
          <p className="text-xl text-[var(--color-muted)]">
            Questions about pricing, setup, or a custom quote? We're happy to help.
          </p>
        </div>
      </section>

      {/* ========================================
          CONTACT DETAILS
          ======================================== */}
      <section className="bg-[var(--color-surface)] py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card 1 — Email */}
              <div className="bg-[#1c1e21] border border-[var(--color-border)] rounded-xl p-6">
                <div className="w-12 h-12 bg-[#e8e0d0] rounded-full flex items-center justify-center mb-4">
                  <Mail size={24} className="text-[#1c1e21]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-accent)] mb-2">
                  Email
                </h3>
                <a
                  href="mailto:info@sagittascore.com"
                  className="text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors block mb-2"
                >
                  info@sagittascore.com
                </a>
                <p className="text-sm text-[var(--color-muted)]">
                  General enquiries, sales, and support
                </p>
              </div>

              {/* Card 2 — Hours */}
              <div className="bg-[#1c1e21] border border-[var(--color-border)] rounded-xl p-6">
                <div className="w-12 h-12 bg-[#e8e0d0] rounded-full flex items-center justify-center mb-4">
                  <Clock size={24} className="text-[#1c1e21]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-accent)] mb-2">
                  Response Time
                </h3>
                <p className="text-[var(--color-muted)] mb-2">Within 24 hours</p>
                <p className="text-sm text-[var(--color-muted)]">
                  Monday – Friday, 9:00 – 18:00 CET
                </p>
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="mt-12 text-center">
              <p className="text-[var(--color-muted)] mb-6">
                Have questions about pricing, setup, or technical support? Send us an email and we'll get back to you within 24 hours.
              </p>
              <a
                href="mailto:info@sagittascore.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#e8e0d0] text-[#1c1e21] rounded-full font-semibold hover:opacity-90 transition-opacity"
              >
                <Mail size={20} />
                Email us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
