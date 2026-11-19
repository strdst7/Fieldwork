# ---- build stage -----------------------------------------------------------
# Debian slim for the build stage because Rollup's native parser is a per-libc
# optional dependency (@rollup/rollup-linux-x64-gnu vs -musl). Alpine builds work
# when the install includes it; a copied node_modules or an --omit=optional
# install is what leaves Rollup without a parser and stops the build.
FROM node:22-bookworm-slim AS build

WORKDIR /app

# Install dependencies from the lockfile for reproducible builds.
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# Build the static site. Output lands in /app/dist.
COPY . .
RUN npm run build

# ---- runtime stage ---------------------------------------------------------
FROM nginx:1.27-alpine AS runtime

# Static server config: gzip, asset caching, SPA fallback, health check.
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Remove the default nginx page and copy the freshly built site.
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
