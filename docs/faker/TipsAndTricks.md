# GraphQL Faker Tips & Tricks

## Exploring the Schema

After starting up Docker with a GraphQL Faker configuration, a number of URLs will be
useful for debugging and making customizations to the GraphQL schema:

- Interactive Editor: <http://localhost:9002/editor>
- GraphQL API: <http://localhost:9002/graphql>
- GraphQL Voyager: <http://localhost:9002/voyager>

## Synching the Schema

When the schema is updated, you must manually refresh the schema used by `GraphQL-Faker`. You can do so by running:

`make faker-schema-refresh`

This is required because, at the moment, the schema is resolved at build time (ie: in the Dockerfile). At a later date,
this can be improved by resolving the schema at runtime and auto-restarting the GraphQL-Faker server on every schema change.

## Potential Setup "Gotchas"

### Rover may may fail to find the `APOLLO_KEY` in the `.env` file

#### Solutions

Try manually running `rover config auth`, and then entering your key.
