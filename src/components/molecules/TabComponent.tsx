import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  TabProps,
  Tabs,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { dimensions, ID } from '../../constants'
import { MobileDivider } from '../../pages/grants/components'
import { useMobileMode } from '../../utils'
import { StickToTop } from '../layouts'

interface TabComponentProps {
  tabs: RenderTab[]
}

export type RenderTab = {
  title: string
  sub?: string | number
  Component: () => JSX.Element
}

export const TabComponent = ({ tabs }: TabComponentProps) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  return (
    <Tabs
      id={ID.profile.tabs}
      display="flex"
      flexDirection="column"
      h="full"
      variant="unstyled"
      size="sm"
      w="full"
    >
      <StickToTop
        id={ID.profile.tabList}
        wrapperId={ID.profile.tabs}
        width="100%"
        offset={dimensions.topNavBar.desktop.height}
        backgroundColor={isMobile ? 'neutral.0' : 'neutral.50'}
        disable={!isMobile}
      >
        <MobileDivider mb={2} />
        <TabList w="100%" paddingY="10px" px={'10px'}>
          {tabs.map(({ title, sub }) => {
            return (
              <Tab key={title} {...tabButtonStyles}>
                {t(title)}
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
        <MobileDivider mt={2} />
      </StickToTop>

      <TabPanels
        height={{ base: '100%', lg: `calc(100% - 74px)` }}
        flex="1"
        marginTop="22px"
      >
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
