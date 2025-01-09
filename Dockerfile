###########################
# STEP 1: create base image  
###########################
ARG NODE_VERSION=20
FROM --platform=linux/amd64 node:${NODE_VERSION}-alpine AS base

##############################
# STEP 2: install dependencies
##############################
FROM base AS dependencies

WORKDIR /usr/app

# Copy only files needed for installation
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn

# Set yarn version
RUN yarn set version berry

# Create a layer for node_modules that can be cached
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn \
    yarn workspaces focus -A --production && \
    cp -R node_modules prod_node_modules && \
    yarn install


#####################
# STEP 3: build image
#####################
FROM dependencies AS build

WORKDIR /usr/app

# Copy source files
COPY . .

# Build arguments
ARG VITE_APP_API_ENDPOINT
ARG VITE_APP_FLODESK_API_KEY
ARG VITE_APP_AIR_TABLE_KEY
ARG VITE_APP_GIPHY_API_KEY
ARG VITE_APP_GEYSER_NOSTR_PUBKEY
ARG VITE_APP_ENV
ARG VITE_APP_AUTH_SERVICE_ENDPOINT
ARG VITE_APP_BOLTZ_SWAP_DOMAIN
ARG VITE_APP_LNG_PORT
ARG VITE_APP_STRIPE_API_KEY

# Build application
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn \
    printenv > .env && \
    NODE_OPTIONS=--max-old-space-size=8192 yarn build && \
    yarn exec tsc server.ts

# Clean up source files
RUN rm -rf ./src

###########################
# STEP 4: production image
###########################
FROM base AS production

WORKDIR /usr/app

# Copy only necessary files
COPY --from=build /usr/app/package.json /usr/app/yarn.lock ./
COPY --from=build /usr/app/prod_node_modules ./node_modules
COPY --from=build /usr/app/dist ./dist
COPY --from=build /usr/app/server.js ./server.cjs

CMD ["node", "-r", "dotenv/config", "server.cjs"]