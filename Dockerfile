###########################
# STEP 1: create base image  
###########################
ARG NODE_VERSION=16
FROM --platform=linux/amd64 node:${NODE_VERSION}-alpine AS base


##############################
# STEP 2: install dependencies
##############################
FROM base AS dependencies

WORKDIR /usr/app

# Install production packages
COPY package.json yarn.lock ./
RUN yarn install --production
RUN cp -R node_modules prod_node_modules

# Install all packages (used for build and testing image in step 4)
RUN yarn install


#####################
# STEP 3: build image
#####################
FROM dependencies AS build

WORKDIR /usr/app
COPY ./public ./public
COPY ./src ./src
COPY tsconfig.json .eslintrc.js .prettierrc ./

ARG REACT_APP_API_ENDPOINT
ARG REACT_APP_AIR_TABLE_KEY
ARG REACT_APP_GIPHY_API_KEY
ARG REACT_APP_ENV
ARG REACT_APP_AUTH_SERVICE_ENDPOINT
RUN /bin/sh -c "printenv > .env && yarn build"
RUN rm -rf ./src

###########################
# STEP 4: production image
###########################
FROM base AS production

WORKDIR /usr/app
COPY server.ts package.json yarn.lock ./

# Copy production dependencies over
COPY --from=build /usr/app/prod_node_modules ./node_modules
COPY --from=build /usr/app/build ./build

# RUN yarn global add serve
CMD node -r dotenv/config server.ts
