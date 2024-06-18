import { Button, Stack, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate, useParams } from 'react-router-dom'

import { H2 } from '../../../../components/typography'
import { CardLayout } from '../../../../shared/components/layouts'
import { standardPadding } from '../../../../styles'
import { toInt } from '../../../../utils'
import { ProfileError } from '../../components/ProfileError'
import { useUserProfile } from '../../hooks/useUserProfile'
import { ProfileForm } from './components/ProfileForm'

export const ProfileSettings = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const params = useParams<{ userId: string }>()
  const userId = useMemo(() => {
    return toInt(params.userId)
  }, [params])

  const { isLoading, error } = useUserProfile(userId)

  if (error) {
    return <ProfileError />
  }

  return (
    <>
      <VStack
        position="relative"
        width="100%"
        height="100%"
        backgroundColor="neutral.0"
        paddingY={{ base: '20px', lg: '40px' }}
        paddingX={{ base: '0px', lg: '20px', xl: '40px' }}
        justifyContent={'center'}
      >
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          spacing={{ lg: '30px', xl: '40px' }}
          width="100%"
          height="100%"
          maxWidth="900px"
          justifyContent={'start'}
          alignItems="start"
        >
          <Button
            maxWidth="200px"
            width="100%"
            variant="secondary"
            leftIcon={<FaArrowLeftLong />}
            onClick={() => navigate(-1)}
          >
            {t('Back to profile')}
          </Button>
          <CardLayout mobileDense padding={standardPadding} maxWidth="650px" spacing="30px">
            <H2>{t('Profile Settings')}</H2>
            <ProfileForm isLoading={isLoading} />
          </CardLayout>
        </Stack>
      </VStack>
    </>
  )
}

export default ProfileSettings
