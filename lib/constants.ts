// Football Scoreboard Features
export const FEATURES = [
  {
    title: "Live Scoreboard",
    description: "Real-time score, time, and match info displayed on any external screen.",
    icon: "monitor",
  },
  {
    title: "Team Logos & Kits",
    description: "Add your clubs' crests and colors for a fully branded display.",
    icon: "shield",
  },
  {
    title: "Match Events",
    description: "Log goals, cards, and substitutions as they happen.",
    icon: "clipboard-list",
  },
  {
    title: "Half-Time Control",
    description: "Pause, reset, and manage match phases with a single click.",
    icon: "pause-circle",
  },
  {
    title: "Multi-Screen Support",
    description: "Send your scoreboard to any connected HDMI or AirPlay display.",
    icon: "cast",
  },
  {
    title: "Offline Ready",
    description: "Runs fully local during matches. License is checked at startup and includes a 7-day offline grace period.",
    icon: "wifi-off",
  },
] as const;

// Pricing Tiers for Football Clubs
export const PRICING_TIERS = [
  {
    name: "Single Club License",
    price: 149,
    description: "Perfect for one club",
    features: [
      "Single club installation",
      "All scoreboard features",
      "Unlimited matches",
      "1 year of updates",
      "Email support",
    ],
    cta: "Buy Single Club",
    popular: false,
  },
  {
    name: "Multi Club License",
    price: 399,
    description: "For multiple venues",
    features: [
      "Install on up to 5 clubs",
      "All scoreboard features",
      "Unlimited matches",
      "2 years of updates",
      "Priority email support",
      "Volume discount",
    ],
    cta: "Buy Multi Club",
    popular: true,
  },
] as const;

// Testimonials
export const TESTIMONIALS = [
  {
    quote: "Sagitta transformed how we display scores at our ground. The setup was incredibly simple.",
    author: "Marco Bianchi",
    club: "AC Footballo",
  },
  {
    quote: "Finally, a scoreboard app that looks professional and works flawlessly every match day.",
    author: "Giuseppe Rossi",
    club: "FC Calcio United",
  },
] as const;

// How It Works Steps
export const STEPS = [
  {
    number: 1,
    title: "Download & Install",
    description: "Get Sagitta from our download page and run the installer.",
  },
  {
    number: 2,
    title: "Enter your license key",
    description: "Activate your copy with the key you received after purchase.",
  },
  {
    number: 3,
    title: "Start your match",
    description: "Set up teams, connect your display, and you're live.",
  },
] as const;

export const LICENSE_INFO = {
  trial: {
    title: "Try Before You Buy",
    description: "Download a free 14-day trial with full features. No credit card required.",
  },
  perpetual: {
    title: "Perpetual License",
    description: "Buy once, use forever. Updates included for the specified period.",
  },
  support: {
    title: "Extended Support",
    description: "Extend your update period at any time for continued access to new features.",
  },
} as const;
