import { Box, Button, Image, Text } from '@chakra-ui/react'
import classNames from 'classnames'
import { createUseStyles } from 'react-jss'
import { Link } from 'react-router-dom'

import { H3 } from '../../../components/typography'
import { getPath } from '../../../constants'
import { GrantApplicant } from '../../../types'
import { getShortAmountLabel, useMobileMode } from '../../../utils'
import { useProjectFundingModal } from '../../projectFunding/hooks/useProjectFundingModal'
import { ProjectFundingModal } from '../../projectFunding/ProjectFundingModal'
import { AvatarElement } from '../../projectView/projectMainBody/components'
import { SectionCard } from './SectionCard'
import { WidgetItem } from './WidgetItem'

interface Props {
  applicants: Array<GrantApplicant>
  canVote: boolean
  title?: string
}

const useStyles = createUseStyles({
  desktopImage: {
    width: '144px',
  },
  mobileImage: {
    width: '90px',
  },
  image: {
    display: 'block',
    height: '101px',
  },
})

export const CommunityVoting = ({ applicants, canVote, title }: Props) => {
  const isMobile = useMobileMode()
  const classes = useStyles()
  const modalProps = useProjectFundingModal()

  if (!applicants) {
    return null
  }

  const sectionTitle =
    title || 'Let the Sats flow to your favorite projects. 1 Sat = 1 vote.'

  return (
    <SectionCard p={5}>
      <H3 fontSize="18px" mb={3}>
        {sectionTitle}
      </H3>
      {applicants.map(({ project, funding }) => {
        const projectLink = getPath('project', project.name)
        return (
          <SectionCard my={3} p={2} key={project.id}>
            <Box display="flex">
              {project.thumbnailImage && (
                <Box mr={3} height={'101px'}>
                  <Link
                    to={projectLink}
                    className={classNames(
                      classes.image,
                      isMobile ? classes.mobileImage : classes.desktopImage,
                    )}
                  >
                    <Image
                      objectFit="cover"
                      borderRadius="7px"
                      width={isMobile ? '90px' : '144px'}
                      height={'101px'}
                      src={project.thumbnailImage}
                      alt="project thumbnail"
                    />
                  </Link>
                </Box>
              )}
              <Box pr={2} flexGrow={1}>
                <Link to={projectLink}>
                  <H3 fontSize="18px">{project.title}</H3>
                </Link>
                <Link to={projectLink}>
                  <Text noOfLines={4}>{project.description}</Text>
                </Link>
              </Box>
              {!isMobile && (
                <Box
                  minWidth="166px"
                  pr={4}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  {canVote && (
                    <Button
                      onClick={() => modalProps.open({ project })}
                      height="51px"
                      variant="hugeContained"
                    >
                      Vote
                    </Button>
                  )}
                  <WidgetItem subtitle="worth of votes">
                    {getShortAmountLabel(funding.communityFunding || 0)}
                  </WidgetItem>
                </Box>
              )}
            </Box>
            <Box pl={2} filter="opacity(0.4)">
              {project.funders?.filter(Boolean).map(
                (funder) =>
                  funder && (
                    <AvatarElement
                      key={funder.id}
                      width="28px"
                      height="28px"
                      wrapperProps={{
                        display: 'inline-block',
                        marginLeft: '-5px',
                        marginTop: 2,
                      }}
                      avatarOnly
                      borderRadius="50%"
                      seed={funder.id}
                      user={funder.user}
                    />
                  ),
              )}
            </Box>
            {isMobile && (
              <Box display="flex" pl={6}>
                <Box pt={2}>
                  <WidgetItem subtitle="worth of votes">
                    {getShortAmountLabel(funding.communityFunding || 0)}
                  </WidgetItem>
                </Box>
                {canVote && (
                  <Box ml={8} flexGrow={1}>
                    <Button
                      onClick={() => modalProps.open({ project })}
                      mt={3}
                      height="57px"
                      variant="hugeContained"
                    >
                      Vote
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </SectionCard>
        )
      })}
      <ProjectFundingModal {...modalProps} />
    </SectionCard>
  )
}
