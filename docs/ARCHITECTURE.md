## Architecture Goal 

The geyser-app is currently being restructured to improve maintainability, readability, and performance.
Guided by Domain Driven Design (DDD) principles and the Vertical Split principle, we'll reorganize all pages and components into Modules.
Learn more about [DDD in geyser.](https://www.notion.so/geyser/Domain-Driven-Design-DDD-8c080fee21c644569e99ce1d0d9e8e99)
Learn more about [Vertical Split principle](https://x.com/TkDodo/status/1749717832642736184?s=20)

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
  Project module will contain all the pages relating to creating, viewing, updating, and contributing to a project, including entries for the project.

2.  **discovery**
  Discovery module is focused on pages that would be used for pages that show cases projects and things associated with projects such that users can discover interesting projects.

3.  **grants**
  Grants module will contain all pages realting to grants.

4.  **profile**
	Profile module houses pages realting to user profile including profile settings pages.

5.  **auth**
  Auth module houses pages and components focused towards, login, authentication and verification.

6.  **general**
  General module consists of any pages that don't fall under the above categories, mostly static pages.


### Guiding Principles

These are some of the principles that drive us towards the architectural goal discussed above and is expected as we build geyser together:

1. *React Components (.tsx) inside `pages/views`, would have entire focus on the UI, with invocation of hooks to support them.*

	  This means, anything relating towards business-logic and state-management apart from low level boolean and store of value, will not be implemented inside the components, keeping UI components clean and easy to maintain.

2. *All state management logic will house inside `states` folder at coresponding layer ( pages/views/sections), and we use Jotai for state management.*

	  For boolean logic and simple store of value ( without any expected change or access at a different level), can use normal `useState` inside component itsself else use `Jotai` atoms, such that the state logic is abstracted away to the states folder.
    Learn more about jotai in our [Coding Guidelines](/docs/CODING_GUIDELINES.md).

3. *All communication logic (graphql/api), form logic, business logic would house inside the `hooks` folder, based on usecase.*

	  This hook would be used inside `pages/views`, to support the fuctionality for UI.

4. *Inside the `views` folder, we re-iterate the folder structure in `pages`.*

	  This can be left with bare-components without sub-folders, if the components are small with little to no business-logic.

5. *All the UI components would be housed inside `components` folder closes to it's implementation.*

	  If used in multiple places, the component would be placed inside the `components` folder of the closest parent. Similarly, components used in multiple modules will be kept in `shared` folder.
