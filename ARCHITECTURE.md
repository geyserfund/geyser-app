
## Graphql

This project uses Apollo GraphQL, a comprehensive GraphQL platform that provides a unified, graph-based layer to interact with your services.

### Apollo Studio

[Access Apollo Studio Dashboard](https://studio.apollographql.com/graph/geyser-graph/variant/staging/explorer) to get full insight into the project's schema.

### Using Codegen

Following command helps you in creating types and react hooks for every document, including its lazy counterpart for queries:

```bash
  yarn graph:generate [env]
``` 

For example, running the command as `yarn graph:generate staging` indicates `staging` as environment.
This would use `https://api.staging.geyser.fund/graphql` to validate and generate types for fragments, and functions for query, mutations and subscriptions.

Note: This process generates types and hooks for all documents located at src/graphql into `src/types/generated`

### Leveraging Fragments

Using fragments during Codegen helps in generating types for fragments as well. This enhances development and ensures the availability of queried fields in React component props. Here is a sample fragment:

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

Will generate a hook named `useMeQuery` and another `useMeLazyQuery` which will return the response typed with `UserMeFragment` and can be used in components that consume this information

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

Will generate a hook named `useUpdateUserMutation` which will know what the input type is for developer autocomplete and will return the typed fragment as well in the response.

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


### State Management ( Jotai )

We've recently included [Jotai](https://jotai.org/docs/core/atom) as one of the modular tools for handling state managment. Jotai creates modular atoms and derived atoms that are accessible throughout the app through the atom. 

Our strategy is to migrate a large part of context overheads to Jotai for more effective state management. This move aims to boost the speed of state updates and renders.

In any situation where a new state is needed across multiple scopes, we recommend using Jotai `Atoms`. Jotai’s primitive and declarative API makes handling complex state needs more manageable. It facilitates splitting the global state into a collection of distributed but well synchronized atoms, bringing more efficient and maintainable state management to the project.
