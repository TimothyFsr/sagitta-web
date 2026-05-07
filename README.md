# Sagitta Web

A modern Next.js 14 website for Sagitta, built with TypeScript, Tailwind CSS, and shadcn/ui components.

## Project Structure

```
sagitta-web/
├── app/
│   ├── layout.tsx          # Root layout with Nav + Footer
│   ├── page.tsx            # Homepage with Hero, Features, and Pricing
│   ├── globals.css         # Global styles with Sagitta color palette
│   ├── download/
│   │   └── page.tsx        # Download page with platform options
│   ├── help/
│   │   └── page.tsx        # Help center with FAQs and resources
│   └── purchase/
│       └── page.tsx        # Purchase page with pricing tiers
├── components/
│   ├── Nav.tsx             # Main navigation with sticky header
│   ├── Footer.tsx          # Footer with links and company info
│   ├── Hero.tsx            # Hero section for homepage
│   ├── FeatureCard.tsx     # Reusable feature card component
│   ├── PricingCard.tsx     # Pricing tier card component
│   └── LicenseInfo.tsx     # License information card
├── lib/
│   ├── constants.ts        # App constants (pricing, features, nav links)
│   └── utils.ts            # Utility functions (cn helper)
└── public/
    └── logo-placeholder.txt # Instructions for logo placement
```

## Design System

### Color Palette

The design uses the Sagitta brand colors:

- `--color-bg`: #1c1e21 (dark charcoal background)
- `--color-surface`: #242628 (elevated surfaces)
- `--color-border`: #333538 (subtle borders)
- `--color-text`: #f0f0f0 (primary text)
- `--color-muted`: #8a8d91 (secondary text)
- `--color-accent`: #ffffff (white accents)
- `--color-cta`: #e8e0d0 (warm off-white for CTAs)

### Typography

- **Display**: "DM Serif Display" — Used for hero headlines
- **Body/UI**: "DM Sans" — Used for all other text

Fonts are loaded via `next/font/google` for optimal performance.

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The development server runs at [http://localhost:3000](http://localhost:3000)

## Features

- ✅ Next.js 14 App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS v4 for styling
- ✅ shadcn/ui components foundation
- ✅ Google Fonts integration (DM Sans + DM Serif Display)
- ✅ Responsive design
- ✅ Dark theme optimized
- ✅ Static site generation ready

## Pages

### Homepage (/)
- Hero section with CTA buttons
- Features grid showcasing 6 key features
- Pricing section with 3 tiers

### Download (/download)
- Platform-specific download options (macOS, Windows, Linux)
- Trial information
- System requirements

### Help (/help)
- Documentation links
- Video tutorials
- Community forum
- FAQ section
- Contact support

### Purchase (/purchase)
- Detailed pricing tiers
- License information cards
- Enterprise solutions section

## Customization

### Adding Your Logo

Replace the text-based logo by adding your image to `/public/logo.png` and update the Nav and Footer components to use it:

```tsx
<Image src="/logo.png" alt="Sagitta" width={40} height={40} />
```

### Modifying Content

Edit `/lib/constants.ts` to update:
- Navigation links
- Features list
- Pricing tiers
- Footer links
- License information

### Styling

The color palette is defined in `/app/globals.css`. Modify the CSS variables to match your brand:

```css
:root {
  --color-bg: #1c1e21;
  /* ... other colors */
}
```

## Build Output

All pages are statically generated at build time for optimal performance:
- `/` - Homepage
- `/download` - Download page
- `/help` - Help center
- `/purchase` - Purchase page

## Next Steps

1. **Add your logo**: Replace `public/logo-placeholder.txt` with `public/logo.png`
2. **Update content**: Modify constants in `lib/constants.ts`
3. **Add analytics**: Integrate your analytics provider
4. **Connect payment**: Implement payment processing for purchase page
5. **Add CMS**: Consider adding a CMS for blog content
6. **Deploy**: Deploy to Vercel, Netlify, or your preferred hosting

## Technology Stack

- **Framework**: Next.js 16.2.5
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge, class-variance-authority
- **Font Loading**: next/font/google
