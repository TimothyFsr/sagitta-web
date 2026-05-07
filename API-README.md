# Sagitta License Activation API

This API handles license activation, validation, and deactivation for the Sagitta macOS app.

## Endpoints

### POST /api/activate

Activate a license key on a specific Mac.

**Request:**
```json
{
  "key": "SGTA-XXXX-XXXX-XXXX",
  "hardwareId": "sha256-hash-of-mac-serial-number"
}
```

**Response (Success):**
```json
{
  "success": true,
  "token": "jwt-token-here",
  "plan": "single",
  "activationsUsed": 1,
  "activationsMax": 2
}
```

**Error Responses:**
- `INVALID_KEY` - License key not found or invalid format
- `ALREADY_ACTIVATED` - This hardware ID is already activated
- `MAX_ACTIVATIONS_REACHED` - License activation limit reached
- `KEY_REVOKED` - License has been revoked
- `RATE_LIMIT_EXCEEDED` - Too many activation attempts (max 5 per hour per IP)

### POST /api/validate

Validate an activation token (called periodically by the app).

**Request:**
```json
{
  "token": "jwt-token-from-activation"
}
```

**Response (Success):**
```json
{
  "valid": true,
  "plan": "single",
  "activationsUsed": 1,
  "activationsMax": 2
}
```

**Response (Invalid):**
```json
{
  "valid": false,
  "reason": "KEY_REVOKED"
}
```

**Reasons:**
- `INVALID_TOKEN` - JWT signature invalid or expired
- `LICENSE_NOT_FOUND` - License no longer exists
- `KEY_REVOKED` - License has been revoked
- `NOT_ACTIVATED` - Hardware ID no longer in activation list

### POST /api/deactivate

Deactivate a license on a specific Mac (frees up an activation slot).

**Request:**
```json
{
  "key": "SGTA-XXXX-XXXX-XXXX",
  "hardwareId": "sha256-hash-of-mac-serial-number"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "License deactivated successfully"
}
```

**Error Responses:**
- `INVALID_KEY` - License key not found
- `NOT_ACTIVATED` - Hardware ID was not activated

## Security

- **JWT Tokens**: Signed with `JWT_SECRET` from `.env.local`
- **Rate Limiting**: Max 5 activation attempts per IP per hour
- **Hardware Binding**: License tied to SHA256 hash of Mac serial number
- **Logging**: All attempts logged to `/data/activation-log.json`

## Testing

A test license key is available for development:

```
Key: SGTA-TEST-DEMO-0001
Max Activations: 99
```

### Example cURL Commands

**Activate:**
```bash
curl -X POST http://localhost:3000/api/activate \
  -H "Content-Type: application/json" \
  -d '{
    "key": "SGTA-TEST-DEMO-0001",
    "hardwareId": "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"
  }'
```

**Validate:**
```bash
curl -X POST http://localhost:3000/api/validate \
  -H "Content-Type: application/json" \
  -d '{"token": "YOUR_JWT_TOKEN_HERE"}'
```

**Deactivate:**
```bash
curl -X POST http://localhost:3000/api/deactivate \
  -H "Content-Type: application/json" \
  -d '{
    "key": "SGTA-TEST-DEMO-0001",
    "hardwareId": "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"
  }'
```

## Database Structure

Licenses are stored in `/data/licenses.json`:

```json
{
  "SGTA-XXXX-XXXX-XXXX": {
    "plan": "single",
    "maxActivations": 2,
    "activations": [
      {
        "hardwareId": "sha256-hash",
        "activatedAt": "2025-01-01T00:00:00.000Z",
        "lastValidated": "2025-01-15T10:30:00.000Z"
      }
    ],
    "createdAt": "2025-01-01T00:00:00.000Z",
    "revoked": false
  }
}
```

## Adding New Licenses

To add a new license key, edit `/data/licenses.json`:

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

**Plans:**
- `single` - 2 Mac activations
- `pro` - 5 Mac activations
- `federation` - 99+ activations

## Migration to Real Database

For production, migrate to PostgreSQL/MySQL:

1. Create `licenses` table with columns: `key`, `plan`, `max_activations`, `created_at`, `revoked`
2. Create `activations` table with columns: `id`, `license_key`, `hardware_id`, `activated_at`, `last_validated`
3. Update `/lib/license-db.ts` to use SQL queries
4. Keep the same API interface
