import {
  Box,
  ButtonProps,
  HStack,
  IconButton,
  Stack,
  Text,
  Tooltip,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useState } from 'react'
import { AiOutlineCalendar } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { FiTag } from 'react-icons/fi'
import { SlLocationPin } from 'react-icons/sl'
import { Link } from 'react-router-dom'

import { AmbossIcon, ShareIcon } from '../../../../components/icons'
import { CardLayout } from '../../../../components/layouts'
import { Body2, H3 } from '../../../../components/typography'
import { ImageWithReload, ProjectStatusLabel } from '../../../../components/ui'
import { AmbossUrl, getPath, HomeUrl } from '../../../../constants'
import { useProjectContext } from '../../../../context'
import { colors } from '../../../../styles'
import { MarkDown, toInt, useMobileMode } from '../../../../utils'
import { getPossibleWalletPubkey } from '../../../../utils/validations/wallet'
import {
  AvatarElement,
  FollowButton,
  LightningAddress,
  ProjectFundingQR,
  ProjectFundingSummary,
  ProjectLinks,
  ProjectMenu,
  SummaryInfoLine,
  TagBox,
} from '../components'

export const Summary = () => {
  const isMobile = useMobileMode()

  const { project, isProjectOwner } = useProjectContext()

  const [hasCopiedSharingLink, setHasCopiedSharingLink] = useState(false)

  if (!project) {
    return null
  }

  const owner = project.owners[0]

  const handleShareButtonTapped = () => {
    const relativePath = getPath('project', project.name)

    navigator.clipboard.writeText(`${HomeUrl}${relativePath}`)
    setHasCopiedSharingLink(true)
  }

  return (
    <CardLayout padding="0px">
      <VStack position="relative">
        <Box
          width="100%"
          height="230px"
          overflow="hidden"
          backgroundColor="white"
        >
          <ImageWithReload
            grey
            width="100%"
            height="100%"
            src={project.image || undefined}
            maxH="210px"
            objectFit="cover"
          />
        </Box>
        <Box
          width="155px"
          height="155px"
          borderRadius="8px"
          border="2px solid white"
          overflow="hidden"
          position="absolute"
          bottom="-30px"
          left="24px"
          backgroundColor="white"
        >
          <ImageWithReload
            grey
            width="100%"
            height="100%"
            src={project.thumbnailImage || undefined}
            maxH="230px"
            objectFit="cover"
          />
        </Box>
      </VStack>
      <VStack
        marginTop="10px"
        padding="24px"
        alignItems="flex-start"
        width="100%"
        spacing="18px"
      >
        <VStack width="100%" spacing="10px" alignItems="flex-start">
          <HStack width="100%">
            <Stack
              flex="1"
              direction={isMobile ? 'column' : 'row'}
              spacing="0px"
              justifyContent="space-between"
              overflow="hidden"
            >
              <Text fontSize="30px" fontWeight={700} wordBreak="break-word">
                {project.title}
              </Text>

              <ProjectStatusLabel project={project} />
            </Stack>
            {isProjectOwner && <ProjectMenu projectName={project.name} />}
          </HStack>

          <HStack
            flexWrap="wrap"
            justifyContent="start"
            alignItems="center"
            spacing={1}
          >
            <LightningAddress name={`${project.name}@geyser.fund`} />
            <ProjectFundingQR project={project} />
            <Tooltip
              label={hasCopiedSharingLink ? 'Copied!' : 'Share Project'}
              placement="top"
              closeOnClick={false}
            >
              <IconButton
                {...greenBorderButtonStyles}
                icon={<ShareIcon />}
                aria-label="share"
                onClick={handleShareButtonTapped}
              />
            </Tooltip>
            {project.wallets && getPossibleWalletPubkey(project.wallets[0]) && (
              <Tooltip
                label="Lightning Node"
                placement="top"
                closeOnClick={false}
              >
                <IconButton
                  {...greenBorderButtonStyles}
                  icon={<AmbossIcon fontSize="20px" />}
                  aria-label="share"
                  onClick={() =>
                    getPossibleWalletPubkey(project.wallets[0]) &&
                    window
                      .open(
                        `${AmbossUrl}${getPossibleWalletPubkey(
                          project.wallets[0],
                        )}`,
                        '_blank',
                      )
                      ?.focus()
                  }
                />
              </Tooltip>
            )}
            <FollowButton projectId={project.id} />
          </HStack>
        </VStack>
        <HStack>
          <H3>{project.shortDescription}</H3>
        </HStack>
        <SummaryInfoLine
          label="Creator"
          icon={
            <span>
              <CgProfile color={colors.neutral600} fontSize="22px" />
            </span>
          }
        >
          <AvatarElement borderRadius="50%" user={owner?.user} />
        </SummaryInfoLine>

        <ProjectLinks links={project.links as string[]} />
        <Wrap spacing="18px">
          {project.tags?.length > 0 && (
            <SummaryInfoLine
              label="Tags"
              icon={
                <span>
                  <FiTag color={colors.neutral600} fontSize="22px" />
                </span>
              }
              alignItems="start"
            >
              <Wrap>
                {project.tags.map((tag) => {
                  return (
                    <Link
                      key={tag.id}
                      to={getPath('landingPage')}
                      state={{ filter: { tagIds: [tag.id] } }}
                    >
                      <TagBox>{tag.label}</TagBox>
                    </Link>
                  )
                })}
              </Wrap>
            </SummaryInfoLine>
          )}

          {(project.location?.country?.name || project.location?.region) && (
            <SummaryInfoLine
              label="Region"
              icon={
                <span>
                  <SlLocationPin color={colors.neutral600} fontSize="22px" />
                </span>
              }
            >
              <Wrap spacing="5px">
                {project?.location?.country?.name &&
                  project.location.country.name !== 'Online' && (
                    <Link
                      key={project?.location?.country?.name}
                      to={getPath('landingPage')}
                      state={{
                        filter: {
                          countryCode: project?.location?.country?.code,
                        },
                      }}
                    >
                      <TagBox>{project?.location?.country?.name}</TagBox>
                    </Link>
                  )}
                {project?.location?.region && (
                  <Link
                    key={project?.location?.region}
                    to={getPath('landingPage')}
                    state={{
                      filter: {
                        region: project?.location?.region,
                      },
                    }}
                  >
                    <TagBox>{project?.location?.region}</TagBox>
                  </Link>
                )}
              </Wrap>
            </SummaryInfoLine>
          )}

          <SummaryInfoLine
            label="Launched"
            icon={
              <span>
                <AiOutlineCalendar color={colors.neutral600} fontSize="22px" />
              </span>
            }
          >
            <Body2
              semiBold
              color={colors.neutral600}
            >{`Launched ${DateTime.fromMillis(
              toInt(project.createdAt),
            ).toFormat('dd LLL yyyy')}`}</Body2>
          </SummaryInfoLine>
        </Wrap>

        <VStack alignItems="flex-start">
          <MarkDown color='"brand.neutral800"'>{project.description}</MarkDown>
        </VStack>
        <ProjectFundingSummary project={project} />
      </VStack>
    </CardLayout>
  )
}

const greenBorderButtonStyles: ButtonProps = {
  size: 'sm',
  _hover: {
    backgroundColor: 'none',
    border: '1px solid #20ECC7',
  },
  _active: { backgroundColor: 'brand.primary' },
  bg: 'none',
}
