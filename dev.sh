#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
BACKEND="$ROOT/backend"
UI="$ROOT/ui-web"

if [[ "${1:-}" == "down" ]]; then
  docker compose --project-directory "$BACKEND" down
  exit 0
fi

if [[ ! -f "$BACKEND/.env" ]]; then
  sed "s/^ADMIN_API_KEY=.*/ADMIN_API_KEY=$(openssl rand -hex 24)/" "$BACKEND/.env.example" > "$BACKEND/.env"
  echo "Created backend/.env from .env.example"
fi
set -a
source "$BACKEND/.env"
set +a
PORT="${PORT:-8080}"

if [[ "$(uname)" == "Darwin" ]]; then
  export JAVA_HOME="$(/usr/libexec/java_home -v 25)"
fi

echo "Starting PostgreSQL on port ${DB_PORT:-5432}..."
docker compose --project-directory "$BACKEND" up -d --build --wait db

trap 'trap - EXIT; kill 0' EXIT INT TERM

echo "Starting backend on port $PORT..."
(cd "$BACKEND" && ./mvnw -q spring-boot:run) &

echo "Starting frontend on http://localhost:5173 ..."
(
  cd "$UI"
  [[ -d node_modules ]] || npm install
  VITE_DEV_API_PROXY="http://localhost:$PORT" npx vite --port 5173 --strictPort
) &

wait
