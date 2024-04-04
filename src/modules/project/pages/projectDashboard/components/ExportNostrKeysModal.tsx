import { Button, Checkbox, HStack, useDisclosure, VStack } from '@chakra-ui/react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BiErrorCircle } from 'react-icons/bi'

import { Modal } from '../../../../../components/layouts'
import { Body2, Caption } from '../../../../../components/typography'
import { ProjectFragment, useProjectNostrKeysQuery } from '../../../../../types'
import { useCustomTheme } from '../../../../../utils'
import { ExportNostrKeysPDF } from '.'

interface ExportNostrKeysModalProps {
  projectId: ProjectFragment['id']
  projectTitle: ProjectFragment['title']
}

export const ExportNostrKeysModal = ({ projectId, projectTitle }: ExportNostrKeysModalProps) => {
  const { t } = useTranslation()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { colors } = useCustomTheme()

  const { loading, data } = useProjectNostrKeysQuery({
    variables: { where: { id: projectId } },
    skip: !projectId || !isOpen,
  })

  const projectNostrKeys = data?.projectGet?.keys.nostrKeys

  const [isChecked, setIsChecked] = useState(false)

  const handleCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked)
  }

  return (
    <>
      <Button width="full" variant="secondary" onClick={onOpen}>
        {' '}
        {t('Export Private key (nsec)')}
      </Button>
      <Modal size="sm" title={t('Export Private Key (nsec)')} isOpen={isOpen} onClose={onClose}>
        <VStack spacing="20px">
          <Body2 semiBold color="neutral.600">
            {t('Are you sure you want to export your private keys?')}
          </Body2>
          <HStack padding="6px 12px" backgroundColor="rgba(223, 54, 52, 0.10)" borderRadius="8px">
            <BiErrorCircle color={colors.secondary.red} fontSize="30px" />
            <Caption color="secondary.red" xBold>
              {t('Warning: your project risks being compromised if you leak your private key.')}
            </Caption>
          </HStack>

          <Checkbox colorScheme="teal" isChecked={isChecked} onChange={handleCheckBox}>
            {t('I understand the risks of exporting my private key')}
          </Checkbox>

          {isChecked && !loading ? (
            <PDFDownloadLink
              document={
                <ExportNostrKeysPDF
                  projectTitle={projectTitle}
                  publicKey={projectNostrKeys?.publicKey.npub || ''}
                  privateKey={projectNostrKeys?.privateKey?.nsec || ''}
                />
              }
              style={{
                padding: '6px',
                backgroundColor: colors.primary[400],
                width: '100%',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'center',
                color: 'black',
              }}
              onClick={onClose}
            >
              {t('Export Private key (nsec)')}
            </PDFDownloadLink>
          ) : (
            <Button width="full" variant="secondary" isLoading={loading} isDisabled>
              {t('Export Private key (nsec)')}
            </Button>
          )}
        </VStack>
      </Modal>
    </>
  )
}
