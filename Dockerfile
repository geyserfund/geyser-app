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
COPY ./src ./src
RUN yarn build
RUN rm -rf ./src

###########################
# STEP 4: production image
###########################
FROM base AS production

WORKDIR /usr/app

# Copy production dependencies over
COPY --from=dependencies /usr/app/prod_node_modules ./node_modules
COPY --from=build /usr/app/build ./build

CMD yarn start