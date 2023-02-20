import { AddIcon } from '@chakra-ui/icons'
import { Box, HStack, Image, StackProps, Text, VStack } from '@chakra-ui/react'

import SatoshiPng from '../../assets/satoshi.png'
import { CardLayout } from '../../components/layouts'
import { H2, H3 } from '../../components/typography'
import { IconButtonComponent } from '../../components/ui'
import { colors, fonts } from '../../styles'
import { Owner, Project, User } from '../../types'
import { getShortAmountLabel } from '../../utils'
import { AvatarElement } from '../projectView/projectMainBody/components'

export const LandingProjectsPage = () => {
  return (
    <CardLayout w="full">
      <FeaturedProjectCard
        project={
          {
            title: 'The bushido of Bitcoin',
            shortDescription:
              'The best book ever written about Bitcoin is coming out very soon. Get ready for it! Aleks is going to be exploring the power of bitcoin from a new angle that you’ve never expected before',
            fundersCount: 30,
            balance: 3500000,
            owners: [
              {
                user: {
                  username: 'Svetski.info',
                  imageUrl: 'https://picsum.photos/200/300',
                } as User,
              } as Owner,
            ],
          } as Project
        }
      />
    </CardLayout>
  )
}

interface ProjectDiscoveryComponentComponent extends StackProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export const ProjectDiscoveryComponent = ({
  title,
  subtitle,
  children,
}: ProjectDiscoveryComponentComponent) => {
  return (
    <VStack alignItems="start">
      <H3 color="brand.primary600">
        <span color={colors.neutral800}>{subtitle}</span>
        {title}
      </H3>
      {children}
    </VStack>
  )
}

export const FeaturedProjectCard = ({ project }: { project: Project }) => {
  return (
    <ProjectDiscoveryComponent title="Featured Project" width="100%">
      <HStack width="100%" height="245px" alignItems="start" spacing="20px">
        <Box flex={4} height="100%" borderRadius="8px" overflow="hidden">
          <Image
            height="full"
            width="full"
            src="https://picsum.photos/200/300"
            objectFit="cover"
          ></Image>
        </Box>
        <VStack
          flex={3}
          height="100%"
          alignItems="start"
          justifyContent="start"
          spacing="10px"
          overflow="hidden"
        >
          <H2 color="brand.neutral700">{project.title}</H2>
          <AvatarElement user={project.owners[0].user} />
          <H3
            color="brand.neutral800"
            isTruncated
            noOfLines={5}
            wordBreak="break-all"
          >
            {project.shortDescription}
          </H3>
          <HStack
            mt={6}
            flex={1}
            direction={'row'}
            spacing="20px"
            align={'flex-end'}
            justifyContent={'space-between'}
          >
            <VStack alignItems={'center'}>
              <Text fontSize="16px" fontWeight={600} fontFamily={fonts.mono}>
                {project.fundersCount}
              </Text>

              <Text
                fontSize="12px"
                color={'brand.neutral600'}
                fontFamily={fonts.mono}
                textTransform="uppercase"
              >
                funders
              </Text>
            </VStack>

            <VStack alignItems={'center'}>
              <HStack spacing="3px">
                <Image src={SatoshiPng} height="20px" />
                <Text fontSize="16px" fontWeight={600} fontFamily={fonts.mono}>
                  {getShortAmountLabel(project.balance)}
                </Text>
              </HStack>
              <Text
                fontSize="12px"
                color={'brand.neutral600'}
                fontFamily={fonts.mono}
                textTransform="uppercase"
              >
                Funded
              </Text>
            </VStack>
            <IconButtonComponent
              aria-label="project-follow-icon"
              icon={<AddIcon />}
              borderRadius="8px"
            />
          </HStack>
        </VStack>
      </HStack>
    </ProjectDiscoveryComponent>
  )
}

interface ProjectFundingStatWithFollowProps extends StackProps {
  projectId: Project['id']
  fundersCount: Project['fundersCount']
  balance: Project['balance']
}

export const ProjectFundingStatWithFollow = ({
  projectId,
  fundersCount,
  balance,
}: ProjectFundingStatWithFollowProps) => {
  return (
    <HStack
      mt={6}
      flex={1}
      direction={'row'}
      spacing="20px"
      align={'flex-end'}
      justifyContent={'space-between'}
    >
      <VStack alignItems={'center'}>
        <Text fontSize="16px" fontWeight={600} fontFamily={fonts.mono}>
          {fundersCount}
        </Text>

        <Text
          fontSize="12px"
          color={'brand.neutral600'}
          fontFamily={fonts.mono}
          textTransform="uppercase"
        >
          funders
        </Text>
      </VStack>

      <VStack alignItems={'center'}>
        <HStack spacing="3px">
          <Image src={SatoshiPng} height="20px" />
          <Text fontSize="16px" fontWeight={600} fontFamily={fonts.mono}>
            {getShortAmountLabel(balance)}
          </Text>
        </HStack>
        <Text
          fontSize="12px"
          color={'brand.neutral600'}
          fontFamily={fonts.mono}
          textTransform="uppercase"
        >
          Funded
        </Text>
      </VStack>
      <IconButtonComponent
        aria-label="project-follow-icon"
        icon={<AddIcon />}
        borderRadius="8px"
      />
    </HStack>
  )
}
