## Styles

### Framework

Chakra is the project's UI framework

### Responsive

Breakpoints are set in chakra's theme at `src/config/theme/theme.ts`

```
sm: '30em', // 480px
md: '48em', // 768px
lg: '57em', // Desktop ~900px
xl: '80em', // 1280px
2xl: '96em', // 1536px
```

We mainly use `lg` as the starter for desktop, less than `lg` is considered mobile view, and those are the two main breakpoints used everywhere, except some specific places where it needed a special fit.

#### At component style level

Main way to use responsive css is at chakra component level, when passing a style prop like say for example `marginTop` you can instead of passing a value pass chakra's responsive object: `{ base: 0, lg: 5 }` so that only desktop would show margin-top.

#### At component logic

If you need responsiveness in logic or to hide and show elements, then you can use the hook
`useMobileMode` to get the boolean for isMobile.

If you need another specific breakpoint you can use chakra's hook:

`useBreakpointValue` like this:

```ts
const isMd = useBreakpointValue({ base: false, md: true }, { ssr: false })
```

! Note: set `ssr` option to `false` to avoid flicker on first load.