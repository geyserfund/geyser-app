import {
  Box,
  Button,
  HStack,
  IconButton,
  Link,
  Stack,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'

import { AmbossIcon, BoltIcon, ShareIcon } from '../../../components/icons'
import { Body2, H3 } from '../../../components/typography'
import {
  Card,
  IconButtonComponent,
  ImageWithReload,
  ProjectStatusLabel,
  SatoshiAmount,
} from '../../../components/ui'
import { AmbossUrl, getPath, HomeUrl } from '../../../constants'
import { useAuthContext } from '../../../context'
import { getIconForLink } from '../../../helpers/getIconForLinks'
import { Project } from '../../../types/generated/graphql'
import { isActive, MarkDown, useMobileMode } from '../../../utils'
import { AvatarElement } from './AvatarElement'
import { ProjectLightningQR } from './ProjectLightningQR'

export const ProjectDetailsCard = ({
  project,
  fundButtonFunction,
}: {
  project: Project & {
    wallets?: { connectionDetails?: { pubkey?: string } }[]
  }
  fundButtonFunction: any
}) => {
  const { user } = useAuthContext()
  const isMobile = useMobileMode()

  const [hasCopiedSharingLink, setHasCopiedSharingLink] = useState(false)
  const owner = project.owners[0]

  const handleShareButtonTapped = () => {
    const relativePath = getPath('project', project.name)

    navigator.clipboard.writeText(`${HomeUrl}${relativePath}`)
    setHasCopiedSharingLink(true)
  }

  const renderMilestone = () => {
    if (!project.milestones) {
      return null
    }

    const currentMilestone = project.milestones.find(
      (milestone) => Number(milestone?.amount) > project.balance,
    )

    if (!currentMilestone) {
      return null
    }

    return (
      <VStack alignItems="flex-start">
        <Text color="brand.neutral600">Next Milestone</Text>
        <HStack>
          <Text color="brand.neutral800">{`${currentMilestone?.name}: ${currentMilestone?.description} - `}</Text>
          <SatoshiAmount>
            {currentMilestone.amount - project.balance}
          </SatoshiAmount>
          <Text color="brand.neutral800"> to go.</Text>
        </HStack>
      </VStack>
    )
  }

  const renderYourFunding = () => {
    if (project.funders.length > 0) {
      const currentFund = project.funders.find(
        (funder) => funder?.user?.id === user.id,
      )

      if (!currentFund) {
        return null
      }

      return (
        <>
          {!isMobile && <Text color="brand.primary800">|</Text>}
          <HStack>
            <Text color="brand.primary800" fontWeight={500}>
              {'You contributed'}
            </Text>
            <SatoshiAmount color="brand.primary800" fontWeight={500}>
              {currentFund.amountFunded}
            </SatoshiAmount>
            <Text color="brand.primary800" fontWeight={500}>
              {' towards this project'}
            </Text>
          </HStack>
        </>
      )
    }

    return null
  }

  const renderContributorsCount = () => {
    const contributorsCount = project.funders.length
    return (
      <Text color="brand.primary800" fontWeight={500}>
        {contributorsCount}{' '}
        {contributorsCount === 1 ? 'contributor' : 'contributors'}
      </Text>
    )
  }

  const renderLinks = () => {
    if (project.links && project.links.length > 0) {
      return (
        <HStack>
          <Body2 semiBold color="brand.neutral600">
            Links
          </Body2>
          <HStack>
            {project.links.map((link) => {
              const icon = getIconForLink(link)
              return (
                <IconButtonComponent
                  aria-label="link-icon"
                  key={link}
                  as={Link}
                  href={link || ''}
                  isExternal
                >
                  {icon}
                </IconButtonComponent>
              )
            })}
          </HStack>
        </HStack>
      )
    }

    return null
  }

  return (
    <Card
      border="2px solid"
      borderColor="brand.neutral200"
      borderRadius="4px"
      boxShadow="none"
      shadow="sm"
    >
      <VStack position="relative">
        <Box width="100%" height="230px" overflow="hidden">
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
          borderRadius="12px"
          border="2px solid white"
          overflow="hidden"
          position="absolute"
          bottom="-30px"
          left="24px"
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
          <Stack
            direction={isMobile ? 'column' : 'row'}
            spacing="0px"
            justifyContent="space-between"
            width="100%"
          >
            <Text fontSize="30px" fontWeight={700}>
              {project.title}
            </Text>
            <ProjectStatusLabel project={project} />
          </Stack>

          <HStack
            flexWrap="wrap"
            justifyContent="start"
            alignItems="center"
            spacing={1}
          >
            <ProjectLightningQR project={project} />

            <Tooltip
              label={hasCopiedSharingLink ? 'Copied!' : 'Share Project'}
              placement="top"
              closeOnClick={false}
            >
              <IconButton
                size="sm"
                _hover={{
                  backgroundColor: 'none',
                  border: '1px solid #20ECC7',
                }}
                _active={{ backgroundColor: 'brand.primary' }}
                bg="none"
                icon={<ShareIcon />}
                aria-label="share"
                onClick={handleShareButtonTapped}
              />
            </Tooltip>
            {project.wallets &&
              project.wallets[0]?.connectionDetails?.pubkey && (
                <IconButton
                  size="sm"
                  _hover={{
                    backgroundColor: 'none',
                    border: '1px solid #20ECC7',
                  }}
                  _active={{ backgroundColor: 'brand.primary' }}
                  bg="none"
                  icon={<AmbossIcon fontSize="20px" />}
                  aria-label="share"
                  onClick={() =>
                    window
                      .open(
                        `${AmbossUrl}${project.wallets[0].connectionDetails.pubkey}`,
                        '_blank',
                      )
                      ?.focus()
                  }
                />
              )}
          </HStack>
        </VStack>
        <HStack>
          <H3>{project.shortDescription}</H3>
        </HStack>
        <HStack>
          <Body2 semiBold color="brand.neutral600">
            Creator
          </Body2>
          <AvatarElement user={owner.user} />
        </HStack>
        {renderLinks()}
        <VStack alignItems="flex-start">
          <Text color="brand.neutral600" textAlign="left">
            Objective
          </Text>
          <MarkDown color='"brand.neutral800"'>{project.description}</MarkDown>
        </VStack>
        {renderMilestone()}
        {project.funders.length > 0 && (
          <Stack
            direction={isMobile ? 'column' : 'row'}
            width="100%"
            justifyContent="center"
            alignItems={'center'}
          >
            {renderContributorsCount()}
            {renderYourFunding()}
          </Stack>
        )}
        {!isMobile && (
          <Button
            w="full"
            backgroundColor={
              isActive(project.status)
                ? 'brand.primary'
                : 'brand.grayPlaceholder'
            }
            leftIcon={<BoltIcon />}
            onClick={fundButtonFunction}
            isDisabled={isActive(project.status) === false}
          >
            Contribute
          </Button>
        )}
      </VStack>
    </Card>
  )
}
