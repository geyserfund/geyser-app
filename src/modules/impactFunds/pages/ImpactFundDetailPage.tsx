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
  Spinner,
  UnorderedList,
  useColorModeValue,
  useDisclosure,
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
import { getPath } from '@/shared/constants/index.ts'
import { useImpactFundApplyMutation, useImpactFundQuery } from '@/types'
import { useNotification } from '@/utils'

import { DonationSponsorCTA } from '../components/DonationSponsorCTA.tsx'

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
  const { success, error: notifyError } = useNotification()
  const navigate = useNavigate()
  const surfaceBg = useColorModeValue('neutral1.1', 'neutral1.8')
  const mutedBg = useColorModeValue('neutral1.2', 'neutral1.7')
  const primaryTextColor = useColorModeValue('neutral1.11', 'neutral1.1')
  const secondaryTextColor = useColorModeValue('neutral1.9', 'neutral1.7')
  const emphasisTextColor = useColorModeValue('primary1.9', 'primary1.6')

  const projectModal = useDisclosure()
  const [selectedProjectId, setSelectedProjectId] = useState<string>('')

  const { data, loading, error } = useImpactFundQuery({
    variables: { input: { where: { name: impactFundName ? decodeURIComponent(impactFundName) : '' } } },
    skip: !impactFundName,
  })

  const [apply, { loading: applying }] = useImpactFundApplyMutation()

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

      success({ title: t('Application submitted') })
      projectModal.onClose()
    } catch (error) {
      notifyError({ title: t('Failed to apply to impact fund') })
    }
  }

  if (loading) {
    return (
      <VStack align="stretch" spacing={14}>
        <Card p={8}>
          <VStack py={8}>
            <Spinner />
          </VStack>
        </Card>
      </VStack>
    )
  }

  if (error) {
    return (
      <VStack align="stretch" spacing={14}>
        <Card p={8}>
          <Body>{t('Failed to load impact fund.')}</Body>
        </Card>
      </VStack>
    )
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
            <H2 size="3xl" bold color={primaryTextColor}>
              {impactFund.title}
            </H2>
            {impactFund.amountCommitted !== null && impactFund.amountCommitted !== undefined && (
              <H2 size="3xl" bold color={emphasisTextColor}>
                ₿ {new Intl.NumberFormat().format(impactFund.amountCommitted)}
              </H2>
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
            <Body size="lg" color={secondaryTextColor}>
              {impactFund.description}
            </Body>
          )}
        </VStack>
      </VStack>

      {/* Impact Metrics Section */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <Box
          p={6}
          bg={mutedBg}
          borderRadius="lg"
          transition="all 0.3s"
          _hover={{ bg: 'gray.100', transform: 'translateY(-2px)' }}
        >
          <HStack spacing={4}>
            <Flex w="48px" h="48px" align="center" justify="center" bg="primary1.100" borderRadius="lg" flexShrink={0}>
              <Icon as={PiCoinsDuotone} boxSize={6} color="primary1.600" />
            </Flex>
            <VStack align="start" spacing={0}>
              <H2 size="xl" bold color={primaryTextColor}>
                ₿ {new Intl.NumberFormat().format(impactFund.metrics.awardedTotalSats)}
              </H2>
              <Body size="xs" color="gray.500" textTransform="uppercase" letterSpacing="wide" fontWeight="medium">
                {t('Awarded so far')}
              </Body>
            </VStack>
          </HStack>
        </Box>
        <Box
          p={6}
          bg={mutedBg}
          borderRadius="lg"
          transition="all 0.3s"
          _hover={{ bg: 'gray.100', transform: 'translateY(-2px)' }}
        >
          <HStack spacing={4}>
            <Flex w="48px" h="48px" align="center" justify="center" bg="primary1.100" borderRadius="lg" flexShrink={0}>
              <Icon as={PiRocketLaunchDuotone} boxSize={6} color="primary1.600" />
            </Flex>
            <VStack align="start" spacing={0}>
              <H2 size="xl" bold color={primaryTextColor}>
                {impactFund.metrics.projectsFundedCount}
              </H2>
              <Body size="xs" color="gray.500" textTransform="uppercase" letterSpacing="wide" fontWeight="medium">
                {t('Projects funded')}
              </Body>
            </VStack>
          </HStack>
        </Box>
        <Box
          p={6}
          bg={mutedBg}
          borderRadius="lg"
          transition="all 0.3s"
          _hover={{ bg: 'gray.100', transform: 'translateY(-2px)' }}
        >
          <HStack spacing={4}>
            <Flex w="48px" h="48px" align="center" justify="center" bg="primary1.100" borderRadius="lg" flexShrink={0}>
              <Icon as={PiNewspaperDuotone} boxSize={6} color="primary1.600" />
            </Flex>
            <VStack align="start" spacing={0}>
              <H2 size="xl" bold color={primaryTextColor}>
                {t('Yearly')}
              </H2>
              <Body size="xs" color="gray.500" textTransform="uppercase" letterSpacing="wide" fontWeight="medium">
                {t('Impact & Transparency Report')}
              </Body>
            </VStack>
          </HStack>
        </Box>
      </SimpleGrid>

      {/* Application Submission Section */}
      <Box p={8} bg={mutedBg} borderRadius="xl" borderWidth="1px" borderColor="gray.200">
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
            <Body color={secondaryTextColor}>
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
                bg={surfaceBg}
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
                    <Body size="sm" color={secondaryTextColor} noOfLines={2}>
                      {application.project.shortDescription}
                    </Body>
                  )}
                </VStack>
              </Card>
            ))}
          </SimpleGrid>
        ) : (
          <Box p={8} bg={mutedBg} borderRadius="lg">
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
                        bg={surfaceBg}
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
                    <Box p={5} bg={surfaceBg} borderRadius="lg" height="full">
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
            <Box p={6} bg={mutedBg} borderRadius="lg">
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
                      <Body size="sm" color={secondaryTextColor} fontWeight="medium">
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

              <UnorderedList spacing={3} ml={4} color={secondaryTextColor}>
                <ListItem>
                  <Body size="sm" color={secondaryTextColor}>
                    {t('A clear description of your project vision and goals')}
                  </Body>
                </ListItem>
                <ListItem>
                  <Body size="sm" color={secondaryTextColor}>
                    {t('The intended impact and how it aligns with the fund')}
                  </Body>
                </ListItem>
                <ListItem>
                  <Body size="sm" color={secondaryTextColor}>
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
