# Style Guidelines

## Framework

Chakra is the project's UI framework

### Responsive

Our project follows responsive design principles to ensure seamless user experience across various screen sizes. The breakpoints are defined in Chakra's theme at `src/config/theme/theme.ts`. Here are the defined breakpoints:

```
sm: '30em', // around 480px
md: '48em', // around 768px
lg: '57em', // around 900px, desktop-sized 
xl: '80em', // around 1280px
2xl: '96em', // around 1536px
```

Although breakpoints for different screen sizes are available, we mainly use `lg` as our starting point for desktop versions, anything below `lg` is considered for mobile view. These two are the primary breakpoints used across the project.

#### Component Responsive Styling (Chakra)

Responsive CSS is primarily implemented at the individual component levels with Chakra. When configuring the stylesheet, consider a situation where you need to specify the `marginTop` property. Instead of passing a value directly, pass Chakra's responsive object: `{ base: 0, lg: 5 }`. This ensures that the margin is seen only on desktop views.

#### Other component responsive styling

For situations where you need responsiveness in controlling logic or hiding/showing elements, use the `useMobileMode` hook to retrieve the `isMobile` boolean.

For unique breakpoints, use Chakra's useBreakpointValue hook as shown:

```ts
const isMd = useBreakpointValue({ base: false, md: true }, { ssr: false })
```

Note: Ensure to set the ssr option to false to prevent any flicker during the first load.


### Color Mode

We use referential values for all colors throughout our application, ensuring easy updates when toggling between different color modes, namely dark and light.

To get an overview of our color chart, please refer to `src/styles/colors.ts`. The color palette mainly comprises `neutral` and `primary`.

1. ***Chakra Components Usage:***

Chakra UI components use these color values directly. Here is an example of how to assign a background color to a Chakra button:

```tsx
  <Button backgrounColor='primary.500' />
```

2. ***Non-Chakra Usage***
For non-Chakra components, we employ the `useCustomTheme` hook to avail dynamic colors. Here's how you can use it:
```tsx
    const {colors} = useCustomTheme()
    <RandomComponent style={{backgroundColor: colors.neutral[400]}} />
```

### Icon

We derive our icons from the [React Icons](https://react-icons.github.io/react-icons/) library, which provides a vast catalog of icons from multiple packages including Bootstrap, Ant Design, and more.

#### Custom SVG Icons

Besides the comprehensive range provided by React Icons, we also use custom SVG icons for inspiring and creatively unique symbols. We rely on Chakra's Icon component to create SVG icon components styled by the Chakra UI framework. Usage of such icons involves creating a new SVG component. Here is an example of a lightning bolt icon:

```tsx
    import { Icon } from "@chakra-ui/react"

    export const BoltIcon = (props) => (
    <Icon viewBox="0 0 200 200" {...props}>
        <path
        fill="currentColor"
        d="YOUR PATH HERE"
        />
    </Icon>
    )
```

### Styling Principles

we utilize two methods for defining styles: Chakra UI for Chakra components and React-JSS for other components. Here's a detailed breakdown of these principles:

1. Chakra Components Styling:

Chakra UI adopts a CSS-in-JS approach, providing a range of components with built-in styles and the capability to extend styles. This approach helps build custom modular components efficiently by adding styling directly to the Chakra components.
Learn more about [Chakra UI](https://chakra-ui.com/).

2. Non-Chakra Components (React-JSS):

For styling non-Chakra components, we adopt React-JSS, a library providing a useStyles hook that creates CSS-in-JS. This hook generates a classes object, which we can then use to style our components.
Learn more about [React-JSS](https://cssinjs.org/react-jss/?v=v10.10.0)

