import { Avatar, Box, HStack } from '@chakra-ui/react'
import { MdOutlineArrowBackIos } from 'react-icons/md'

import { NavBarLogo } from '../../../../components/nav/NavBarLogo'
import { ButtonComponent } from '../../../../components/ui'
import { useAuthContext } from '../../../../context'
import { useMobileMode } from '../../../../utils'

interface ICreateNavProps {
  isSaving: boolean
  onSave: () => void
  saveText?: string
  onPreview?: () => void
  onBack?: () => void
}

export const CreateNav = ({
  isSaving,
  saveText,
  onSave,
  onPreview,
  onBack,
}: ICreateNavProps) => {
  const isMobile = useMobileMode()

  const { user } = useAuthContext()

  return (
    <>
      <Box
        display="flex"
        width="100%"
        justifyContent="center"
        background={'rgba(252,252,252,0.9)'}
        borderBottom={'1px solid rgba(233,233,233,0.9)'}
        boxSizing="border-box"
        position="fixed"
        backdropFilter="blur(2px)"
        top={0}
        left={0}
        zIndex={1000}
      >
        <Box
          display="flex"
          width="100%"
          justifyContent="space-between"
          margin={isMobile ? '10px' : '15px 40px 15px 40px'}
        >
          <HStack spacing="5px" justifyContent="center" alignItems="center">
            <NavBarLogo small />
            <Avatar
              borderRadius="6px"
              height="40px"
              width="40px"
              src={`${user.imageUrl}`}
            />
          </HStack>
          <HStack>
            {onBack && (
              <ButtonComponent
                paddingX="6px"
                aria-label="back"
                onClick={onBack}
              >
                <MdOutlineArrowBackIos />
              </ButtonComponent>
            )}
            <ButtonComponent isDisabled={isSaving} onClick={onSave}>
              {saveText || 'Save draft'}
            </ButtonComponent>
            {onPreview && (
              <ButtonComponent primary onClick={onPreview}>
                Preview
              </ButtonComponent>
            )}
          </HStack>
        </Box>
      </Box>
    </>
  )
}
