import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  TabProps,
  Tabs,
} from '@chakra-ui/react'

interface TabComponentProps {
  tabs: RenderTab[]
}

export type RenderTab = {
  title: string
  sub?: string | number
  Component: () => JSX.Element
}

export const TabComponent = ({ tabs }: TabComponentProps) => {
  return (
    <Tabs
      display="flex"
      flexDirection="column"
      h="full"
      variant="unstyled"
      size="sm"
      w="full"
    >
      <TabList>
        {tabs.map(({ title, sub }) => {
          return (
            <Tab key={title} {...tabButtonStyles}>
              {title}
              {sub && (
                <Box
                  as="span"
                  ml="5px"
                  paddingX="7px"
                  backgroundColor="neutral.200"
                  borderRadius="4px"
                >
                  {sub}
                </Box>
              )}
            </Tab>
          )
        })}
      </TabList>
      <TabPanels height={`calc(100% - 64px)`} flex="1" marginTop="32px">
        {tabs.map(({ title, Component }) => {
          return (
            <TabPanel h="full" key={title} padding="0px">
              <Component />
            </TabPanel>
          )
        })}
      </TabPanels>
    </Tabs>
  )
}

const tabButtonStyles: TabProps = {
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: 400,
  flex: 1,
  _selected: { backgroundColor: 'neutral.100', fontWeight: 500 },
}
