## Graphql

This project uses Apollo GraphQL, a comprehensive GraphQL platform that provides a unified, graph-based layer to interact with your services.

### Apollo Studio

[Access Apollo Studio Dashboard](https://studio.apollographql.com/graph/geyser-graph/variant/staging/explorer) to get full insight into the project's schema.

### Using Codegen

Using Codegen to generate types in a norm in Geyser, it saves tons of time spent on creating input and response types for all graphQL queries and mutations, specially as a single graphql query could have multiple instances with different expected repsonses.
Codegen takes care of it all, generating easy to use pre-typed hooks for queries, lazyqueries, mutation and subscriptions. 

Following command helps you in creating types and react hooks for every document.

```bash
  yarn graph:generate:[env]
``` 

For example, running the command as `yarn graph:generate:staging` indicates `staging` as environment.
This would use `https://api.staging.geyser.fund/graphql` to validate and generate types for fragments, and functions for query, mutations and subscriptions.

Note: This process generates types and hooks for all documents located at src/graphql into `src/types/generated`
Note: For `development` the backend server is expected to be running at `http://localhost:4000`

### Leveraging Fragments

Using fragments during Codegen helps in generating types for fragments as well. This enhances development and ensures the availability of queried fields in React component props. 
To learn more about fragments [click here](https://www.apollographql.com/docs/react/data/fragments/).

Here is a sample fragment:

```ts
export const FRAGMENT_USER_ME = gql`
  fragment UserMe on User {
    id
    username
    email
  }
`
```

The fragment above would generate a counterpart type like:

```ts
export type UserMeFragment = {
  __typename?: 'User'
  id: any
  username: string
  email?: string | null
}
```

### Creating Queries

A query called `Me` using the previous fragment like this:

```ts
export const QUERY_ME = gql`
  ${FRAGMENT_USER_ME}
  query Me {
    me {
      ...UserMe
    }
  }
`
```

- Will generate a hook named `useMeQuery` and another `useMeLazyQuery`.

- These can be used as alternatives for `useQuery(QUERY_ME)` and `useLazyQuery(useMeLazyQuery)` along with type benefits.

- Both will return responses typed with `UserMeFragment`, with the exact same parameters we put up in the query, saving time to create and map types.

### Mutations

A mutation called `UpdateUser` like this:

```ts
export const MUTATION_UPDATE_USER = gql`
  ${FRAGMENT_USER_ME}
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      ...UserMe
    }
  }
`
```

- Will generate a hook named `useUpdateUserMutation`, and types named `UpdateUserInput` for input and `UserMeFragment` for the response.

- This hook is a replacement for `useMutation(MUTATION_UPDATE_USER)` along with type benefits.

- This hook will already know what the input types should be. Similarly the response of the mutation will also be typed.

### Using Mock TypeDefs

Sometimes, the GraphQL schema from our back-end `staging` environment will be late to adopt changes from its `development` environment that we know we'll want to be leveraging on the front-end. Apollo GraphQL allows us to account for this via [client-side mocking](https://www.apollographql.com/docs/react/development-testing/client-schema-mocking/).

[This PR](https://github.com/geyserfund/geyser-app/pull/459/files/fe0782ed6029dc4ded90c999e49fda1267376361#diff-e2b8491b4d090a7e9a32b2ae2e0f854802977754f8399cf05e0b57b624544bb4) contains an example of how mocking can be achieved -- with the important caveat that the file at [`src/config/apollo-client/customClientTypeDefs`](../../src/config/apollo-client/customClientTypeDefs.ts) is intended for local use only, and is part of the project's `.gitignore` specification.



## Forms

This project has `react-hook-form` installed, and it's transitioning to use on all the forms that require validation and other logic.

Some forms still have custom react state and validation, and it's okay for some features like search where it's only one or two fields.

Other forms that still use react state should be migrated to react-hook-form, given the nature that it handles validation out of the box using yup, and it has the form error and touched and dirty states available so we don't have to re-invent the wheel on this.

### Setup

To setup a form you first need to use the form state from `react-hook-form`:

```ts
const form = useForm({})
```

Values can be passed like

```ts
const form = useForm({ values: isEdit ? myCurrentData : DEFAULT_VALUES })
```

or default values like

```ts
const form = useForm({
  values: isEdit ? myCurrentData : undefined,
  defaultValues: DEFAULT_VALUES,
})
```

### Validation

Import necessary things:

```tsx
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
```

Create a schema

```tsx
const schema = yup.object({
  myField: yup.string().required('This is required, pleb!'),
})
```

Create a component and use the schema inside yupResolver

```tsx
const Component = () => {
  const { handleSubmit } = useForm({ resolver: yupResolver(schema) })
  const onSubmit = (values) => doSomething(values)
  const onError = () => hadErrors()
  return <form onSubmit={handleSubmit(onSubmit, onError)} />
}
```

### Form Practices

We can then use the submit like this:

```tsx
return (
  <form onSubmit={form.handleSubmit((values) => doSomething(values))}>
    <button type="submit" />
  </form>
)
```

This button with type submit inside a form will make it submit on ENTER key pressed as well as clicking it and it's better for SEO as well.

### Form Components

Form components located at `src/forms` are already setup to use with `react-hook-form` together with `chakra` by passing only the form's `control`




## State Management ( Jotai )

We've recently included [Jotai](https://jotai.org/docs/core/atom) as one of the modular tools for handling state managment. Jotai creates modular atoms and derived atoms that are accessible throughout the app through the atom. 

Our strategy is to migrate a large part of context overheads to Jotai for more effective state management. This move aims to boost the speed of state updates and renders.

In any situation where a new state is needed across multiple scopes, we recommend using Jotai `Atoms`. Jotai’s primitive and declarative API makes handling complex state needs more manageable. It facilitates splitting the global state into a collection of distributed but well synchronized atoms, bringing more efficient and maintainable state management to the project.


## Asset Handling


Images uploaded by creators in Geyser are automatically resized into three distinct sizes: small, medium, and large. These images share the same URL, differentiated by postfixes such as `image_small.webp`, `image_medium.webp` and `image_large.webp`.

For instance, if a user uploads an image named 'profile.png', it's uploaded, and the returned value is the small image in the format `https://geyserbucket...../profile_image_small.webp`. This process is automatic, allowing us to add the image directly to the database without manual manipulation.

However, there are situations where a larger image size is required, like in a project thumbnail popup. In such cases, the small image URL needs to be converted to a large image URL, i.e., `https://geyserbucket...../profile_image_large.webp`.

To facilitate this, we've provided functions in the utils folder: `toLargeImageUrl`, `toMediumImageUrl`, and `toSmallImageUrl`. These functions can be used to display images of different sizes as necessary. Even if the incoming image size is unknown, these functions act as filters, ensuring the correct image size renders.


## Storybook

We use storybook for showcasing all of the components, starting out with the base UI components like buttons, inputs, to complex ones like activity panel.
This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export

