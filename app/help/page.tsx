"use client";

import { useState } from "react";
import { Info, Mail } from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";

// Metadata is set via root layout since this is a client component

const sections = [
  { id: "getting-started", label: "Getting Started" },
  { id: "activating-license", label: "Activating Your License" },
  { id: "setting-up-match", label: "Setting Up a Match" },
  { id: "display-setup", label: "Display & Screen Setup" },
  { id: "remote-control", label: "Remote Control Setup" },
  { id: "match-controls", label: "Match Controls" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "contact-support", label: "Contact Support" },
];

const troubleshootingFAQs = [
  {
    question: "The app won't open — macOS says it's from an unidentified developer.",
    answer:
      'Go to System Settings → Privacy & Security → scroll down and click "Open Anyway" next to Sagitta. This only happens on first launch.',
  },
  {
    question: "My license key isn't being accepted.",
    answer:
      "Double-check the key format: SGTA-XXXX-XXXX-XXXX. Make sure there are no leading/trailing spaces. If the problem persists, contact info@sagittascore.com with your order number.",
  },
  {
    question: "The scoreboard is showing on my main screen, not the external display.",
    answer:
      'In Sagitta → Display Settings, manually select your external screen. Make sure macOS is set to "Extend" mode in System Settings → Displays.',
  },
  {
    question: "The timer is not running.",
    answer:
      'Press the "Start" button in the control panel. Sagitta uses manual timer control — it does not start automatically.',
  },
  {
    question: "Sagitta is slow or lagging.",
    answer:
      "Try closing other applications. Sagitta recommends at least 4GB of free RAM. If the issue persists, restart the app.",
  },
  {
    question: "I've reached my activation limit.",
    answer:
      "You can deactivate an older Mac from Sagitta → Preferences → License → Deactivate. If you no longer have access to that Mac, contact support.",
  },
];

export default function HelpPage() {
  const [mobileSection, setMobileSection] = useState("getting-started");

  return (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-12">
            <h1
              className="text-[52px] font-normal text-[var(--color-accent)] mb-4 leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Help & Documentation
            </h1>
            <p className="text-xl text-[var(--color-muted)]">
              Everything you need to know about using Sagitta.
            </p>
          </div>

          {/* Mobile Section Selector */}
          <div className="lg:hidden mb-8">
            <select
              value={mobileSection}
              onChange={(e) => {
                setMobileSection(e.target.value);
                document.getElementById(e.target.value)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
            >
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.label}
                </option>
              ))}
            </select>
          </div>

          {/* Two Column Layout */}
          <div className="flex gap-12">
            {/* Sticky Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <nav className="sticky top-24">
                <ul className="space-y-2">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="block px-4 py-2 text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface)] rounded-lg transition-colors"
                      >
                        {section.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 max-w-3xl">
              <div className="prose-help space-y-20">
                {/* Section 1: Getting Started */}
                <section id="getting-started">
                  <h2
                    className="text-[32px] font-normal text-[var(--color-accent)] mb-6"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Getting Started
                  </h2>
                  <p className="help-text mb-6">
                    Welcome to Sagitta. Follow these steps to get up and running.
                  </p>
                  <ol className="help-steps">
                    <li>Download the latest version from the Download page.</li>
                    <li>Open the .dmg file and drag Sagitta to Applications.</li>
                    <li>
                      Launch Sagitta. If macOS shows a security warning, go to System
                      Settings → Privacy & Security → Open Anyway.
                    </li>
                    <li>Activate your license on first launch.</li>
                    <li>Set up your match and connect your display.</li>
                  </ol>
                </section>

                {/* Section 2: Activating Your License */}
                <section id="activating-license">
                  <h2
                    className="text-[32px] font-normal text-[var(--color-accent)] mb-6"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Activating Your License
                  </h2>
                  <p className="help-text mb-8">
                    Sagitta uses a simple activation system. Here's how it works.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-3">
                        Enter your key
                      </h3>
                      <p className="help-text">
                        On first launch, a dialog will ask for your license key. Enter
                        the key exactly as received (format:{" "}
                        <code className="help-code">SGTA-XXXX-XXXX-XXXX</code>).
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-3">
                        Internet required
                      </h3>
                      <p className="help-text">
                        Activation requires an internet connection the first time. After
                        activation, Sagitta works fully offline.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-3">
                        Max activations
                      </h3>
                      <p className="help-text">
                        Each license allows a set number of active Macs (see your plan).
                        To deactivate a Mac, go to Sagitta → Preferences → License →
                        Deactivate.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-3">
                        Transferring license
                      </h3>
                      <p className="help-text">
                        Contact{" "}
                        <a href="mailto:info@sagittascore.com" className="help-link">
                          info@sagittascore.com
                        </a>{" "}
                        to transfer your license to a new Mac.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 3: Setting Up a Match */}
                <section id="setting-up-match">
                  <h2
                    className="text-[32px] font-normal text-[var(--color-accent)] mb-6"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Setting Up a Match
                  </h2>
                  <ol className="help-steps">
                    <li>Click "New Match" on the main screen.</li>
                    <li>Enter home team name and away team name.</li>
                    <li>Optionally upload team logos (PNG, max 2MB).</li>
                    <li>Set match duration (default: 2 × 45 minutes).</li>
                    <li>Click "Start Match" — the scoreboard screen will appear.</li>
                  </ol>
                </section>

                {/* Section 4: Display & Screen Setup */}
                <section id="display-setup">
                  <h2
                    className="text-[32px] font-normal text-[var(--color-accent)] mb-6"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Display & Screen Setup
                  </h2>
                  <p className="help-text mb-6">
                    Sagitta sends the scoreboard to a second screen. Here's how to
                    connect it.
                  </p>
                  <ul className="help-bullets mb-6">
                    <li>
                      Connect your external screen via HDMI, Thunderbolt, or use AirPlay
                      for a wireless display.
                    </li>
                    <li>
                      In macOS System Settings → Displays, ensure the external screen is
                      detected and set to "Extend" mode (not Mirror).
                    </li>
                    <li>
                      In Sagitta, go to Display Settings and select your external screen
                      from the dropdown.
                    </li>
                    <li>
                      Click "Preview" to test the output before the match starts.
                    </li>
                  </ul>

                  <div className="help-tip">
                    <Info size={20} className="flex-shrink-0 text-[var(--color-cta)]" />
                    <p>
                      <strong>Tip:</strong> For stadium setups, we recommend a dedicated
                      HDMI splitter to send the signal to multiple screens simultaneously.
                    </p>
                  </div>
                </section>

                {/* Section 5: Remote Control Setup */}
                <section id="remote-control">
                  <h2
                    className="text-[32px] font-normal text-[var(--color-accent)] mb-6"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Remote Control Setup
                  </h2>
                  <p className="help-text mb-6">
                    Sagitta supports wireless remote control over a local network. Once your
                    Mac and your control device are on the same Wi-Fi, you can control the
                    scoreboard from anywhere around the pitch.
                  </p>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-4">
                      What you can control remotely
                    </h3>
                    <ul className="help-bullets">
                      <li>Score (home and away)</li>
                      <li>Match timer (start, pause, reset)</li>
                      <li>Match events (goals, cards, substitutions)</li>
                      <li>Sponsor loop (start, stop, next)</li>
                      <li>Half-time / Full-time state</li>
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-4">
                      How to connect
                    </h3>
                    <ol className="help-steps">
                      <li>Make sure both devices are on the same Wi-Fi network.</li>
                      <li>Open Sagitta → Settings → Remote Control and enable it.</li>
                      <li>
                        Sagitta shows a local IP address and port (e.g.{" "}
                        <code className="help-code">192.168.1.45:8080</code>).
                      </li>
                      <li>
                        On your control device, open a browser and go to that address.
                      </li>
                      <li>
                        The Sagitta remote control interface loads — no app install needed.
                      </li>
                    </ol>
                  </div>

                  <div className="bg-[var(--color-surface)] border-l-4 border-[var(--color-accent)] rounded-r-lg p-6 mb-8">
                    <p className="help-text">
                      <strong>Tip:</strong> For the most reliable setup at a ground, we
                      recommend a dedicated local Wi-Fi network. Ask us about our Wireless
                      Network Installation on the{" "}
                      <a href="/purchase" className="help-link">
                        Purchase page
                      </a>
                      .
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-4">
                      Troubleshooting
                    </h3>
                    <ul className="help-bullets space-y-4">
                      <li>
                        <strong>"Can't connect"</strong> — Check that both devices are on the
                        same network and that Remote Control is enabled in Sagitta. Your Mac
                        firewall may need Sagitta added as an exception in System Settings →
                        Network → Firewall.
                      </li>
                      <li>
                        <strong>"Interface loads but changes don't appear"</strong> — Refresh
                        the browser on the control device.
                      </li>
                      <li>
                        <strong>"IP keeps changing"</strong> — Assign a static IP to the Mac
                        in your router settings, or use our dedicated network installation
                        service.
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Section 6: Match Controls */}
                <section id="match-controls">
                  <h2
                    className="text-[32px] font-normal text-[var(--color-accent)] mb-6"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Match Controls
                  </h2>
                  <p className="help-text mb-6">
                    During a match, the control panel lets you manage all scoreboard
                    elements.
                  </p>

                  <ul className="help-bullets">
                    <li>
                      <strong>Score:</strong> click the + / − buttons next to each team
                      name to adjust the score.
                    </li>
                    <li>
                      <strong>Timer:</strong> Start, pause, and reset the match clock. The
                      clock does not auto-stop — you control it manually.
                    </li>
                    <li>
                      <strong>Match events:</strong> Click "Add Event" to log a goal,
                      yellow card, red card, or substitution. Events appear briefly on the
                      scoreboard.
                    </li>
                    <li>
                      <strong>Half time:</strong> Click "Half Time" to display the
                      half-time state on screen. The clock freezes.
                    </li>
                    <li>
                      <strong>Second half:</strong> Click "Start Second Half" to begin the
                      second 45-minute period.
                    </li>
                    <li>
                      <strong>Full time:</strong> Click "Full Time" to display the final
                      score.
                    </li>
                  </ul>
                </section>

                {/* Section 7: Troubleshooting */}
                <section id="troubleshooting">
                  <h2
                    className="text-[32px] font-normal text-[var(--color-accent)] mb-6"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Troubleshooting
                  </h2>
                  <FAQAccordion items={troubleshootingFAQs} />
                </section>

                {/* Section 8: Contact Support */}
                <section id="contact-support">
                  <h2
                    className="text-[32px] font-normal text-[var(--color-accent)] mb-6"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Contact Support
                  </h2>
                  <p className="help-text mb-6">
                    Can't find what you're looking for? Our team is here to help.
                  </p>

                  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 mb-6">
                    <div className="space-y-3 text-[var(--color-text)]">
                      <p>
                        <strong>Email:</strong>{" "}
                        <a href="mailto:info@sagittascore.com" className="help-link">
                          info@sagittascore.com
                        </a>
                      </p>
                      <p>
                        <strong>Response time:</strong> within 24 hours on working days
                      </p>
                    </div>
                  </div>

                  <p className="help-text mb-6">
                    When writing to us, please include: your license key, macOS version,
                    and a description of the issue.
                  </p>

                  <a
                    href="mailto:info@sagittascore.com"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-cta)] text-[var(--color-bg)] rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    <Mail size={20} />
                    Send us an email
                  </a>
                </section>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
