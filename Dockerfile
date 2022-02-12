# pull official base image
ARG NODE_VERSION=16
FROM --platform=linux/amd64 node:${NODE_VERSION}-alpine AS appbuild

# set working directory
WORKDIR /usr/app

# install app dependencies
COPY package.json yarn.lock ./
RUN yarn install --silent

# add app
COPY . .

# start app
CMD yarn start