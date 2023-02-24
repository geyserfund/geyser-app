import { Link, useMatch } from 'react-router-dom'

import { CardLayout } from '../../../components/layouts'
import { Body1 } from '../../../components/typography'
import { getPath } from '../../../constants'

export const TabBar = () => {
  const isCurrentTabProjects = useMatch(getPath('landingPage'))

  return (
    <CardLayout padding="10px" direction="row" width="100%">
      <Body1
        as={Link}
        to={getPath('landingPage')}
        flex={1}
        textAlign="center"
        backgroundColor={isCurrentTabProjects ? 'brand.neutral100' : 'white'}
        borderRadius="8px"
        padding="5px"
      >
        Projects
      </Body1>
      <Body1
        as={Link}
        to={getPath('landingFeed')}
        flex={1}
        textAlign="center"
        borderRadius="8px"
        padding="5px"
        backgroundColor={!isCurrentTabProjects ? 'brand.neutral100' : 'white'}
      >
        Activity
      </Body1>
    </CardLayout>
  )
}
