import { useMutation, useQuery } from '@apollo/client'
import {
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Icon,
  Image,
  Link as ChakraLink,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Text,
  UnorderedList,
  useDisclosure,
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo, useState } from 'react'
import { PiCoinsDuotone, PiNewspaperDuotone, PiRocketLaunchDuotone } from 'react-icons/pi'
import { Link, useNavigate, useParams } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { useAuthContext } from '@/context'
import { useAuthModal } from '@/modules/auth/hooks/useAuthModal'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants'

import { DonationSponsorCTA } from '../components/DonationSponsorCTA'
import { MUTATION_IMPACT_FUND_APPLY, QUERY_IMPACT_FUND } from '../graphql/impactFunds'

type ImpactFundDetail = {
  id: string
  name: string
  tags: string[]
  title: string
  subtitle?: string | null
  description?: string | null
  heroImage?: string | null
  amountCommitted?: number | null
  donateProjectId?: string | null
  donateProject?: {
    id: string
    name: string
  } | null
  liveSponsors: Array<{
    id: string
    name: string
    image?: string | null
    url?: string | null
    amountContributedInSats: number
  }>
  archivedSponsors: Array<{
    id: string
    name: string
    image?: string | null
    url?: string | null
    amountContributedInSats: number
  }>
  fundedApplications: Array<{
    id: string
    amountAwardedInSats?: number | null
    awardedAt?: string | null
    contributionUuid?: string | null
    status: string
    project: {
      id: string
      title: string
      thumbnailImage?: string | null
      shortDescription?: string | null
    }
  }>
  metrics: {
    awardedTotalSats: number
    projectsFundedCount: number
  }
}

const getQuarterFromDate = (dateString: string): string => {
  const date = new Date(dateString)
  const quarter = Math.floor(date.getMonth() / 3) + 1
  const year = date.getFullYear()
  return `Q${quarter} ${year}`
}

export const ImpactFundDetailPage = () => {
  const { impactFundName } = useParams<{ impactFundName: string }>()
  const { user, isLoggedIn } = useAuthContext()
  const { loginOnOpen } = useAuthModal()
  const toast = useToast()
  const navigate = useNavigate()

  const projectModal = useDisclosure()
  const [selectedProjectId, setSelectedProjectId] = useState<string>('')

  const { data } = useQuery<{ impactFund: ImpactFundDetail }>(QUERY_IMPACT_FUND, {
    variables: { input: { where: { name: impactFundName ? decodeURIComponent(impactFundName) : '' } } },
    skip: !impactFundName,
  })

  const [apply, { loading: applying }] = useMutation(MUTATION_IMPACT_FUND_APPLY)

  const impactFund = data?.impactFund

  const ownedProjects = useMemo(
    () =>
      (user?.ownerOf || [])
        .map((owner) => owner.project)
        .filter((project): project is NonNullable<typeof project> => Boolean(project)),
    [user?.ownerOf],
  )

  const handleApplyClick = () => {
    if (!isLoggedIn) {
      loginOnOpen({ showLightning: false })
      return
    }

    if (ownedProjects.length === 0) {
      navigate(getPath('launchStart'))
      return
    }

    setSelectedProjectId(String(ownedProjects[0]?.id || ''))
    projectModal.onOpen()
  }

  const submitApplication = async () => {
    if (!impactFund || !selectedProjectId) return

    try {
      await apply({
        variables: {
          input: { impactFundId: impactFund.id, projectId: selectedProjectId },
        },
      })

      toast({ status: 'success', title: t('Application submitted') })
      projectModal.onClose()
    } catch (error) {
      toast({ status: 'error', title: t('Failed to apply to impact fund') })
    }
  }

  if (!impactFund) {
    return null
  }

  return (
    <VStack align="stretch" spacing={14}>
      <Head
        title={impactFund.title}
        description={impactFund.subtitle || undefined}
        image={impactFund.heroImage || undefined}
      />

      {/* Hero Section */}
      <VStack align="stretch" spacing={6}>
        {impactFund.heroImage && (
          <Image
            src={impactFund.heroImage}
            alt={impactFund.title}
            w="full"
            maxH="300px"
            objectFit="cover"
            borderRadius="lg"
          />
        )}
        <VStack align="stretch" spacing={4}>
          <Flex justify="space-between" align="center" gap={4} flexWrap="wrap">
            <Text fontSize="3xl" fontWeight="bold" color="gray.900">
              {impactFund.title}
            </Text>
            {impactFund.amountCommitted && (
              <Text fontSize="3xl" fontWeight="bold" color="orange.500">
                ₿ {new Intl.NumberFormat().format(impactFund.amountCommitted)}
              </Text>
            )}
          </Flex>
          {impactFund.tags.length > 0 && (
            <HStack spacing={2} flexWrap="wrap">
              {impactFund.tags.map((tag) => (
                <Box
                  key={tag}
                  px={3}
                  py={1}
                  borderRadius="full"
                  bg="primary1.100"
                  color="primary1.800"
                  border="1px solid"
                  borderColor="primary1.200"
                >
                  <Body size="sm" bold>
                    {tag}
                  </Body>
                </Box>
              ))}
            </HStack>
          )}
          {impactFund.description && (
            <Body size="lg" color="gray.600">
              {impactFund.description}
            </Body>
          )}
        </VStack>
      </VStack>

      {/* Impact Metrics Section */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <Box
          p={6}
          bg="gray.50"
          borderRadius="lg"
          transition="all 0.3s"
          _hover={{ bg: 'gray.100', transform: 'translateY(-2px)' }}
        >
          <HStack spacing={4}>
            <Flex w="48px" h="48px" align="center" justify="center" bg="primary1.100" borderRadius="lg" flexShrink={0}>
              <Icon as={PiCoinsDuotone} boxSize={6} color="primary1.600" />
            </Flex>
            <VStack align="start" spacing={0}>
              <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                ₿ {new Intl.NumberFormat().format(impactFund.metrics.awardedTotalSats)}
              </Text>
              <Body size="xs" color="gray.500" textTransform="uppercase" letterSpacing="wide" fontWeight="medium">
                {t('Awarded so far')}
              </Body>
            </VStack>
          </HStack>
        </Box>
        <Box
          p={6}
          bg="gray.50"
          borderRadius="lg"
          transition="all 0.3s"
          _hover={{ bg: 'gray.100', transform: 'translateY(-2px)' }}
        >
          <HStack spacing={4}>
            <Flex w="48px" h="48px" align="center" justify="center" bg="primary1.100" borderRadius="lg" flexShrink={0}>
              <Icon as={PiRocketLaunchDuotone} boxSize={6} color="primary1.600" />
            </Flex>
            <VStack align="start" spacing={0}>
              <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                {impactFund.metrics.projectsFundedCount}
              </Text>
              <Body size="xs" color="gray.500" textTransform="uppercase" letterSpacing="wide" fontWeight="medium">
                {t('Projects funded')}
              </Body>
            </VStack>
          </HStack>
        </Box>
        <Box
          p={6}
          bg="gray.50"
          borderRadius="lg"
          transition="all 0.3s"
          _hover={{ bg: 'gray.100', transform: 'translateY(-2px)' }}
        >
          <HStack spacing={4}>
            <Flex w="48px" h="48px" align="center" justify="center" bg="primary1.100" borderRadius="lg" flexShrink={0}>
              <Icon as={PiNewspaperDuotone} boxSize={6} color="primary1.600" />
            </Flex>
            <VStack align="start" spacing={0}>
              <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                {t('Yearly')}
              </Text>
              <Body size="xs" color="gray.500" textTransform="uppercase" letterSpacing="wide" fontWeight="medium">
                {t('Impact & Transparency Report')}
              </Body>
            </VStack>
          </HStack>
        </Box>
      </SimpleGrid>

      {/* Application Submission Section */}
      <Box p={8} bg="gray.50" borderRadius="xl" borderWidth="1px" borderColor="gray.200">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'stretch', md: 'center' }}
          gap={6}
        >
          <VStack align="start" spacing={2} flex={1}>
            <H2 size="lg" bold>
              {t('Apply for funding')}
            </H2>
            <Body color="gray.600">
              {t('Submit your project to be considered for funding. Share your vision and impact potential.')}
            </Body>
          </VStack>
          <Button size="lg" colorScheme="primary1" onClick={handleApplyClick} flexShrink={0}>
            {t('Submit Your Application')}
          </Button>
        </Flex>
      </Box>

      {/* Projects Awarded Section */}
      <VStack align="stretch" spacing={6}>
        <H2 size="xl" bold>
          {t('Projects Awarded')}
        </H2>
        {impactFund.fundedApplications.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {impactFund.fundedApplications.map((application) => (
              <Card
                key={application.id}
                as={Link}
                to={getPath('project', application.project.id)}
                overflow="hidden"
                cursor="pointer"
                transition="all 0.3s"
                _hover={{
                  transform: 'translateY(-4px)',
                  shadow: 'xl',
                }}
                borderWidth="0"
                bg="white"
              >
                {application.project.thumbnailImage && (
                  <Image
                    src={application.project.thumbnailImage}
                    alt={application.project.title}
                    w="full"
                    h="200px"
                    objectFit="cover"
                  />
                )}
                <VStack align="stretch" spacing={3} p={5}>
                  <Flex align="baseline" gap={2} flexWrap="wrap">
                    <H2 size="md" bold flex="1" minW="0">
                      {application.project.title}
                    </H2>
                    {application.amountAwardedInSats !== null && application.amountAwardedInSats !== undefined && (
                      <Body bold color="primary1.600" size="sm" flexShrink={0}>
                        ₿ {new Intl.NumberFormat().format(application.amountAwardedInSats)}
                      </Body>
                    )}
                    {application.awardedAt && (
                      <>
                        <Body color="gray.400" size="sm">
                          •
                        </Body>
                        <Body size="sm" color="gray.500" flexShrink={0}>
                          {getQuarterFromDate(application.awardedAt)}
                        </Body>
                      </>
                    )}
                  </Flex>
                  {application.project.shortDescription && (
                    <Body size="sm" color="gray.600" noOfLines={2}>
                      {application.project.shortDescription}
                    </Body>
                  )}
                </VStack>
              </Card>
            ))}
          </SimpleGrid>
        ) : (
          <Box p={8} bg="gray.50" borderRadius="lg">
            <VStack spacing={2}>
              <Body size="lg" color="gray.500">
                {t('No projects have been awarded yet')}
              </Body>
              <Body size="sm" color="gray.400">
                {t('Check back soon to see funded projects')}
              </Body>
            </VStack>
          </Box>
        )}
      </VStack>

      {/* Sponsors Section */}
      <VStack align="stretch" spacing={8}>
        <H2 size="xl" bold>
          {t('Sponsors')}
        </H2>

        <VStack align="stretch" spacing={10}>
          {/* Current Sponsors */}
          {impactFund.liveSponsors.length > 0 ? (
            <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing={6}>
              {impactFund.liveSponsors.map((sponsor) => (
                <Box key={sponsor.id}>
                  {sponsor.url ? (
                    <ChakraLink href={sponsor.url} isExternal _hover={{ textDecoration: 'none' }}>
                      <Box
                        p={5}
                        bg="white"
                        borderRadius="lg"
                        transition="all 0.3s"
                        _hover={{
                          transform: 'translateY(-4px)',
                          shadow: 'lg',
                        }}
                        cursor="pointer"
                        height="full"
                      >
                        {sponsor.image && (
                          <Box w="full" h="80px" display="flex" alignItems="center" justifyContent="center">
                            <Image src={sponsor.image} alt={sponsor.name} maxW="full" maxH="80px" objectFit="contain" />
                          </Box>
                        )}
                      </Box>
                    </ChakraLink>
                  ) : (
                    <Box p={5} bg="white" borderRadius="lg" height="full">
                      {sponsor.image && (
                        <Box w="full" h="80px" display="flex" alignItems="center" justifyContent="center">
                          <Image src={sponsor.image} alt={sponsor.name} maxW="full" maxH="80px" objectFit="contain" />
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            <Box p={6} bg="gray.50" borderRadius="lg">
              <Body color="gray.500">{t('No active sponsors at the moment')}</Body>
            </Box>
          )}

          {/* Past Sponsors */}
          {impactFund.archivedSponsors.length > 0 && (
            <VStack align="stretch" spacing={5}>
              <H2 size="lg" color="gray.700">
                {t('Past')}
              </H2>
              <Wrap spacing={4}>
                {impactFund.archivedSponsors.map((sponsor) => (
                  <WrapItem key={sponsor.id}>
                    <Box px={4} py={2} bg="gray.100" borderRadius="md" borderWidth="1px" borderColor="gray.200">
                      <Body size="sm" color="gray.600" fontWeight="medium">
                        {sponsor.name}
                      </Body>
                    </Box>
                  </WrapItem>
                ))}
              </Wrap>
            </VStack>
          )}
        </VStack>
      </VStack>

      {/* Donation & Sponsor Section */}
      <DonationSponsorCTA
        title={t('Support this fund')}
        description={t(
          'This fund is open for donations. Support impactful projects by donating or becoming a sponsor.',
        )}
        donateProjectName={impactFund.donateProject?.name}
      />

      <Modal isOpen={projectModal.isOpen} onClose={projectModal.onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('Submit your application')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack align="stretch" spacing={5}>
              <Body color="gray.700">
                {t('You must submit your Geyser project as the application. Your project should include')}:
              </Body>

              <UnorderedList spacing={3} ml={4} color="gray.600">
                <ListItem>
                  <Body size="sm" color="gray.600">
                    {t('A clear description of your project vision and goals')}
                  </Body>
                </ListItem>
                <ListItem>
                  <Body size="sm" color="gray.600">
                    {t('The intended impact and how it aligns with the fund')}
                  </Body>
                </ListItem>
                <ListItem>
                  <Body size="sm" color="gray.600">
                    {t('Examples of past work or relevant experience')}
                  </Body>
                </ListItem>
              </UnorderedList>

              {ownedProjects.length > 0 ? (
                <VStack align="stretch" spacing={3}>
                  <Body fontWeight="semibold" color="gray.800">
                    {t('Select your project')}:
                  </Body>
                  <Select value={selectedProjectId} onChange={(e) => setSelectedProjectId(e.target.value)} size="lg">
                    {ownedProjects.map((project) => (
                      <option key={String(project.id)} value={String(project.id)}>
                        {project.title}
                      </option>
                    ))}
                  </Select>
                </VStack>
              ) : (
                <Box
                  p={6}
                  bg="primary1.50"
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor="primary1.200"
                  textAlign="center"
                >
                  <VStack spacing={4}>
                    <Body color="gray.700">
                      {t("You don't have any projects yet. Create a project to apply for funding.")}
                    </Body>
                    <Button
                      as={Link}
                      to={getPath('launchStart')}
                      colorScheme="primary1"
                      size="md"
                      onClick={projectModal.onClose}
                    >
                      {t('Create a Project')}
                    </Button>
                  </VStack>
                </Box>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            {ownedProjects.length > 0 && (
              <Button w="full" colorScheme="primary1" isLoading={applying} onClick={submitApplication} size="lg">
                {t('Submit Application')}
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  )
}
