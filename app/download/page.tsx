import Image from "next/image";
import { Download, Check, AlertCircle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download Sagitta for macOS. Professional football scoreboard software with free 14-day trial. Compatible with macOS 13 Ventura or later.",
  openGraph: {
    title: "Download Sagitta - Football Scoreboard App",
    description: "Download the professional football scoreboard app for macOS. Free 14-day trial.",
  },
};

const systemRequirements = [
  {
    label: "Operating System",
    value: "macOS 13 Ventura or later",
  },
  {
    label: "Chip",
    value: "Apple Silicon (M1 or later) or Intel",
  },
  {
    label: "RAM",
    value: "4 GB minimum, 8 GB recommended",
  },
  {
    label: "Storage",
    value: "200 MB available space",
  },
  {
    label: "Display output",
    value: "Any HDMI, Thunderbolt, or AirPlay-compatible screen",
  },
  {
    label: "Internet",
    value: "Required for first-time license activation only",
  },
];

const installSteps = [
  "Download the .dmg file above",
  "Open the .dmg and drag Sagitta to your Applications folder",
  "Launch Sagitta — macOS may ask you to confirm opening an app from an identified developer",
  "On first launch, enter your license key to activate",
  "You're ready to go!",
];

export default function DownloadPage() {
  return (
    <div className="py-20">
      {/* ========================================
          SECTION 1 — PAGE HERO
          ======================================== */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className="text-[52px] font-normal text-[var(--color-accent)] mb-4 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Download Sagitta
          </h1>
          <p className="text-xl text-[var(--color-muted)] mb-12">
            The professional football scoreboard app for macOS.
          </p>

          {/* Main Download Button */}
          <a
            href="#"
            className="inline-flex items-center justify-center gap-3 px-12 py-5 bg-[#e8e0d0] text-[#1c1e21] rounded-full font-semibold text-lg hover:opacity-90 transition-opacity mb-6"
          >
            <Download size={24} />
            Download for macOS
          </a>

          {/* Version Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-[var(--color-muted)]">
            <span className="flex items-center gap-2">
              <Check size={16} className="text-[var(--color-cta)]" />
              Latest version: v1.0.0
            </span>
            <span className="hidden sm:block">·</span>
            <span>Released: January 2025</span>
            <span className="hidden sm:block">·</span>
            <span>~45 MB · macOS 13 Ventura or later</span>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 2 — SYSTEM REQUIREMENTS
          ======================================== */}
      <section className="bg-[var(--color-surface)] py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[var(--color-accent)] mb-8 text-center">
              System Requirements
            </h2>

            <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl overflow-hidden">
              <div className="divide-y divide-[var(--color-border)]">
                {systemRequirements.map((req, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 hover:bg-[var(--color-surface)] transition-colors"
                  >
                    <div className="font-semibold text-[var(--color-accent)]">
                      {req.label}
                    </div>
                    <div className="md:col-span-2 text-[var(--color-muted)]">
                      {req.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 3 — INSTALLATION STEPS
          ======================================== */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[var(--color-accent)] mb-12 text-center">
              How to install
            </h2>

            <div className="space-y-6 mb-8">
              {installSteps.map((step, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center font-semibold text-[var(--color-accent)]"
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-lg text-[var(--color-text)]">{step}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Security Note */}
            <div className="flex gap-3 p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
              <AlertCircle
                size={20}
                className="flex-shrink-0 text-[var(--color-cta)] mt-0.5"
              />
              <p className="text-sm text-[var(--color-muted)]">
                <strong className="text-[var(--color-text)]">Note:</strong> If
                macOS blocks the app, go to System Settings → Privacy & Security
                and click 'Open Anyway'.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 4 — WHAT'S INCLUDED
          ======================================== */}
      <section className="bg-[var(--color-surface)] py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-[var(--color-accent)] mb-4 text-center">
              What's included
            </h2>
            <p className="text-lg text-[var(--color-muted)] mb-12 text-center max-w-2xl mx-auto">
              A complete professional scoreboard system with intuitive controls and powerful customization.
            </p>

            {/* Screenshots only */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl overflow-hidden">
                <Image
                  src="/screenshot-match-control.png"
                  alt="Screenshot 1 - Match control panel"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="px-4 py-3 border-t border-[var(--color-border)] text-sm text-[var(--color-muted)]">
                  Screenshot 1
                </div>
              </div>

              <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl overflow-hidden">
                <Image
                  src="/screenshot-element-layout.png"
                  alt="Screenshot 2 - Element layout editor"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="px-4 py-3 border-t border-[var(--color-border)] text-sm text-[var(--color-muted)]">
                  Screenshot 2
                </div>
              </div>

              <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl overflow-hidden">
                <Image
                  src="/screenshot-media-zones.png"
                  alt="Screenshot 3 - Media zones and sponsor settings"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="px-4 py-3 border-t border-[var(--color-border)] text-sm text-[var(--color-muted)]">
                  Screenshot 3
                </div>
              </div>

              <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl overflow-hidden">
                <Image
                  src="/screenshot-presets.png"
                  alt="Screenshot 4 - Saved presets"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="px-4 py-3 border-t border-[var(--color-border)] text-sm text-[var(--color-muted)]">
                  Screenshot 4
                </div>
              </div>
            </div>

            {/* Text mapping separate to avoid confusion */}
            <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl p-6 md:p-8">
              <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-6">
                What each screenshot shows
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="font-medium text-[var(--color-accent)] mb-1">Screenshot 1 — Match Control</p>
                  <p className="text-[var(--color-muted)]">
                    Control score, timer, teams, and match events from one clean interface.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-[var(--color-accent)] mb-1">Screenshot 2 — Element Layout</p>
                  <p className="text-[var(--color-muted)]">
                    Position and size scoreboard elements with precision for your venue.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-[var(--color-accent)] mb-1">Screenshot 3 — Media Zones</p>
                  <p className="text-[var(--color-muted)]">
                    Configure sponsor ticker, commercial loop, and video input settings.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-[var(--color-accent)] mb-1">Screenshot 4 — Presets</p>
                  <p className="text-[var(--color-muted)]">
                    Save and load complete setups for different competitions and matchday formats.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 5 — NOT ON MAC?
          ======================================== */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-[var(--color-accent)] mb-4">
                Not on Mac?
              </h3>
              <p className="text-[var(--color-muted)] mb-6">
                Sagitta is currently available for macOS only. Windows support is
                planned for a future release. Join our mailing list to be notified.
              </p>

              {/* Email Capture Form */}
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[var(--color-cta)] text-[var(--color-bg)] rounded-lg font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  Notify me
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
