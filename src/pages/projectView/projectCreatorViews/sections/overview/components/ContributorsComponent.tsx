import { Button, HStack, Table, Tbody, Td, Tr, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { CardLayout } from '../../../../../../components/layouts'
import { H3 } from '../../../../../../components/typography'
import { AvatarLink } from '../../../../../../components/ui'
import { getPath } from '../../../../../../constants'
import { useProjectContext } from '../../../../../../context'

export const ContributorsComponent = () => {
  const { t } = useTranslation()

  const { project } = useProjectContext()

  console.log('checking path', getPath('projectContributors', project?.name))
  return (
    <VStack w="full" alignItems="start" spacing="10px">
      <HStack w="full" justifyContent="space-between">
        <H3>{t('Contributors')}</H3>

        <Button
          as={Link}
          to={getPath('projectContributors', project?.name)}
          variant="primaryLink"
          size="sm"
        >
          {t('View all')}
        </Button>
      </HStack>
      <CardLayout padding="20px" w="full">
        <Table
          variant="unstyled"
          __css={{
            '& td': {
              paddingY: '5px',
            },
          }}
        >
          <Tbody>
            <Tr>
              <Td>
                <AvatarLink
                  rounded
                  title={'pacodela India'}
                  path={getPath('userProfile', '2')}
                  imageSrc={
                    'https://pbs.twimg.com/profile_images/1611141292586635265/nHqqR2GI_200x200.jpg'
                  }
                />
              </Td>
              <Td>2,212,211 sats</Td>
              <Td>I love your project...</Td>
              <Td>1 reward</Td>
            </Tr>
            <Tr>
              <Td>Paco de la India</Td>
              <Td>2,212,211 sats</Td>
              <Td>I love your project...</Td>
              <Td>1 reward</Td>
            </Tr>
            <Tr>
              <Td>Paco de la India</Td>
              <Td>2,212,211 sats</Td>
              <Td>I love your project...</Td>
              <Td>1 reward</Td>
            </Tr>
            <Tr>
              <Td>Paco de la India</Td>
              <Td>2,212,211 sats</Td>
              <Td>I love your project...</Td>
              <Td>1 reward</Td>
            </Tr>
          </Tbody>
        </Table>
      </CardLayout>
    </VStack>
  )
}
