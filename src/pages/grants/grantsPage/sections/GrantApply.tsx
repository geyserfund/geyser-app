import { useMutation } from '@apollo/client'
import {
  Box,
  Button,
  HStack,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { BsCheckLg } from 'react-icons/bs'

import { CardLayout } from '../../../../components/layouts'
import { Body1, Body2, H3 } from '../../../../components/typography'
import {
  GrantApplicationDetailsUrl,
  LockedConnectAccountUrl,
} from '../../../../constants'
import { useAuthContext } from '../../../../context'
import { MUTATION_APPLY_GRANT } from '../../../../graphql/mutations'
import {
  Grant,
  GrantApplicantStatus,
  GrantApplyInput,
  Project,
} from '../../../../types'
import { toInt, useCustomTheme, useNotification } from '../../../../utils'
import { ConnectWithNostr } from '../../../auth/ConnectWithNostr'
import { ConnectWithTwitter } from '../../../auth/ConnectWithTwitter'
import { CreateAProjectButton } from '../../../profile/components'

interface GrantProps {
  grant: Grant
}

export const GrantApply = ({ grant }: GrantProps) => {
  const { t } = useTranslation()
  return (
    <CardLayout
      noMobileBorder
      w="full"
      p={{ base: '10px', lg: '20px' }}
      alignItems="center"
    >
      <H3 alignSelf="start">{t('Apply')}</H3>
      <Body1 alignSelf="start">
        <Trans
          values={{ title: grant.title }}
          i18nKey={
            'Apply to be part of the {{title}} grant. Find out more about how projects will be selected and how voting works <1>here.</1>'
          }
        >
          {
            'Apply to be part of the {{title}} grant. Find out more about how projects will be selected and how voting works '
          }
          <Link href={GrantApplicationDetailsUrl} isExternal>
            here.
          </Link>
        </Trans>
      </Body1>
      <ApplyGrant grant={grant} />
    </CardLayout>
  )
}

export const ApplyGrant = ({ grant }: GrantProps) => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button variant="primary" onClick={onOpen} textTransform="uppercase">
        {t('Apply')}
      </Button>
      <ApplyGrantModal {...{ isOpen, onOpen, onClose, grant }} />
    </>
  )
}

interface ApplyGrantModalProps {
  grant: Grant
  isOpen: boolean
  onClose: () => void
}

export const ApplyGrantModal = ({
  grant,
  isOpen,
  onClose,
}: ApplyGrantModalProps) => {
  const { t } = useTranslation()
  const { isLoggedIn, user } = useAuthContext()

  const [isSuccessful, setIsSuccessfull] = useState(false)

  const getModalTitle = () => {
    if (!isLoggedIn) {
      return 'Login to apply'
    }

    if (isSuccessful) {
      return 'Success!'
    }

    return 'Select a project'
  }

  const getModalContent = () => {
    if (!isLoggedIn) {
      return <LoginForGrant />
    }

    if (isSuccessful) {
      return (
        <ApplicationSuccessful
          onClose={() => {
            onClose()
            setIsSuccessfull(false)
          }}
        />
      )
    }

    if (!user.ownerOf || user.ownerOf.length === 0) {
      return <CreateAProject />
    }

    return (
      <SelectAProject
        grantId={grant.id}
        onSuccess={() => setIsSuccessfull(true)}
        projects={user.ownerOf.map((owner) => owner?.project as Project)}
      />
    )
  }

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        display="flex"
        alignItems="center"
        padding="20px 15px"
        marginX="10px"
      >
        <ModalHeader alignSelf="start">
          <H3>{t(getModalTitle())}</H3>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody w="full" as={VStack} spacing="20px" alignItems="center">
          {getModalContent()}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export const LoginForGrant = () => {
  const { t } = useTranslation()
  return (
    <>
      <Image src={LockedConnectAccountUrl} maxWidth="200px" />
      <Body1>
        {t('To apply to a grant you need to first login into Geyser.')}
      </Body1>
      <VStack w="full">
        <ConnectWithTwitter />
        <ConnectWithNostr />
      </VStack>
    </>
  )
}

export const CreateAProject = () => {
  const { t } = useTranslation()
  return (
    <>
      <Body2 alignSelf="start">
        {t('Select your Geyser project from the list')}
      </Body2>
      <Box
        w="full"
        paddingY="10px"
        backgroundColor="neutral.100"
        borderRadius="8px"
        textAlign="center"
      >
        {t('You have not created any projects')}
      </Box>
      <Body1>
        {t('To apply for a grant you need to create a project on Geyser.')}
      </Body1>
      <CreateAProjectButton />
    </>
  )
}

export const ApplicationSuccessful = ({ onClose }: { onClose: () => void }) => {
  const { colors } = useCustomTheme()
  return (
    <>
      <HStack
        w="60px"
        h="60px"
        borderRadius="50%"
        backgroundColor="primary.400"
        justifyContent="center"
        alignItems="center"
      >
        <BsCheckLg fontSize="35px" color={colors.neutral[1000]} />
      </HStack>
      <Body1>
        You successfully applied to be part of the Geyser Grant. You should be
        receiving a notification soon.
      </Body1>
      <Button w="full" variant="primary" onClick={onClose}>
        Close
      </Button>
    </>
  )
}

interface SelectAProjectProps {
  grantId: number
  projects: Project[]
  onSuccess: () => void
}

export const SelectAProject = ({
  grantId,
  projects,
  onSuccess,
}: SelectAProjectProps) => {
  const { t } = useTranslation()
  const { toast } = useNotification()

  const [selectedProjectId, setSelectedProjectId] = useState<number>(0)

  const [applyGrantMutation, { loading }] = useMutation<
    { grantApply: { status: GrantApplicantStatus } },
    { input: GrantApplyInput }
  >(MUTATION_APPLY_GRANT, {
    onError(error) {
      toast({
        status: 'error',
        title: 'Grant application failed.',
        description: `${error?.message}` || 'Please try again',
      })
    },
    onCompleted() {
      onSuccess()
    },
  })

  const handleSelection = (id: number) => {
    if (selectedProjectId === id) {
      setSelectedProjectId(0)
    } else {
      setSelectedProjectId(id)
    }
  }

  const handleApply = () => {
    if (selectedProjectId) {
      applyGrantMutation({
        variables: {
          input: {
            projectId: toInt(selectedProjectId),
            grantId: toInt(grantId),
          },
        },
      })
    }
  }

  return (
    <>
      <Body2 alignSelf="start">
        {t('Select your Geyser project from the list')}
      </Body2>
      <VStack w="full">
        {projects.map((project) => {
          const isSelected = selectedProjectId === project.id
          return (
            <CardLayout
              hover
              key={project.id}
              w="full"
              h="80px"
              padding="0px"
              direction="row"
              alignItems="center"
              overflow="hidden"
              onClick={() => handleSelection(project.id)}
              borderColor={isSelected ? 'primary.400' : 'neutral.200'}
              _hover={{
                cursor: 'pointer',
                borderColor: isSelected ? 'primary.400' : 'neutral.400',
              }}
            >
              <Image
                h="100%"
                width="135px"
                src={project.thumbnailImage || ''}
                objectFit="cover"
              />
              <Body1 bold>{project.title}</Body1>
            </CardLayout>
          )
        })}
      </VStack>
      <Button
        w="full"
        variant="primary"
        isDisabled={!selectedProjectId}
        onClick={handleApply}
        isLoading={loading}
      >
        {t('Apply')}
      </Button>
    </>
  )
}
