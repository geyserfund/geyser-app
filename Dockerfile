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

RUN yarn set version berry

# Install production packages
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
RUN yarn workspaces focus -A --production \
    && cp -R node_modules prod_node_modules \
    && yarn install 


#####################
# STEP 3: build image
#####################
FROM dependencies AS build

WORKDIR /usr/app
COPY ./public ./public
COPY ./src ./src
COPY index.html tsconfig.json tsconfig.node.json vite.config.ts .eslintrc.cjs .prettierrc ./

ARG VITE_APP_API_ENDPOINT
ARG VITE_APP_FLODESK_API_KEY
ARG VITE_APP_GIPHY_API_KEY
ARG VITE_APP_GEYSER_NOSTR_PUBKEY
ARG VITE_APP_ENV
ARG VITE_APP_AUTH_SERVICE_ENDPOINT
ARG VITE_APP_BOLTZ_SWAP_DOMAIN
ARG CI
ARG SENTRY_AUTH_TOKEN
RUN /bin/sh -c "printenv > .env && NODE_OPTIONS=--max-old-space-size=8192 yarn build --sourcemap=true"
RUN rm -rf ./src

###########################
# STEP 4: production image
###########################
FROM base AS production

WORKDIR /usr/app
COPY server.ts package.json yarn.lock ./

# Copy production dependencies over
COPY --from=build /usr/app/prod_node_modules ./node_modules
COPY --from=build /usr/app/dist ./dist

# RUN yarn global add serve
CMD node -r dotenv/config server.ts