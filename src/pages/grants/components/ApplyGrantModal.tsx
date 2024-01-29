import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { MdClose } from 'react-icons/md'

import { useAuthContext } from '../../../context'

interface Grant {
  applicant: number
  title: string
  subtitle: string
  about: string
  image: string
  isClose: boolean
}

export type GrantApplicantInput = {
  area: string
  grantType: string
  link: string
  name: string
  goals: string
}

export const defaultGrantApplicant = {
  area: 'Online',
  grantType: 'Translations',
  link: '',
  name: '',
  goals: '',
}

enum GrantApplicationStages {
  info = 'info',
  form = 'form',
  complete = 'complete',
}

export enum GrantCategory {
  translations = 'Translations',
  visualArt = 'Visual Art',
  communities = 'Communities',
}

export const GrantOptions = [
  {
    label: 'Bitcoin Translations',
    value: GrantCategory.translations,
  },
  {
    label: 'Bitcoin Visual Art',
    value: GrantCategory.visualArt,
  },
  {
    label: 'Bitcoin Communities',
    value: GrantCategory.communities,
  },
]

export const ApplyGrantModal = ({ applicant, image, title, subtitle, isClose, about }: Grant) => {
  const { user } = useAuthContext()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [applicationStages, setApplicationStages] = useState<GrantApplicationStages>(GrantApplicationStages.info)

  const handleClose = () => {
    onClose()
    setApplicationStages(GrantApplicationStages.info)
  }

  const OverlayOne = useMemo(() => <ModalOverlay />, [])

  const grantInfo = () => (
    <>
      <Box
        width={'100%'}
        display={isClose ? 'block' : 'flex'}
        justifyContent={'center'}
        borderTopRightRadius="4px"
        borderTopLeftRadius="4px"
        overflow="hidden"
      >
        <img src={image} width={isClose ? '100%' : '60%'} />
      </Box>

      <ModalBody>
        <Text fontWeight={'600'} mb={2} fontSize="18px">
          {title}
        </Text>
        <Text fontWeight={400} mb={2} fontSize="13px">
          {subtitle}
        </Text>
        <Box my={4}>
          <Box display="flex" justifyContent={'center'} alignContent="center" flexDirection={'column'}>
            <Text textAlign="center">{about}</Text>
          </Box>
        </Box>
        <Box mt={4}>
          {isClose ? (
            <Button
              bg="primary.400"
              onClick={() => {
                setApplicationStages(GrantApplicationStages.form)
              }}
              w="full"
              isDisabled
            >
              {user?.id ? 'Apply' : 'Confirm'}
            </Button>
          ) : (
            <Button w="full" isDisabled>
              Apply
            </Button>
          )}
        </Box>
      </ModalBody>
    </>
  )

  return (
    <>
      {isClose ? (
        <Button mt={3} size="sm" minWidth={'100%'} fontSize="14px" onClick={onOpen} backgroundColor="primary.400">
          View
        </Button>
      ) : (
        <Button variant={'outline'} size="sm" w="full" onClick={onOpen} border="solid 2px" borderColor="primary.400">
          Closed
        </Button>
      )}

      <Modal isCentered isOpen={isOpen} onClose={handleClose} size="md">
        {OverlayOne}

        <ModalContent
          bg="transparent"
          boxShadow={0}
          marginX="10px"
          maxWidth="450px"
          maxHeight="calc(100% - 120px)"
          display="flex"
          flexDirection="column"
        >
          <HStack width="100%" justifyContent="space-between" mb={2}>
            <Box>
              {applicationStages === GrantApplicationStages.form && (
                <Button
                  fontSize="sm"
                  rounded={0}
                  onClick={() => setApplicationStages(GrantApplicationStages.info)}
                  gap={2}
                  width="50px"
                  backgroundColor="neutral.0"
                >
                  <BiLeftArrowAlt fontSize={'25px'} />
                </Button>
              )}
            </Box>

            <Button fontSize="sm" rounded={0} onClick={handleClose} gap={2} width="100px" backgroundColor="neutral.0">
              <MdClose fontSize={'18px'} /> Close
            </Button>
          </HStack>

          <Box flex="1" bg="neutral.0" pb={3} borderRadius="4px" overflowY="auto">
            {grantInfo()}
          </Box>
        </ModalContent>
      </Modal>
    </>
  )
}
