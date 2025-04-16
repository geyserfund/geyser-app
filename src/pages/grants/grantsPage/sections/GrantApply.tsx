import { useMutation } from '@apollo/client'
import {
  Box,
  Button,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tag,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsCheckLg } from 'react-icons/bs'

import { ConnectWithNostr } from '@/modules/auth/ConnectWithNostr.tsx'
import { ConnectWithSocial } from '@/modules/auth/ConnectWithSocial.tsx'
import { SocialAccountType } from '@/modules/auth/type.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body, H3 } from '@/shared/components/typography'

import { useAuthContext } from '../../../../context'
import { MUTATION_APPLY_GRANT } from '../../../../graphqlBase/mutations'
import { CreateAProjectButton } from '../../../../modules/profile/pages/profilePage/components'
import { LockedConnectAccountUrl } from '../../../../shared/constants'
import { lightModeColors } from '../../../../shared/styles'
import { Grant, GrantApplicant, GrantApplicantStatus, GrantApplyInput, Project } from '../../../../types'
import { toInt, useCustomTheme, useNotification } from '../../../../utils'

interface GrantProps {
  grant: Grant
  pendingApplicants?: GrantApplicant[]
}

export const GrantApply = ({ grant, pendingApplicants }: GrantProps) => {
  const { t } = useTranslation()

  return (
    <CardLayout noMobileBorder w="full" p={{ base: '10px', lg: '20px' }} alignItems="center">
      <H3 size="lg" alignSelf="start" medium>
        {t('Apply')}
      </H3>
      <Body alignSelf="start">
        {t(
          'Apply to participate to the {{title}} by creating your project on Geyser and then selecting it in the application flow',
        ).replace('{{title}}', grant.title)}
      </Body>
      <ApplyGrant grant={grant} pendingApplicants={pendingApplicants} />
    </CardLayout>
  )
}

export const ApplyGrant = ({ grant, pendingApplicants }: GrantProps) => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button variant="solid" colorScheme="primary1" onClick={onOpen} textTransform="uppercase">
        {t('Apply')}
      </Button>
      <ApplyGrantModal {...{ isOpen, onOpen, onClose, grant, pendingApplicants }} />
    </>
  )
}

interface ApplyGrantModalProps {
  grant: Grant
  isOpen: boolean
  onClose: () => void
  pendingApplicants?: GrantApplicant[]
}

export const ApplyGrantModal = ({ grant, isOpen, onClose, pendingApplicants }: ApplyGrantModalProps) => {
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
        pendingApplicants={pendingApplicants}
      />
    )
  }

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent display="flex" alignItems="center" padding="20px 15px" marginX="10px">
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
      <Body>{t('To apply to a grant you need to first login into Geyser.')}</Body>
      <VStack w="full">
        <ConnectWithSocial accountType={SocialAccountType.facebook} />
        <ConnectWithSocial accountType={SocialAccountType.github} />
        <ConnectWithSocial accountType={SocialAccountType.google} />
        <ConnectWithSocial accountType={SocialAccountType.twitter} />
        <ConnectWithNostr />
      </VStack>
    </>
  )
}

export const CreateAProject = () => {
  const { t } = useTranslation()
  return (
    <>
      <Body size={'sm'} alignSelf="start">
        {t('Select your Geyser project from the list')}
      </Body>
      <Box w="full" paddingY="10px" backgroundColor="neutral.100" borderRadius="8px" textAlign="center">
        {t('You have not created any projects')}
      </Box>
      <Body size={'sm'}>{t('To apply for a grant you need to create a project on Geyser.')}</Body>
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
      <Body>You successfully applied to be part of the Geyser Grant. You should be receiving a notification soon.</Body>
      <Button w="full" variant="solid" colorScheme="primary1" onClick={onClose}>
        Close
      </Button>
    </>
  )
}

interface SelectAProjectProps {
  grantId: number
  projects: Project[]
  onSuccess: () => void
  pendingApplicants?: GrantApplicant[]
}

export const SelectAProject = ({ grantId, projects, onSuccess, pendingApplicants }: SelectAProjectProps) => {
  const { t } = useTranslation()
  const { toast } = useNotification()

  const [selectedProjectId, setSelectedProjectId] = useState<number>(0)

  const isProjectPending = (projectId: number) => {
    return pendingApplicants?.some((applicant) => applicant.project.id === projectId)
  }

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
      <Body size="sm" alignSelf="start">
        {t('Select your Geyser project from the list')}
      </Body>
      <VStack w="full">
        {projects.map((project) => {
          const isSelected = selectedProjectId === project.id
          const isPending = isProjectPending(project.id)

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
              <Image h="100%" width="135px" src={project.thumbnailImage || ''} objectFit="cover" />
              <Body bold>{project.title}</Body>
              {isPending && (
                <Tag bg="warning.3">
                  <Body size="xs" color={lightModeColors.utils.text}>
                    {t('APPLICATION PENDING')}
                  </Body>
                </Tag>
              )}
            </CardLayout>
          )
        })}
      </VStack>
      <Button
        w="full"
        variant="solid"
        colorScheme="primary1"
        isDisabled={!selectedProjectId}
        onClick={handleApply}
        isLoading={loading}
      >
        {t('Apply')}
      </Button>
    </>
  )
}
