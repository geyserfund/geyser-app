import { useQuery } from '@apollo/client'
import { Box, Button, Container, Image } from '@chakra-ui/react'
import { createUseStyles } from 'react-jss'
import { useParams } from 'react-router-dom'

import { BoltSvgIcon } from '../../components/icons'
import { Body1, H1, H3 } from '../../components/typography'
import { StatusLabel } from '../../components/ui/StatusLabel'
import { QUERY_PROJECTS } from '../../graphql'
import { OrderByOptions, Project, ProjectsGetQueryInput } from '../../types'
import { useMobileMode } from '../../utils'
import { CommunityVoting } from './components/CommunityVoting'
import { ContributionsWidget } from './components/ContributionsWidget'
import { DistributionChart } from './components/DistributionChart'
import { MoreInfo } from './components/MoreInfo'
import { SectionCard } from './components/SectionCard'

interface Props {
  grant: any
}

const GRANT = {
  imageUrl:
    'https://storage.googleapis.com/geyser-images-distribution-prod-us/geyser-thumbnail-2%20copy.jpg',
  applicants: [],
  balance: 1000,
  description:
    'This grant is for all projects creating bitcoin communities irl (in real life). In-person bitcoin spaces and meetups  allow for quality information to spread and enable the forging of deeper social networks. This in turn, results in a more resilient bitcoin network. We want to enable these creators to continue building grassroots bitcoin communities globally.',
  shortDescription:
    'A grant supporting bitcoin films where the community decides on the funds allocation.',
  sponsors: [],
  statuses: [],
  title: 'Communities & Meetups',
}

const useStyles = createUseStyles({
  container: {
    maxWidth: '879px',
  },
  imageContainer: {
    width: '100%',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderTopLeftRadius: '6px',
    borderTopRightRadius: '6px',
  },
})

type ResponseData = {
  projects: {
    projects: Project[]
  }
}

type QueryVariables = {
  input: ProjectsGetQueryInput
}

export const GrantPage = ({ grant = GRANT }: Props) => {
  const { grantId } = useParams<{ grantId: string }>()
  const isMobile = useMobileMode()
  const classes = useStyles()

  const { data: projectsResponseData, loading } = useQuery<
    ResponseData,
    QueryVariables
  >(QUERY_PROJECTS, {
    variables: {
      input: {
        pagination: {
          take: 5,
        },
        orderBy: [{ balance: OrderByOptions.Desc }],
      },
    },
  })

  if (loading || !grantId || !projectsResponseData?.projects) {
    return null
  }

  const { projects } = projectsResponseData.projects

  return (
    <Container className={classes.container} px={6}>
      <SectionCard>
        <Box
          className={classes.imageContainer}
          height={isMobile ? '127px' : '291px'}
        >
          <Image
            className={classes.headerImage}
            alt="grant header image"
            src={grant.imageUrl}
          />
        </Box>
        <Box p={5}>
          {isMobile ? null : (
            <Box pb={2}>
              <StatusLabel>ACTIVE</StatusLabel>
            </Box>
          )}
          <Box
            display="flex"
            flexDir={isMobile ? 'column' : 'row'}
            width="100%"
            pt={2}
            justifyContent="space-between"
          >
            <Box pt={2}>
              <H1>{grant.title}</H1>
            </Box>
            <Box pt={isMobile ? 4 : 2} justifySelf="end">
              <Button height={8} variant="outlined">
                <BoltSvgIcon mr={2} />
                grants@geyser.fund
              </Button>
            </Box>
          </Box>
          <Box pt={4}>
            <H3 fontSize="18px">{grant.shortDescription}</H3>
            <Body1 fontSize="16px" pt={4}>
              {grant.description}
            </Body1>
            <ContributionsWidget balance="10M" contributions="20M" />
          </Box>
        </Box>
      </SectionCard>
      <DistributionChart
        projects={projects.map((project) => ({
          ...project,
          // @TODO: Remove this prop once grants entity provides that info
          percentage: Math.round(Math.random() * 99),
        }))}
      />
      <CommunityVoting projects={projects} />
      <MoreInfo />
    </Container>
  )
}
