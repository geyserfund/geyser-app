
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

Will generate a hook named `useMeQuery` and another `useMeLazyQuery`.
Both will return responses typed with `UserMeFragment` saving time to map response to types.

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

Will generate a hook named `useUpdateUserMutation`, and types named `UpdateUserInput` for input and `UserMeFragment` for the response.
This hook will already know what the input types should be and is type script. Similarly the response of the mutation will also be typed.

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



## Architecture Goal 

The geyser-app is currently being restructured to improve maintainability, readability, and performance.
Guided by Domain Driven Design (DDD) principles and the Horizontal Split principle, we'll reorganize all pages and components into Modules.

### Project Structure
The base structure of the app would be introduced with the following folders among the existing ones:
- /src/shared
- /src/modules

#### Shared
This would contain all of the business-logic-less ui components, contants, helpers and utils, that would be required by the modules.

A general structure looks like:
1. `shared` package
    1. `components` 
        1. `ui`
        2. `layout`
        3. `input`
            1. `form`
            2. `elements`
    2. `constants`
    3. `utils`

#### Modules
We will have a module per domain, and a domain would consist of multiple pages, along with other tools. Based on the nature of pages and the difference in complexity. We have `views` inside `pages` that replicate a `pages` structure, so we can go as deeply nested as needed.

 A general structure for modules looks like:

1.  `states` *( state manipulation / atoms )*
2.  `hooks` *( logic, and communication backend )*
3.   `components` *( ui and layout components )*
4.  `graphQL` *( fragment, queries definition )*
5.  `types` *( fragment types, query and mutation hooks )*
6.  `pages` 
	1.  `states`
	2.  `hooks`
	5.  `components`
	6. ` views`
        1.  *…recursive ( pages )*

Below are the planned modules and the pages that would go in them based on the pages that are currently in the app. 

1.  **project**
	1. `projectView`
	2. `projectCreate`
	3. `projectDashboard`
	4. `projectFunding`
	5. `entry`
2.  **discovery**
	1. `landing`
	2. `projectLeaderboard`
3.  **grants**
	1. `grantsLanding`
	2. `grantsPage`
4.  **profile**
	1. `profilePage`
	2. `profileSettings`
5.  **auth**
	1. `loginAuth`
	2. `otp`
6.  **general**
	1. `badges`
	2. `legal`
	3. `about`
	4. `fallback`

### Guiding Principles

These are some of the principles that drive us towards the architectural goal discussed above and is expected as we build geyser together:

1. *React Components (.tsx) inside `pages/views`, would have entire focus on the UI, with invocation of hooks to support them.*

	  This means, anything relating towards business-logic and state-management apart from low level boolean and store of value, will not be implemented inside the components, keeping UI components clean and easy to maintain.

2. *All state management logic will house inside `states` folder at coresponding layer ( pages/views/sections), and we use Jotai for state management.*

	  For boolean logic and simple store of value ( without any expected change or access at a different level), can use normal `useState` inside component itsself else use `Jotai` atoms, such that the state logic is abstracted away to the states folder.

3. *All communication logic (graphql/api), form logic, business logic would house inside the `hooks` folder, based on usecase.*

	  This hook would be used inside `pages/views`, to support the fuctionality for UI.

4. *Inside the `views` folder, we re-iterate the folder structure in `pages`.*

	  This can be left with bare-components without sub-folders, if the components are small with little to no business-logic.

5. *All the UI components would be housed inside `components` folder closes to it's implementation.*

	  If used in multiple places, the component would be placed inside the `components` folder of the closest parent. Similarly, components used in multiple modules will be kept in `shared` folder.