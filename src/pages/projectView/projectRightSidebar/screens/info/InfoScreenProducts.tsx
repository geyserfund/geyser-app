import { Box, Link, Stack, Text } from '@chakra-ui/react'
import { ProjectProductPanel } from '../../../projectMainBody/components'
import { useTranslation } from 'react-i18next'
import { MobileViews, useProjectContext } from '../../../../../context'
import { PathName } from '../../../../../constants'
import { useNavigate } from 'react-router-dom'

export const InfoScreenProducts = () => {

  const { t } = useTranslation()
  const { setMobileView, project } = useProjectContext()
  const navigate = useNavigate()

  const handleAllItemsButtonClick = () => {
    setMobileView(MobileViews.products)
    navigate(PathName.projectProducts)
  }

  if(!project || !project.products || project.products.length == 0) {
    return null;
  }

  return (
    <Box
      style={{marginTop: '20px', width: '100%'}}
    >
      <Stack direction='row' justify='space-between'>
        <Stack direction='row'>
          <Text fontWeight={500}>
            {t('Products')}
          </Text>
          <Text
            fontSize='12px'
            backgroundColor='neutral.100'
            padding='0 5px'
            borderRadius='4px'
          >
            <b>{project.products.length}</b>
          </Text>
        </Stack>
        <Text fontWeight={500} onClick={handleAllItemsButtonClick}><Link>{t('See all products')}</Link></Text>
      </Stack>
      {project.products.map((product) => (
        <ProjectProductPanel key={product.id} product={product} />
      ))}
    </Box>
  )
}
