import { useMutation, useQuery } from '@apollo/client'
import {
  Button,
  Card,
  HStack,
  Image,
  Link as ChakraLink,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { useAuthContext } from '@/context'
import { useAuthModal } from '@/modules/auth/hooks/useAuthModal'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants'

import { MUTATION_IMPACT_FUND_APPLY, QUERY_IMPACT_FUND } from '../graphql/impactFunds'

type ImpactFundDetail = {
  id: string
  slug: string
  title: string
  subtitle?: string | null
  description?: string | null
  heroImage?: string | null
  amountCommitted?: number | null
  donateProjectName?: string | null
  liveSponsors: Array<{ id: string; name: string; image?: string | null; url?: string | null }>
  archivedSponsors: Array<{ id: string; name: string; image?: string | null; url?: string | null }>
  fundedApplications: Array<{
    id: string
    projectId: string
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
    awardedThisYearSats: number
    projectsFundedCount: number
    reportsLabel: string
  }
}

export const ImpactFundDetailPage = () => {
  const { impactFundSlug } = useParams<{ impactFundSlug: string }>()
  const { user, isLoggedIn } = useAuthContext()
  const { loginOnOpen } = useAuthModal()
  const toast = useToast()
  const navigate = useNavigate()

  const projectModal = useDisclosure()
  const [selectedProjectId, setSelectedProjectId] = useState<string>('')

  const { data } = useQuery<{ impactFund: ImpactFundDetail }>(QUERY_IMPACT_FUND, {
    variables: { input: { where: { slug: impactFundSlug } } },
    skip: !impactFundSlug,
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
    <VStack align="stretch" spacing={8}>
      <Head
        title={impactFund.title}
        description={impactFund.subtitle || undefined}
        image={impactFund.heroImage || undefined}
      />

      <CardLayout p={0} overflow="hidden">
        {impactFund.heroImage && (
          <Image src={impactFund.heroImage} alt={impactFund.title} w="full" h="320px" objectFit="cover" />
        )}
        <VStack align="start" p={6} spacing={3}>
          <H2 size="2xl" bold>
            {impactFund.title}
          </H2>
          {impactFund.subtitle && <Body>{impactFund.subtitle}</Body>}
          {impactFund.amountCommitted ? (
            <Body bold>{`${new Intl.NumberFormat().format(impactFund.amountCommitted)} sats committed`}</Body>
          ) : null}
          {impactFund.description && <Body>{impactFund.description}</Body>}
          <HStack>
            <Button colorScheme="primary1" onClick={handleApplyClick}>
              {t('Submit Application')}
            </Button>
            {impactFund.donateProjectName && (
              <Button
                as={Link}
                to={getPath('fundingStart', impactFund.donateProjectName)}
                variant="outline"
                colorScheme="primary1"
              >
                {t('Donate')}
              </Button>
            )}
          </HStack>
        </VStack>
      </CardLayout>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        <CardLayout>
          <H2 size="lg" bold>
            {t('Live Sponsors')}
          </H2>
          <VStack align="start" mt={4} spacing={3}>
            {impactFund.liveSponsors.map((sponsor) => (
              <HStack key={sponsor.id} spacing={3}>
                {sponsor.image ? <Image src={sponsor.image} alt={sponsor.name} boxSize="40px" /> : null}
                {sponsor.url ? (
                  <ChakraLink href={sponsor.url} isExternal>
                    <Body>{sponsor.name}</Body>
                  </ChakraLink>
                ) : (
                  <Body>{sponsor.name}</Body>
                )}
              </HStack>
            ))}
          </VStack>
        </CardLayout>

        <CardLayout>
          <H2 size="lg" bold>
            {t('Previous Sponsors')}
          </H2>
          <VStack align="start" mt={4} spacing={3}>
            {impactFund.archivedSponsors.map((sponsor) => (
              <Body key={sponsor.id}>{sponsor.name}</Body>
            ))}
          </VStack>
        </CardLayout>
      </SimpleGrid>

      <CardLayout>
        <H2 size="lg" bold>
          {t('Projects Awarded')}
        </H2>
        <VStack align="stretch" mt={4} spacing={4}>
          {impactFund.fundedApplications.map((application) => (
            <Card key={application.id} p={4}>
              <HStack align="start" spacing={4}>
                {application.project.thumbnailImage && (
                  <Image
                    src={application.project.thumbnailImage}
                    alt={application.project.title}
                    boxSize="88px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                )}
                <VStack align="start" spacing={1}>
                  <H2 size="md" bold>
                    {application.project.title}
                  </H2>
                  {application.amountAwardedInSats !== null && application.amountAwardedInSats !== undefined && (
                    <Body bold>{`${new Intl.NumberFormat().format(application.amountAwardedInSats)} sats`}</Body>
                  )}
                  {application.awardedAt && (
                    <Body size="sm">{new Date(application.awardedAt).toLocaleDateString()}</Body>
                  )}
                  {application.project.shortDescription && <Body>{application.project.shortDescription}</Body>}
                </VStack>
              </HStack>
            </Card>
          ))}
        </VStack>
      </CardLayout>

      <CardLayout>
        <H2 size="lg" bold>
          {t('Impact & Transparency')}
        </H2>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mt={4}>
          <Card p={4}>
            <Body bold>{new Intl.NumberFormat().format(impactFund.metrics.awardedThisYearSats)} sats</Body>
            <Body size="sm">{t('Awarded this year')}</Body>
          </Card>
          <Card p={4}>
            <Body bold>{impactFund.metrics.projectsFundedCount}</Body>
            <Body size="sm">{t('Projects funded')}</Body>
          </Card>
          <Card p={4}>
            <Body bold>{impactFund.metrics.reportsLabel}</Body>
            <Body size="sm">{t('Reporting cadence')}</Body>
          </Card>
        </SimpleGrid>
      </CardLayout>

      <Modal isOpen={projectModal.isOpen} onClose={projectModal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('Select project')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select value={selectedProjectId} onChange={(e) => setSelectedProjectId(e.target.value)}>
              {ownedProjects.map((project) => (
                <option key={String(project.id)} value={String(project.id)}>
                  {project.title}
                </option>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={projectModal.onClose}>
              {t('Cancel')}
            </Button>
            <Button colorScheme="primary1" isLoading={applying} onClick={submitApplication}>
              {t('Apply')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  )
}
