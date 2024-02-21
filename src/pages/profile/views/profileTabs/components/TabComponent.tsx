import { Box, Stack, Tab, TabList, TabPanel, TabPanels, TabProps, Tabs } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { SkeletonLayout, StickToTop } from '../../../../../components/layouts'
import { dimensions, ID } from '../../../../../constants'
import { useMobileMode } from '../../../../../utils'
import { MobileDivider } from '../../../../grants/components'

interface TabComponentProps {
  tabs: RenderTab[]
  isLoading?: boolean
}

export type RenderTab = {
  title: string
  sub?: string | number
  isLoading?: boolean
  renderComponent: JSX.Element
}

export const TabComponent = ({ tabs, isLoading }: TabComponentProps) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  return (
    <Tabs id={ID.profile.tabs} display="flex" flexDirection="column" h="full" variant="unstyled" size="sm" w="full">
      <StickToTop
        id={ID.profile.tabList}
        wrapperId={ID.profile.tabs}
        width="100%"
        offset={dimensions.topNavBar.desktop.height}
        backgroundColor={isMobile ? 'neutral.0' : 'neutral.50'}
        disable={!isMobile}
      >
        <MobileDivider mb={2} />
        <TabList
          w="100%"
          padding="10px"
          border={{ base: 'none', lg: '2px solid' }}
          borderColor={{ base: 'none', lg: 'neutral.200' }}
          borderRadius="8px"
          background="neutral.0"
          as={Stack}
          spacing="10px"
          overflowX="auto"
        >
          {isLoading ? (
            <SkeletonLayout w="full" height="32px" />
          ) : (
            tabs.map(({ title, sub, isLoading }) => {
              if (isLoading) {
                return (
                  <Tab key={title} {...tabButtonStyles} p={0} isDisabled>
                    <SkeletonLayout key={title} height="100%" />
                  </Tab>
                )
              }

              return (
                <Tab key={title} {...tabButtonStyles}>
                  {t(title)}
                  {sub ? (
                    <Box as="span" ml="5px" paddingX="7px" backgroundColor="neutral.200" borderRadius="4px">
                      {sub}
                    </Box>
                  ) : null}
                </Tab>
              )
            })
          )}
        </TabList>
        <MobileDivider mt={2} />
      </StickToTop>

      <TabPanels height={{ base: '100%', lg: `calc(100% - 74px)` }} flex="1" marginTop="22px">
        {tabs.map(({ title, renderComponent }) => {
          return (
            <TabPanel h="full" key={title} padding="0px">
              {renderComponent}
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
