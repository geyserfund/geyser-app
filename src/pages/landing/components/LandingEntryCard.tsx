import { Box, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { CardLayout, CardLayoutProps } from '../../../components/layouts'
import { H3 } from '../../../components/typography'
import { ImageWithReload } from '../../../components/ui'
import { getPath } from '../../../constants'
import { Entry } from '../../../types'
import { toSmallImageUrl } from '../../../utils'
import { AvatarElement } from '../../projectView/projectMainBody/components'
import { FundingStatWithFollow } from './FundingStatWithFollow'

interface LandingEntryCardProps extends CardLayoutProps {
  entry: Entry
  isMobile?: boolean
}

export const LandingEntryCard = ({
  entry,
  isMobile,
  ...rest
}: LandingEntryCardProps) => {
  const navigate = useNavigate()

  const getResponsiveValue = (value: any) => {
    if (isMobile) {
      return { base: value.base }
    }

    return value
  }

  return (
    <CardLayout
      hover
      onClick={() => navigate(getPath('entry', entry.id))}
      padding="0px"
      width={getResponsiveValue({ base: 'full', xl: '240px' })}
      direction={getResponsiveValue({ base: 'row', xl: 'column' })}
      spacing="0px"
      {...rest}
    >
      <Box
        width={getResponsiveValue({ base: '150px', xl: 'full' })}
        height={getResponsiveValue({ base: 'auto', xl: '200px' })}
      >
        <ImageWithReload
          grey
          width="100%"
          height="100%"
          objectFit="cover"
          src={toSmallImageUrl(`${entry.image}`)}
        />
      </Box>
      <VStack
        flex={1}
        width={getResponsiveValue({ base: 'auto', xl: '100%' })}
        minWidth={getResponsiveValue({ base: '170px', md: 'auto' })}
        padding="10px"
        alignItems="start"
        justifyContent="center"
        overflow="hidden"
      >
        <H3 isTruncated width="100%">
          {entry.title}
        </H3>
        <Box width="100%" overflow="hidden">
          <AvatarElement borderRadius="50%" user={entry.creator} noLink />
        </Box>
        <FundingStatWithFollow
          fundersCount={entry.fundersCount}
          amountFunded={entry.amountFunded}
          projectId={entry.project?.id}
          width="100%"
          justifyContent={
            isMobile
              ? 'start'
              : {
                  base: 'space-between',
                  sm: 'start',
                  xl: 'space-between',
                }
          }
          spacing={isMobile ? '30px' : { base: '0px', sm: '30px', xl: '0px' }}
        />
      </VStack>
    </CardLayout>
  )
}
