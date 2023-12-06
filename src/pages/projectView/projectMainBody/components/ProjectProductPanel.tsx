import { Box, Text, Link, Stack, useDisclosure, Button, Container, HStack, useTheme } from '@chakra-ui/react'
import {
  ProjectProduct, USDCents,
} from '../../../../types'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useStyles } from '../../ProjectRightSidebar/styles'
import { useMobileMode } from '../../../../utils'
import { MobileViews, useProjectContext } from '../../../../context'
import { PathName } from '../../../../constants'
import { useBTCConverter } from '../../../../helpers'
import { UserAvatar } from '../../../../components/ui/UserAvatar'

type Props = {
  product: ProjectProduct,
  showDetails?: boolean,
  showContributors?: boolean
  key: number
}

export const ProjectProductPanel = ({ product, showDetails = false, showContributors = false }: Props) => {

  const navigate = useNavigate()
  const { colors } = useTheme()
  const { t } = useTranslation()
  const { getSatoshisFromUSDCents } = useBTCConverter()
  const isMobile = useMobileMode()
  const { setMobileView } = useProjectContext()

  const classes = useStyles({ isMobile })

  const handleProjectNavigationButtonClick = () => {
    setMobileView(MobileViews.products)
    navigate(PathName.projectProducts + "#i" + product.id)
  }

  return (
    <Box
      border='2px'
      borderColor='neutral.200'
      borderRadius={12}
      mt={2}
      p={3}
      pb={16}
      pos={'relative'}
    >
      <Stack direction='row' justify='space-between'>
        <Text fontWeight={700} fontSize={16}>{product.name}</Text>
        <Stack direction='row'>
          <Text fontWeight={700} fontSize={16} color='neutral.900'>${product.cost / 100}</Text>
        </Stack>
      </Stack>
      <Stack direction='column' gap={1}>
        <Box mt={2} borderRadius={12} overflow={'hidden'}>
          <div style={{display: 'block', position: 'relative', paddingTop: '56.25%', width: '100%'}}>
            <div style={{display: 'block', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: `transparent url(${product.image}) no-repeat center center`}}>
            </div>
          </div>
        </Box>
        {!showContributors && (
          <Text fontWeight={400} fontSize='sm' color='neutral.900'>{product.stock !== null && product.stock >= 0 ? `${product.stock} ${t('remaining')}, ` : ''}{product.sold || 0} {t('backers')}</Text>
        )}
        <Text fontWeight={400} fontSize='sm' color='neutral.900' pt={2}>{product.isPhysical ? t('Physical product') : t('Digital product')}</Text>
        <Text fontWeight={400} fontSize='sm' color='neutral.500'>{product.description}</Text>
        {showContributors && (
          <>
            <Text fontWeight={400} fontSize='sm' color='neutral.900'>{product.stock !== null && product.stock >= 0 ? `${product.stock} ${t('remaining')}, ` : ''}{product.sold || 0} {t('backers')}</Text>
            <HStack ml={0} spacing={0} alignItems="start">
              {product.funders && product.funders.length > 0 && (
                <>
                  {product.funders.map(funder => (
                    <UserAvatar
                      size="sm"
                      border={`2px solid ${colors.neutral[0]}`}
                      display="inline-block"
                      marginLeft="-5px"
                      user={funder.user}
                    />
                  ))}
                </>
              )}
            </HStack>
          </>
        )}
        <Container pos={'absolute'} bottom={3} left={3} right={3} width={'auto'} p={0}>
          <Stack direction='row' style={{ marginTop: '10px' }}>
            {showDetails && (
              <Button
                variant='secondary'
                size='md'
                onClick={handleProjectNavigationButtonClick}
                style={{ minWidth: '80px' }}
              >
                <Text isTruncated>{t('Details')}</Text>
              </Button>
            )}
            <Button
              variant='secondary'
              size='md'
              onClick={()=>{}}
              style={{ flex: 1 }}
            >
              <Text isTruncated>{t('Select product')}</Text>
            </Button>
          </Stack>
        </Container>
      </Stack>
    </Box>
  )
}
