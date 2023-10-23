
## Graphql

This project uses Apollo Graphql

### Apollo Studio

Visit the [Apollo Studio Dashboard](https://studio.apollographql.com/graph/geyser-graph/variant/staging/explorer) to see the entire schema

### Codegen

Run `yarn graph:generate [env]` where env is usually the `staging` environment

`yarn graph:generate staging`

This will generate not only the types but also react hooks for every document, including the lazy counterparts for the queries.

! All documents located at `src/graphql` will get their types and hooks generated into `src/types/generated`

### Fragments

Codegen will also generate types for fragments, so it's really useful and important to use fragments in documents whenever possible.

This allows developers to use the specific fragments that are being queried or returned from mutations and subscriptions in React component props, so that it is ensured that the fields are there.

Take this example fragment

```ts
export const FRAGMENT_USER_ME = gql`
  fragment UserMe on User {
    id
    username
    email
  }
`
```

It will generate the following type:

```ts
export type UserMeFragment = {
  __typename?: 'User'
  id: any
  username: string
  email?: string | null
}
```

### Queries

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

You can then use the submit like this:

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
