# Deployment Guide - Sagitta

Step-by-step guide to deploy the Sagitta website to production.

## Pre-Deployment Checklist

### 1. Environment Variables

Update `.env.local` for production:

```env
# CRITICAL: Change this to a strong random string
JWT_SECRET=your-production-secret-here-use-openssl-rand-base64-32

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

Generate a strong JWT secret:
```bash
openssl rand -base64 32
```

### 2. Update URLs

**File: `app/layout.tsx`**
```typescript
metadataBase: new URL("https://sagitta.app"), // Update if using different domain
```

**File: `app/sitemap.ts`**
```typescript
const baseUrl = "https://sagitta.app"; // Update domain
```

**File: `app/robots.ts`**
```typescript
sitemap: "https://sagitta.app/sitemap.xml", // Update domain
```

### 3. Replace Placeholder Assets

- [ ] `/public/og-image.png` - 1200x630px branded image
- [ ] `/public/favicon.ico` - 32x32 icon file
- [ ] Homepage club logos (6 placeholders)
- [ ] Homepage app screenshot

## Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Built by Next.js creators
- Zero-config deployment
- Global CDN
- Automatic HTTPS
- Preview deployments
- Free for hobby projects

**Steps:**

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
cd sagitta-web
vercel
```

4. **Set Environment Variables**
```bash
vercel env add JWT_SECRET production
# Paste your strong JWT secret
```

5. **Deploy to Production**
```bash
vercel --prod
```

**Configure Custom Domain:**
1. Go to Vercel dashboard → Project Settings → Domains
2. Add `sagitta.app` and `www.sagitta.app`
3. Follow DNS instructions (add A/CNAME records)
4. SSL automatically provisioned

### Option 2: Netlify

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Login**
```bash
netlify login
```

3. **Build**
```bash
npm run build
```

4. **Deploy**
```bash
netlify deploy --prod
```

5. **Set Environment Variables**
- Go to Site Settings → Build & Deploy → Environment
- Add `JWT_SECRET`

### Option 3: Docker + VPS

**Dockerfile** (create in project root):
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/data ./data
RUN npm ci --production

EXPOSE 3000
CMD ["npm", "start"]
```

**Build & Run:**
```bash
docker build -t sagitta-web .
docker run -p 3000:3000 -e JWT_SECRET=your-secret sagitta-web
```

## Post-Deployment

### 1. Test Production Site

Visit each page:
- [ ] https://sagitta.app
- [ ] https://sagitta.app/download
- [ ] https://sagitta.app/purchase
- [ ] https://sagitta.app/help
- [ ] https://sagitta.app/robots.txt
- [ ] https://sagitta.app/sitemap.xml

Test API:
```bash
curl https://sagitta.app/api/activate -X POST \
  -H "Content-Type: application/json" \
  -d '{"key":"SGTA-TEST-DEMO-0001","hardwareId":"a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"}'
```

### 2. Run Lighthouse Audit

```bash
npx lighthouse https://sagitta.app --view
```

Expected scores:
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

### 3. Submit to Search Engines

**Google:**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://sagitta.app`
3. Verify ownership (add meta tag or DNS)
4. Submit sitemap: `https://sagitta.app/sitemap.xml`

**Bing:**
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add site: `https://sagitta.app`
3. Verify ownership
4. Submit sitemap

### 4. Set Up Monitoring

**Sentry (Error Tracking):**
```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

**Plausible Analytics (Privacy-friendly):**
Add to `app/layout.tsx`:
```tsx
<Script
  defer
  data-domain="sagitta.app"
  src="https://plausible.io/js/script.js"
/>
```

### 5. Configure Security Headers

Add to `next.config.ts`:
```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
```

### 6. Set Up CI/CD (Optional)

**.github/workflows/deploy.yml:**
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm test
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## Database Migration (When Ready)

Current: JSON files (`/data/licenses.json`)
Future: PostgreSQL

**Migration Script:**
```sql
CREATE TABLE licenses (
  key VARCHAR(20) PRIMARY KEY,
  plan VARCHAR(20) NOT NULL,
  max_activations INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  revoked BOOLEAN DEFAULT FALSE
);

CREATE TABLE activations (
  id SERIAL PRIMARY KEY,
  license_key VARCHAR(20) REFERENCES licenses(key),
  hardware_id VARCHAR(64) NOT NULL,
  activated_at TIMESTAMP DEFAULT NOW(),
  last_validated TIMESTAMP,
  UNIQUE(license_key, hardware_id)
);

CREATE TABLE activation_logs (
  id SERIAL PRIMARY KEY,
  timestamp TIMESTAMP DEFAULT NOW(),
  action VARCHAR(20) NOT NULL,
  license_key VARCHAR(20),
  hardware_id VARCHAR(64),
  ip VARCHAR(45),
  success BOOLEAN,
  error VARCHAR(50)
);
```

Update `/lib/license-db.ts` to use SQL queries instead of JSON.

## Maintenance

### Backup Data
```bash
# Backup licenses
scp your-server:/path/to/data/licenses.json ./backups/licenses-$(date +%Y%m%d).json

# Backup logs
scp your-server:/path/to/data/activation-log.json ./backups/logs-$(date +%Y%m%d).json
```

### Add New License Keys
```bash
# SSH to server
ssh your-server

# Edit licenses.json
nano /path/to/data/licenses.json

# Restart app (if needed)
pm2 restart sagitta-web
```

### Monitor Logs
```bash
# Vercel
vercel logs

# Docker
docker logs sagitta-web -f

# PM2
pm2 logs sagitta-web
```

## Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### API Errors in Production
- Check `JWT_SECRET` is set
- Verify `/data` folder exists and is writable
- Check file permissions: `chmod 755 data/`

### Slow Load Times
- Enable compression (automatic on Vercel)
- Check CDN is working
- Verify images are optimized
- Run Lighthouse audit

## Support

Questions? Check:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [PROJECT-SUMMARY.md](./PROJECT-SUMMARY.md)

---

**Ready to deploy!** 🚀

Follow the Vercel option for the fastest deployment.
