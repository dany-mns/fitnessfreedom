# Fitness Freedom

| Folder    | Stack                                                    |
|-----------|----------------------------------------------------------|
| `ui-web`  | React 19, Vite, Tailwind 4                               |
| `backend` | Java 25, Spring Boot 4.1, PostgreSQL 18, Flyway, Docker  |

## Local development

```bash
./dev.sh
```

Starts PostgreSQL in Docker, the backend and the frontend on http://localhost:5173. `Ctrl+C` stops the backend and frontend; `./dev.sh down` stops the database. On first run it creates `backend/.env` from `.env.example` with a random `ADMIN_API_KEY`; change `DB_PORT` and `PORT` there if those ports are taken.

The Vite dev server proxies `/api` to `http://localhost:8080`. Override with `VITE_DEV_API_PROXY` if the backend runs elsewhere. In production builds set `VITE_API_URL` to the backend origin.

Run the backend together with the database in Docker: `docker compose --profile app up -d --build`.

## Campaign forms

Each campaign form lives at `/form/<slug>` (Romanian) and `/en/form/<slug>` (English), for example `/form/christmas?utm_source=instagram`.

Forms are defined in `ui-web/src/config/forms.ts`. Every form always asks for full name and phone number (with country prefix); extra questions go in `fields` and support `text`, `textarea`, `email`, `number`, `select`, `radio` and `checkbox`. Adding a new entry is all that is needed: the backend registers the campaign on its first submission.

Each submission stores the campaign, the client (deduplicated by phone number in E.164 format), the answers as JSONB, the language and where the visitor came from.

## Traffic attribution

When a visitor lands on any page of the site, the following are captured and kept for 30 days in the browser, so they are still attributed if they open a form later:

- `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
- ad click IDs: `gclid` (Google), `fbclid` (Facebook/Instagram), `ttclid` (TikTok)
- the external referrer (the website they came from) and the landing page

A new visit with tags or from another website replaces the previous attribution; direct visits keep it.

Example links:

```
https://fitnessfreedom.ro/form/christmas?utm_source=instagram&utm_medium=story&utm_campaign=xmas-2026
https://fitnessfreedom.ro/form/sixpack?utm_source=tiktok&utm_medium=video&utm_campaign=sixpack-jan&utm_content=reel-1
https://fitnessfreedom.ro/?utm_source=newsletter&utm_medium=email&utm_campaign=xmas-2026
```

`GET /api/admin/campaigns/{slug}/sources` groups submissions by source: `utm_source` first, then the click ID platform, then the referrer domain, otherwise `direct`.

## Backend API

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
