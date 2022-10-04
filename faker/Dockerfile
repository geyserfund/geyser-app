FROM apisguru/graphql-faker

ARG APOLLO_KEY

RUN apk add --update curl

RUN curl -sSL https://rover.apollo.dev/nix/latest | sh; /root/.rover/bin/rover graph fetch geyser-graph@staging > ./schema.sdl

ENTRYPOINT ["graphql-faker", "schema.sdl"]
