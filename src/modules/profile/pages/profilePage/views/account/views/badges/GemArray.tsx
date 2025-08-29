import { HStack, Image } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useNavigate } from 'react-router-dom'

import { guardianJewelsToRenderAtom } from '@/modules/profile/state/badgesAtom.ts'
import { GuardianCardModal, GuardianCardProps } from '@/shared/components/display/GuardianCardModal.tsx'
import { TooltipPopover } from '@/shared/components/feedback/TooltipPopover.tsx'
import { guardianJewels, guardianText } from '@/shared/constants/assets/guardianAssets.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { GuardianType } from '@/types/index.ts'

type GemArrayProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  name?: string
  children?: string
  disablePopover?: boolean
  selectedGuardianTypes?: GuardianType[]
}

const sizeMap = {
  sm: '20px',
  md: '24px',
  lg: '28px',
  xl: '40px',
}

export const GemArray = ({
  size = 'md',
  name,
  children,
  disablePopover = false,
  selectedGuardianTypes,
}: GemArrayProps) => {
  const userGuardianJewels = useAtomValue(guardianJewelsToRenderAtom)
  const guardianModal = useModal<GuardianCardProps>()

  const navigate = useNavigate()

  // Define the display order
  const orderedGuardianTypes = [GuardianType.Warrior, GuardianType.Knight, GuardianType.King, GuardianType.Legend]

  // Create an array of guardian types that user has
  const userGuardianTypes = [...userGuardianJewels.map((jewel) => jewel.guardianType), ...(selectedGuardianTypes || [])]

  // Sort the guardian types to show present ones first, then the rest in the specified order
  const sortedGuardianTypes = [
    // First show the ones user has, in the specified order
    ...orderedGuardianTypes.filter((type) => userGuardianTypes.includes(type)),
    // Then show the ones user doesn't have, in the specified order
    ...orderedGuardianTypes.filter((type) => !userGuardianTypes.includes(type)),
  ]

  const selectedGuardianBadges = selectedGuardianTypes
    ? selectedGuardianTypes.map((type) => ({
        guardianType: type,
        jewel: guardianJewels[type],
        guardianText: guardianText[type],
      }))
    : []

  const userBadges = [...userGuardianJewels, ...selectedGuardianBadges]

  return (
    <>
      <HStack spacing={2}>
        {sortedGuardianTypes.map((guardianType) => {
          // Find the jewel in the user's collection
          const userJewel = userBadges.find((jewel) => jewel.guardianType === guardianType)
          const hasJewel = Boolean(userJewel)
          const guardian = guardianText[guardianType] || ''
          const guardianJewel = hasJewel && userJewel ? userJewel.jewel : guardianJewels[guardianType]
          const displayName = children || name || guardian

          const imageElement = (
            <Image
              src={guardianJewel}
              alt={`${guardian}-jewel`}
              width={sizeMap[size]}
              _hover={{ cursor: 'pointer' }}
              opacity={hasJewel ? 1 : 0.5}
              filter={hasJewel ? 'none' : 'grayscale(100%)'}
              onClick={(e) => {
                if (disablePopover) {
                  return
                }

                if (hasJewel) {
                  e.preventDefault()
                  e.stopPropagation()
                  guardianModal.onOpen({ guardianType, userName: name || '' })
                } else {
                  navigate(getPath('guardians'))
                }
              }}
            />
          )

          if (disablePopover) {
            return imageElement
          }

          return (
            <TooltipPopover
              key={guardianType}
              text={hasJewel ? `${displayName} is a ${guardian}` : t(`Collect ${guardian} jewel`)}
            >
              {imageElement}
            </TooltipPopover>
          )
        })}
      </HStack>
      <GuardianCardModal {...guardianModal.props} {...guardianModal} />
    </>
  )
}
