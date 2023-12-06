import { forwardRef, useEffect, useState, useRef } from 'react'
import { CardLayout } from '../../../../components/layouts'
import { Stack, Text, VStack, Divider, SimpleGrid } from '@chakra-ui/react'
import { H2 } from '../../../../components/typography'
import { useTranslation } from 'react-i18next'
import { useProjectContext } from '../../../../context'
import { ProjectProductPanel } from '../components'

export const Products = forwardRef<HTMLDivElement>((_, ref) => {
  const { t } = useTranslation()
  const { project } = useProjectContext()

  if(!project) {
    return null;
  }

  return (
    <VStack
      direction={{ base: 'column', lg: 'row' }}
      w="full"
    >
      <CardLayout h="auto" px={3} py={4} minWidth="100%">
        <Stack
          direction={{ base: 'row', lg: 'row' }}
          pb={1}
          w="full"
        >
          <H2>{t('Products')}</H2>
          <Text
            fontSize='15px'
            backgroundColor={'neutral.100'}
            padding='3px 7px'
            borderRadius='4px'
          >
            <b>{project.products.length}</b>
          </Text>
        </Stack>
        <Divider />
        <SimpleGrid columns={3} spacing={3}>
          {project.products.map(product => <ProjectProductPanel product={product} showContributors={true} />)}
        </SimpleGrid>
      </CardLayout>
    </VStack>
  )
})
