# Fitness Freedom

| Folder    | Stack                                                                      |
|-----------|----------------------------------------------------------------------------|
| `ui-web`  | React 19, Vite, Tailwind 4, Cloudflare Worker + D1 + Turnstile (deployed)  |
| `backend` | Java 25, Spring Boot 4.1, PostgreSQL 18, Flyway, Docker (not deployed)     |

## Website and lead form (`ui-web`)

The site is a static React app served by a Cloudflare Worker. The Worker only handles `POST /api/submissions`; every other path is served as a static asset. Everything runs on the Cloudflare free plan.

```
browser ──► Cloudflare Worker "fitnessfreedom"
              ├─ static assets (React build)
              └─ POST /api/submissions
                   ├─ rate limit: 10 requests / minute / IP
                   ├─ validation against src/config/forms.ts
                   ├─ Turnstile verification
                   └─ insert into D1 "fitnessfreedom" (EU jurisdiction)
```

### Local development

```bash
cd ui-web
cp .dev.vars.example .dev.vars
npm install
npx wrangler d1 migrations apply DB --local
npm run dev
```

`npm run dev` runs the site and the Worker together with a local D1 database. `.env.development` and `.dev.vars.example` contain Cloudflare's Turnstile test keys, which always pass.

### Deployment

Cloudflare Workers Builds deploys on every push to `main` (root directory `ui-web`, build command `npm run build`, deploy command `npm run deploy`). `npm run deploy` applies pending D1 migrations from `ui-web/migrations` and then deploys the Worker.

The Turnstile site key is public and lives in `ui-web/.env.production`. The secret key is stored only in Cloudflare as the Worker secret `TURNSTILE_SECRET_KEY`.

### Lead form

The application form lives at `/form/coaching` (Romanian) and `/en/form/coaching` (English). Its questions are defined in `ui-web/src/config/forms.ts`; the Worker validates submissions against the same definition, so adding or changing a question needs no backend change. A new form is a new entry in that file, available at `/form/<slug>`.

Every form asks for full name and phone number (with country prefix, stored in E.164 format). Extra questions support `text`, `textarea`, `email`, `number`, `select`, `radio` and `checkbox`.

### Viewing leads

Cloudflare dashboard → Storage & databases → D1 → `fitnessfreedom` → Console:

```sql
SELECT created_at, full_name, phone, source, utm_campaign, answers
FROM submissions
ORDER BY created_at DESC;

SELECT campaign, source, utm_campaign, COUNT(*) AS leads
FROM submissions
GROUP BY campaign, source, utm_campaign
ORDER BY leads DESC;
```

`source` is `utm_source` if present, otherwise the ad platform of the click ID (`google`, `facebook`, `tiktok`), otherwise the referrer domain, otherwise `direct`.

## Traffic attribution

When a visitor lands on any page of the site, the following are captured and kept for 30 days in the browser, so they are still attributed if they open a form later:

- `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
- ad click IDs: `gclid` (Google), `fbclid` (Facebook/Instagram), `ttclid` (TikTok)
- the external referrer (the website they came from) and the landing page

A new visit with tags or from another website replaces the previous attribution; direct visits keep it.

Example links:

```
https://fitnessfreedom.eu/form/coaching?utm_source=instagram&utm_medium=story&utm_campaign=xmas-2026
https://fitnessfreedom.eu/form/coaching?utm_source=tiktok&utm_medium=video&utm_campaign=jan-2027&utm_content=reel-1
https://fitnessfreedom.eu/?utm_source=newsletter&utm_medium=email&utm_campaign=xmas-2026
```

## Spring Boot backend (not deployed)

`./dev.sh` starts PostgreSQL in Docker, the backend and the frontend. The backend keeps the same submission API backed by PostgreSQL and adds admin endpoints:

| Method | Path                                         | Auth          |
|--------|----------------------------------------------|---------------|
| POST   | `/api/submissions`                           | public        |
| GET    | `/api/admin/campaigns`                       | `X-Admin-Key` |
| GET    | `/api/admin/campaigns/{slug}/submissions`    | `X-Admin-Key` |
| GET    | `/api/admin/campaigns/{slug}/sources`        | `X-Admin-Key` |

Admin endpoints are disabled until `ADMIN_API_KEY` is set.

```bash
curl -H "X-Admin-Key: $ADMIN_API_KEY" localhost:8080/api/admin/campaigns
```

## Configuration

| Variable               | Default                  |
|------------------------|--------------------------|
| `DB_HOST` / `DB_PORT`  | `localhost` / `5432`     |
| `DB_NAME` / `DB_USER`  | `fitnessfreedom`         |
| `DB_PASSWORD`          | `fitnessfreedom`         |
| `PORT`                 | `8080`                   |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:5173`  |
| `ADMIN_API_KEY`        | empty (admin disabled)   |

Tests use Testcontainers and need Docker running: `./mvnw test`.
