# Base image for Node.js
FROM node:20 AS base

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# Dependencies stage
FROM base AS deps
WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

RUN yarn --immutable

# Build stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN yarn build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 torbox-plex

COPY --from=builder --chown=torbox-plex:nodejs /app/config ./config
COPY --from=builder --chown=torbox-plex:nodejs /app/dist ./
COPY --from=builder --chown=torbox-plex:nodejs /app/node_modules ./
COPY --from=builder --chown=torbox-plex:nodejs /app/package.json ./

COPY --chown=torbox-plex:nodejs ./prisma ./prisma
COPY --chown=torbox-plex:nodejs ./entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

USER torbox-plex

ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["node", "app.cjs"]