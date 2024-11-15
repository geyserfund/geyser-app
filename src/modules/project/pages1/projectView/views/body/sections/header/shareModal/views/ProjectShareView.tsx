import { Button, HStack, Input, Link, Tooltip, useClipboard, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiCopy, PiShareFat } from 'react-icons/pi'

import { useAuthContext } from '@/context'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CampaignContent, useProjectShare } from '@/modules/project/pages1/projectView/hooks'
import { generateTwitterShareUrl } from '@/modules/project/utils'
import { useAuthModal } from '@/pages/auth/hooks'
import { Body } from '@/shared/components/typography'
import { useProjectAmbassadorStatsQuery } from '@/types'
import { useNotification } from '@/utils'

export const ProjectShareView = () => {
  const { t } = useTranslation()
  const toast = useNotification()
  const { isLoggedIn } = useAuthContext()
  const { loginOnOpen } = useAuthModal()
  const { project } = useProjectAtom()
  const { getShareProjectUrl } = useProjectShare()
  const { data } = useProjectAmbassadorStatsQuery({ variables: { where: { id: project.id } } })

  const projectShareUrl = getShareProjectUrl({ clickedFrom: CampaignContent.successScreen })
  const twitterShareText = `I just contributed to ${project.title} on Geyser! Check it out: ${projectShareUrl}`

  const heroId = 'hero'
  const heroLink = `https://geyser.fund/project/geyser${isLoggedIn ? `&hero=${heroId}` : ''}`
  const { onCopy, hasCopied } = useClipboard(heroLink)

  const handleCopy = () => {
    onCopy()
    toast.success({
      title: t('Copied!'),
      description: t('Hero link copied to clipboard'),
    })
  }

  const heroCount = data?.projectGet?.ambassadors?.stats?.count
  const satAmount = data?.projectGet?.ambassadors?.stats?.contributionsSum

  return (
    <VStack w="100%">
      {/* <VStack border="1px solid" borderColor="neutral1.6" borderRadius="md" width="100%" spacing={2}> */}
      <VStack
        bgGradient={isLoggedIn ? 'linear(to-r, primary1.4, indigo.3)' : 'linear(to-r, neutral1.6, neutral1.3)'}
        p={4}
        borderRadius="md"
        width="100%"
        spacing={2}
      >
        <Body size="md" textAlign="center">
          {!heroCount ? (
            <Body>
              {t('Become the first project')}{' '}
              <Tooltip label={t('Share your hero link to become a project ambassador')} placement="top">
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  <Body as="span" color="neutral1.12" textDecoration="underline dotted" display="inline" bold>
                    {t('Ambassador')}
                  </Body>
                </span>
              </Tooltip>{' '}
              {t('by spreading the word and enabling more contributions to this project.')}
            </Body>
          ) : (
            <Body color="neutral1.12" size="md" regular textAlign="center">
              <Body>
                {t('Become an')}{' '}
                <Tooltip label={t('Share your hero link to become a project ambassador')} placement="top">
                  <span style={{ position: 'relative', display: 'inline-block' }}>
                    <Body as="span" color="neutral1.12" textDecoration="underline dotted" display="inline" bold>
                      {t('Ambassador')}
                    </Body>
                  </span>
                </Tooltip>{' '}
                {t('for this project by spreading the word using your')}{' '}
                <Tooltip label={t('A unique link that tracks contributions you helped generate')} placement="top">
                  <span style={{ position: 'relative', display: 'inline-block' }}>
                    <Body as="span" color="neutral1.12" textDecoration="underline dotted" display="inline" bold>
                      {t('Hero link')}
                    </Body>
                  </span>
                </Tooltip>
                {'.'}
              </Body>
            </Body>
          )}
        </Body>
        {!isLoggedIn && (
          <Body size="md" pt={1} textAlign="center">
            <Link
              color="primary1.500"
              textDecoration="underline"
              onClick={(e) => {
                e.preventDefault()
                loginOnOpen()
              }}
            >
              {t('Sign in')}
            </Link>{' '}
            {t('to get your')}{' '}
            <Tooltip label={t('A unique link that tracks contributions you helped generate')} placement="top">
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <Body as="span" color="neutral1.12" textDecoration="underline dotted" display="inline" bold>
                  {t('Hero link')}
                </Body>
              </span>
            </Tooltip>{' '}
            {t('and track the impact of sharing.')}
          </Body>
        )}
      </VStack>
      <VStack width="100%" p={3} bgColor="neutral1.2" borderRadius="md" border="1px solid" borderColor="neutral1.6">
        <Input
          value={heroLink.replace('https://', '')}
          readOnly
          bg="white"
          borderColor="neutral1.6"
          _hover={{ borderColor: 'neutral1.8' }}
        />
        <HStack w="full" justifyContent="center" spacing={2}>
          <Button
            variant="solid"
            bg="neutral1.3"
            color="neutral1.11"
            borderRadius={8}
            rightIcon={<PiShareFat />}
            as={Link}
            isExternal
            href={generateTwitterShareUrl(twitterShareText)}
            w="full"
            _hover={{
              bg: 'whiteAlpha.900',
            }}
          >
            {t('Share on X')}
          </Button>
          <Button
            variant="solid"
            colorScheme="primary1"
            w="full"
            rightIcon={<PiCopy />}
            onClick={handleCopy}
            isDisabled={hasCopied}
            fontSize="md"
          >
            {t('Copy link')}
          </Button>
        </HStack>
      </VStack>
      {heroCount && (
        <>
          <Body
            size="xs"
            textAlign="left"
            // border="1px solid"
            // borderColor="neutral1.6"
            // borderRadius="md"
            pt={2}
            pl={2}
            pr={2}
            // mb={1}
            // background="linear-gradient(81deg, #B2FAEC -9.6%, #EDF2FE 109.2%)"
          >
            {t('So far,')}{' '}
            <Body as="span" color="neutral1.12" bold>
              {heroCount}
            </Body>{' '}
            {heroCount > 1 ? t('heroes') : t('hero')} {heroCount > 1 ? t('have enabled') : t('has enabled')}{' '}
            <Body as="span" color="neutral1.12" bold>
              {satAmount?.toLocaleString('en-US')}
            </Body>
            {t(' sats in contributions to this project.')}
          </Body>
        </>
      )}
      {/* </VStack> */}
      {/* {heroCount && (
        <Body
          size="sm"
          textAlign="center"
          border="1px solid"
          borderColor="neutral1.6"
          borderRadius="md"
          p={2}
          mb={1}
          background="linear-gradient(81deg, #B2FAEC -9.6%, #EDF2FE 109.2%)"
        >
          <>
            {t('So far,')}{' '}
            <Body as="span" color="neutral1.12" bold>
              {heroCount}
            </Body>{' '}
            {heroCount > 1 ? t('heroes') : t('hero')} {heroCount > 1 ? t('have enabled') : t('has enabled')}{' '}
            <Body as="span" color="neutral1.12" bold>
              {satAmount?.toLocaleString('en-US')}
            </Body>
            {t(' sats in contributions to this project.')}
          </>
        </Body>
      )} */}
    </VStack>
  )
}
