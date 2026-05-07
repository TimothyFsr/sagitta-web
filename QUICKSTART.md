# Quick Start Guide - Sagitta Web

Get the Sagitta website and API running in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- macOS, Windows, or Linux

## Installation

```bash
cd sagitta-web
npm install
```

## Development

```bash
# Start the development server
npm run dev

# Open in browser
# Website: http://localhost:3000
# API: http://localhost:3000/api/*
```

## Test the License API

With the dev server running, open a new terminal:

```bash
./test-api.sh
```

This will test all three API endpoints:
- ✅ Activation
- ✅ Validation  
- ✅ Deactivation

## Test License Key

For development, use:

```
Key: SGTA-TEST-DEMO-0001
Hardware ID: any 64-char hex string
Max Activations: 99
```

Example hardware ID:
```
a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2
```

## Manual API Testing

### Activate a License

```bash
curl -X POST http://localhost:3000/api/activate \
  -H "Content-Type: application/json" \
  -d '{
    "key": "SGTA-TEST-DEMO-0001",
    "hardwareId": "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"
  }'
```

Response:
```json
{
  "success": true,
  "token": "eyJhbGc...",
  "plan": "single",
  "activationsUsed": 1,
  "activationsMax": 99
}
```

### Validate a Token

```bash
curl -X POST http://localhost:3000/api/validate \
  -H "Content-Type: application/json" \
  -d '{"token": "YOUR_JWT_TOKEN_HERE"}'
```

### Deactivate

```bash
curl -X POST http://localhost:3000/api/deactivate \
  -H "Content-Type: application/json" \
  -d '{
    "key": "SGTA-TEST-DEMO-0001",
    "hardwareId": "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"
  }'
```

## View Activation Logs

```bash
# View all activation attempts
cat data/activation-log.json | jq .

# View current licenses and activations
cat data/licenses.json | jq .
```

## Adding New License Keys

Edit `data/licenses.json`:

```json
{
  "SGTA-2025-PROD-0001": {
    "plan": "single",
    "maxActivations": 2,
    "activations": [],
    "createdAt": "2025-01-01T00:00:00.000Z",
    "revoked": false
  }
}
```

Restart the dev server to load new licenses.

## Production Build

```bash
# Build for production
npm run build

# Start production server
npm start

# Server runs on http://localhost:3000
```

## Environment Variables

Create `.env.local` (already created):

```env
JWT_SECRET=your-secret-key-here
```

**Important:** Change the JWT_SECRET before deploying to production!

## Pages

Visit these pages:
- **Homepage**: http://localhost:3000
- **Download**: http://localhost:3000/download
- **Purchase**: http://localhost:3000/purchase
- **Help**: http://localhost:3000/help

## Troubleshooting

### Port 3000 already in use

```bash
# Find process on port 3000
lsof -ti:3000

# Kill it
kill -9 $(lsof -ti:3000)

# Or use a different port
npm run dev -- -p 3001
```

### API returns "INTERNAL_ERROR"

Check the console logs in your terminal for detailed error messages.

### Licenses not saving

Make sure the `data/` directory exists and is writable:

```bash
ls -la data/
chmod 755 data/
```

## Next Steps

1. ✅ Website is running
2. ✅ API endpoints are functional
3. 📝 Read `API-README.md` for detailed API docs
4. 📝 Read `PROJECT-SUMMARY.md` for complete overview
5. 🚀 Deploy to Vercel/Netlify when ready

## Support

Questions? Check:
- `API-README.md` - API documentation
- `PROJECT-SUMMARY.md` - Full project overview
- `/app/help/page.tsx` - Help page implementation

---

**You're all set!** 🎉

The Sagitta website is now running with a fully functional license activation API.
