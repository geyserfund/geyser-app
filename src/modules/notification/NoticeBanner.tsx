import { Button, ButtonProps, Image, Link as ChakraLink, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'

import { fetchNoticeBannerData } from '@/api/airtable'
import { Modal } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { GradientBorder } from '@/shared/molecules/GradientBorder'
import { lightModeColors } from '@/shared/styles'
import { GuardiansButtonBackgroundGradientBright } from '@/shared/styles/custom'

import { useIsGuardiansPage } from '../navigation/platformNavBar/platformNavBarAtom'
import { NoticeBannerHistoryDataAtom } from './NoticeBannerAtom'

type AirtableNoticeBannerData = {
  id: string
  title: string
  description: string
  link?: string
  path?: string
  linkText: string
  imageUrl: string
}

export const NoticeBanner = () => {
  const [infoBannerHistoryData, setNoticeBannerHistoryData] = useAtom(NoticeBannerHistoryDataAtom)

  const [loading, setLoading] = useState(true)

  const [data, setData] = useState<AirtableNoticeBannerData>()

  const isGuardiansPage = useIsGuardiansPage()

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetchNoticeBannerData()

        const records = response?.records || []

        if (records.length > 0) {
          const recordLength = records.length
          const data = records[recordLength - 1]?.fields
          if (data) {
            setData(data)
          }
        }
      } catch (error) {}

      setLoading(false)
    }

    fetchFeatured()
  }, [])

  const available = data && !infoBannerHistoryData.includes(data.id)

  if (loading || !available) {
    return null
  }

  const handleNoticeBannerHistoryData = () => {
    if (data) {
      setNoticeBannerHistoryData((current) => {
        return [...current, data.id]
      })
    }
  }

  if (isGuardiansPage) {
    return null
  }

  const buttonProps = {
    width: 'full',
    variant: 'ghost',
    background: GuardiansButtonBackgroundGradientBright,
    color: lightModeColors.utils.text,
    _hover: {},
    _focus: {},
    _active: {},
  } as ButtonProps

  return (
    <>
      <Modal
        title={data?.title}
        isOpen={true}
        onClose={handleNoticeBannerHistoryData}
        bodyProps={{ as: VStack, gap: 4 }}
      >
        <Image src={data?.imageUrl} alt={data?.title} height="auto" width="100%" objectFit={'cover'} />
        <Body size="sm">{data?.description}</Body>
        <GradientBorder
          gradientColor={GuardiansButtonBackgroundGradientBright}
          enable={true}
          internalContainerProps={{ width: 'full' }}
        >
          {data.link && (
            <Button {...buttonProps} as={ChakraLink} href={data?.link} onClick={handleNoticeBannerHistoryData}>
              {data?.linkText}
            </Button>
          )}
          {data.path && (
            <Button {...buttonProps} as={Link} to={data?.path} onClick={handleNoticeBannerHistoryData}>
              {data?.linkText}
            </Button>
          )}
        </GradientBorder>
      </Modal>
    </>
  )
}
