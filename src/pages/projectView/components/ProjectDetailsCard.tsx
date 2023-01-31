import {
  Box,
  HStack,
  IconButton,
  Link,
  Stack,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { BsHeartFill, BsLink45Deg } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'

import { AmbossIcon, SatoshiIcon, ShareIcon } from '../../../components/icons'
import { Caption, H3, MonoBody1 } from '../../../components/typography'
import {
  Card,
  IconButtonComponent,
  ImageWithReload,
  ProjectStatusLabel,
} from '../../../components/ui'
import { AmbossUrl, getPath, HomeUrl } from '../../../constants'
import { useAuthContext } from '../../../context'
import { getIconForLink } from '../../../helpers/getIconForLinks'
import { colors } from '../../../styles'
import { Project } from '../../../types/generated/graphql'
import { getShortAmountLabel, MarkDown, useMobileMode } from '../../../utils'
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

  const renderYourFunding = () => {
    const currentFund = project.funders.find(
      (funder) => funder?.user?.id === user.id,
    )

    return (
      <HStack
        height="72px"
        w="100%"
        borderRadius="4px"
        backgroundColor="brand.neutral100"
        spacing="60px"
        justifyContent="center"
      >
        <VStack spacing="0px">
          <HStack spacing="5px">
            <BsHeartFill color={colors.neutral500} />
            <MonoBody1>
              {getShortAmountLabel(project.fundersCount || 0)}
            </MonoBody1>
          </HStack>
          <Caption>CONTRIBUTORS</Caption>
        </VStack>
        <VStack spacing="0px">
          <HStack spacing="5px">
            <SatoshiIcon scale={0.7} />
            <MonoBody1>{getShortAmountLabel(project.balance)}</MonoBody1>
          </HStack>
          <Caption>TOTAL CONTRIBUTED</Caption>
        </VStack>
        {currentFund && (
          <VStack spacing="0px">
            <HStack spacing="5px">
              <SatoshiIcon scale={0.7} />
              <MonoBody1>
                {getShortAmountLabel(currentFund.amountFunded || 0)}
              </MonoBody1>
            </HStack>

            <Caption>YOU CONTRIBUTED</Caption>
          </VStack>
        )}
      </HStack>
    )
  }

  const renderLinks = () => {
    if (project.links && project.links.length > 0) {
      return (
        <HStack spacing="12px">
          <Tooltip label={'Links'} placement="top">
            <Box>
              <BsLink45Deg color={colors.neutral600} fontSize="22px" />
            </Box>
          </Tooltip>
          <HStack>
            {project.links.map((link) => {
              const Icon = getIconForLink(link)
              return (
                <IconButtonComponent
                  size="sm"
                  variant="ghost"
                  aria-label="link-icon"
                  key={link}
                  as={Link}
                  href={link || ''}
                  isExternal
                  noBorder
                >
                  <Icon fontSize="20px" />
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
      backgroundColor="white"
      border="2px solid"
      borderColor="brand.neutral200"
      borderRadius="8px"
      boxShadow="none"
      shadow="sm"
    >
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
          <Stack
            direction={isMobile ? 'column' : 'row'}
            spacing="0px"
            justifyContent="space-between"
            width="100%"
          >
            <Text
              fontSize="30px"
              fontWeight={700}
              width="100%"
              wordBreak="break-all"
            >
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
        <HStack spacing="16px" alignItems="center">
          <Tooltip label={'Creator'} placement="top">
            <Box>
              <CgProfile color={colors.neutral600} fontSize="22px" />
            </Box>
          </Tooltip>
          <AvatarElement borderRadius="50%" user={owner.user} />
        </HStack>
        {renderLinks()}
        <VStack alignItems="flex-start">
          <MarkDown color='"brand.neutral800"'>{project.description}</MarkDown>
        </VStack>
        {renderYourFunding()}
      </VStack>
    </Card>
  )
}
