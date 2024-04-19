import { Box, Button, Text } from '@chakra-ui/react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { createUseStyles } from 'react-jss'
import { Link } from 'react-router-dom'

import { CardLayout } from '../../../../components/layouts'
import { H3 } from '../../../../components/typography'
import { ImageWithReload } from '../../../../components/ui'
import { getPath } from '../../../../constants'
import { ProjectFundingModal } from '../../../../modules/project/pages/projectFunding/components/ProjectFundingModal'
import { AvatarElement } from '../../../../modules/project/pages/projectView/views/projectMainBody/components'
import { fonts } from '../../../../styles'
import { GrantApplicant, GrantApplicantFunding, GrantStatusEnum, Project } from '../../../../types'
import { getShortAmountLabel, useMobileMode } from '../../../../utils'
import { WidgetItem } from '../../components/WidgetItem'
import { useProjectFundingModal } from '../components/useProjectFundingModal'

interface Props {
  applicants: Array<GrantApplicant>
  grantHasVoting?: boolean
  grantStatus: string
  title: string
  isClosed?: boolean
  fundingOpenStartDate: number
  fundingOpenEndDate: number
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

export const CommunityVoting = ({
  fundingOpenStartDate,
  fundingOpenEndDate,
  applicants,
  grantHasVoting,
  grantStatus,
  title,
  isClosed,
}: Props) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  const classes = useStyles()
  const modalProps = useProjectFundingModal()

  if (!applicants) {
    return null
  }

  const canVote = grantHasVoting && grantStatus === GrantStatusEnum.FundingOpen

  const renderWidgetItem = (funding: GrantApplicantFunding) => {
    return (
      <WidgetItem subtitle={!isClosed ? t('worth of votes') : t('distributed')}>
        {getShortAmountLabel(
          !isClosed ? funding.communityFunding : funding.grantAmount + funding.communityFunding || 0,
        )}
      </WidgetItem>
    )
  }

  const renderButton = (project: Project) => {
    if (canVote) {
      return (
        <Button
          onClick={() => modalProps.onOpen({ project })}
          height="51px"
          width="100%"
          size="xl"
          textTransform="uppercase"
          fontFamily={fonts.livvic}
          variant="primary"
        >
          {t('Vote')}
        </Button>
      )
    }

    if (grantStatus !== GrantStatusEnum.Closed) {
      return (
        <Button as={Link} to={getPath('project', project.name)} size={'sm'} variant={'primary'}>
          {t('View project')}
        </Button>
      )
    }
  }

  return (
    <CardLayout noMobileBorder p={{ base: '10px', lg: '20px' }} spacing={{ base: '10px', lg: '20px' }} w="full">
      <H3 fontSize="18px">{t(title)}</H3>
      {applicants.map(({ project, funding }) => {
        const projectLink = getPath('project', project.name)
        const currentFunders = project.funders.filter(
          (funder) => funder && funder.confirmedAt > fundingOpenStartDate && funder.confirmedAt <= fundingOpenEndDate,
        )
        return (
          <CardLayout p={2} key={project.id}>
            <Box display="flex">
              {
                <Box mr={3} height={{ base: '90px', lg: '144px' }}>
                  <Link
                    to={projectLink}
                    className={classNames(classes.image, isMobile ? classes.mobileImage : classes.desktopImage)}
                  >
                    <ImageWithReload
                      objectFit="cover"
                      borderRadius="7px"
                      width={isMobile ? '90px' : '144px'}
                      height={isMobile ? '90px' : '144px'}
                      src={project.thumbnailImage || ''}
                      alt="project thumbnail"
                    />
                  </Link>
                </Box>
              }
              <Box pr={2} flexGrow={1}>
                <Link to={projectLink}>
                  <H3 fontSize="18px">{project.title}</H3>
                </Link>
                <Link to={projectLink}>
                  <Text noOfLines={4} wordBreak="break-word">
                    {project.shortDescription}
                  </Text>
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
                  {renderButton(project)}
                  {(grantHasVoting || isClosed) && renderWidgetItem(funding)}
                </Box>
              )}
            </Box>
            {canVote && currentFunders.length > 0 && (
              <Box pl={2} filter="opacity(0.4)">
                {currentFunders.map(
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
            )}
            {isMobile && renderButton(project)}
          </CardLayout>
        )
      })}
      <ProjectFundingModal {...modalProps} />
    </CardLayout>
  )
}
