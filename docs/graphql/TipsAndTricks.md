# GraphQL Tips & Tricks 🕸

## Using Mock TypeDefs

Sometimes, the GraphQL schema from our back-end `staging` environment will be late to adopt changes from its `development` environment that we know we'll want to be leveraging on the front-end. Apollo GraphQL allows us to account for this via [client-side mocking](https://www.apollographql.com/docs/react/development-testing/client-schema-mocking/).

[This PR](https://github.com/geyserfund/geyser-app/pull/459/files/fe0782ed6029dc4ded90c999e49fda1267376361#diff-e2b8491b4d090a7e9a32b2ae2e0f854802977754f8399cf05e0b57b624544bb4) contains an example of how mocking can be achieved -- with the important caveat that the file at [`src/config/apollo-client/customClientTypeDefs`](../../src/config/apollo-client/customClientTypeDefs.ts) is intended for local use only, and is part of the project's `.gitignore` specification.
