import { Box, Button, Image, Link, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { PiStarFour } from 'react-icons/pi'

import { fetchFeaturedProject } from '@/api/airtable'
import { Modal } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { getFeaturedProject, MegaphoneStar } from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import { useNotification } from '@/utils'

import { FeaturedGrantCard } from '../components/FeaturedGrantCard'
import { FeaturedCardSkeleton, FeaturedProjectCard } from '../components/FeaturedProjectCard'
import { ProjectRowLayout } from '../components/ProjectRowLayout'

const MAIL_TO_HREF =
  "mailto:hello@geyser.fund?subject=Feature%20Project&body=Hi%2C%20%0AI'm%20interested%20in%20featuring%20a%20project%20in%20the%20discovery%20page.%0A%0AProject%20URL%3A%20the%20project%20URL%20of%20project%20you'd%20like%20to%20feature%0AFeatured%20comment%3A%20send%20us%20your%20comment%0AUser%3A%20tell%20us%20who%20is%20paying%20for%20this%20project%20to%20be%20featured%20%0A%20%0ALooking%20forward%20to%20hearing%20more%20of%20how%20this%20works%0A%0ABest%2C"

export type FeatureAirtableData = {
  Name: string
  Type: 'project' | 'grant'
  Featured_Comment: string
  Featured_Author?: string
}

export const Featured = () => {
  const toast = useNotification()

  const [loading, setLoading] = useState(true)

  const [data, setData] = useState<FeatureAirtableData>()

  const featuredProjectModal = useModal()

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetchFeaturedProject()

        const data = response?.records?.[0]?.fields
        if (data) {
          setData(data)
        }
      } catch (error) {
        toast.error({ title: 'Failed to fetch featured project' })
      }

      setLoading(false)
    }

    fetchFeatured()
  }, [])

  const renderFeatured = () => {
    if (loading) {
      return <FeaturedCardSkeleton />
    }

    if (data && data?.Type === 'project') {
      return <FeaturedProjectCard projectName={data.Name} data={data} />
    }

    if (data && data?.Type === 'grant') {
      return <FeaturedGrantCard grantId={data.Name} />
    }

    return <FeaturedProjectCard projectName={getFeaturedProject()} />
  }

  const rightContent = () => {
    return (
      <Button variant="surface" colorScheme="primary1" rightIcon={<PiStarFour />} onClick={featuredProjectModal.onOpen}>
        {t('Featured project')}
      </Button>
    )
  }

  return (
    <>
      <ProjectRowLayout title={t('Featured')} rightContent={rightContent()} width="100%">
        {renderFeatured()}
      </ProjectRowLayout>
      <Modal
        title={t('Feature a project')}
        {...featuredProjectModal}
        bodyProps={{
          as: VStack,
          gap: 4,
        }}
      >
        <Box height="75px" width="auto">
          <Image height="100%" width="auto" objectFit={'cover'} src={MegaphoneStar} />
        </Box>
        <Body size="sm">
          {t(
            'Reach out to us to feature a project of your choice on the Discovery page. This could be your own or someone else’s project.',
          )}
        </Body>
        <Body size="sm">
          {t(
            'Note that this is a paid promotion and Geyser will only feature projects that align with the company’s mission and values.',
          )}
        </Body>
        <Button as={Link} href={MAIL_TO_HREF} w="full" variant="solid" colorScheme="primary1">
          {t('Submit interest')}
        </Button>
      </Modal>
    </>
  )
}
