import {
  Box,
  HStack,
  Image,
  Text,
  Tooltip,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import classNames from 'classnames'
import { createUseStyles } from 'react-jss'
import { Link } from 'react-router-dom'

import { computeFunderBadges } from '../../../helpers'
import { UserProjectContribution } from '../../../types/generated/graphql'
import { Card, ICard } from '../../ui'

type Props = ICard & {
  className?: string
  contribution: UserProjectContribution
}

const useStyles = createUseStyles({
  container: {
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
    minWidth: '300px',
    marginLeft: '15px',
    paddingBottom: '10px',
    boxShadow:
      'rgba(50, 50, 93, 0.25) 0px 0px 12px -2px, rgba(0, 0, 0, 0.3) 0px 0px 7px -3px',
    '&:hover': {
      cursor: 'pointer',
      boxShadow:
        'rgba(60, 64, 67, 0.3) 0px 0px 2px 0px, rgba(60, 64, 67, 0.15) 0px 0px 3px 1px',
      '.rocketicon': {
        color: 'primary.400',
      },
    },

    transition: 'box-shadow 0.3s ease-in-out',
  },

  circularProgress: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    filter: 'drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.15))',
  },
})

export const ProjectContributionCard = ({
  contribution,
  className,
  ...rest
}: Props) => {
  const classes = useStyles()

  const { project } = contribution

  const imgSrc = project.thumbnailImage

  return (
    <Link to={`/project/${project.name}`}>
      <Card
        className={classNames(classes.container, className)}
        backgroundColor="neutral.0"
        {...rest}
      >
        <Box height="160px" width="100%" position="relative">
          <Image
            src={imgSrc || ''}
            height="100%"
            width="100%"
            objectFit="cover"
          />
        </Box>
        <VStack spacing="5px" width="100%" padding="10px">
          <HStack spacing="10px" justifyContent="flex-start" width="100%">
            <Text fontSize="16px" fontWeight={600}>
              {project.title}
            </Text>
          </HStack>
          <Text fontSize="12px" width="100%" height="35px" noOfLines={2}>
            {project.description}
          </Text>
          <HStack spacing="5px" width="100%"></HStack>
        </VStack>
        <Box width="100%" paddingX="10px">
          <RenderBadges contribution={contribution} />
        </Box>
      </Card>
    </Link>
  )
}

const RenderBadges = ({
  contribution,
}: {
  contribution: UserProjectContribution
}) => {
  const { project, funder, isSponsor, isFunder } = contribution
  const badges =
    isFunder && funder
      ? computeFunderBadges({
          creationDateStringOfFundedContent: project.createdAt,
          funder,
          useShortForm: false,
        })
      : []

  if (badges.length === 0) {
    badges.push({
      badge: 'Funder',
      description: 'The user funded this project!',
    })
  }

  if (isSponsor) {
    badges.push({
      badge: 'Sponsor',
      description: 'The user is a sponsor of this project!',
    })
  }

  return (
    <Wrap>
      {badges.map((badge) => (
        <WrapItem key={badge.badge}>
          <Tooltip label={badge.description}>
            <Box
              backgroundColor="#C9FFF5"
              padding="2px 10px"
              borderRadius="7px"
            >
              <Text fontSize="12px" fontWeight={500}>
                {badge.badge}
              </Text>
            </Box>
          </Tooltip>
        </WrapItem>
      ))}
    </Wrap>
  )
}
