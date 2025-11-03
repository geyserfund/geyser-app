import { Box, HStack, Image } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useNavigate } from 'react-router'

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

/** Glowing animation for Warrior badge (Pink/Magenta) */
const warriorGlowAnimation = keyframes`
    0% {
      box-shadow: 0 0 10px rgba(255, 20, 147, 0.6), 0 0 20px rgba(255, 20, 147, 0.4), 0 0 30px rgba(255, 20, 147, 0.3);
      transform: scale(1);
    }
    50% {
      box-shadow: 0 0 20px rgba(255, 20, 147, 1), 0 0 40px rgba(255, 20, 147, 0.8), 0 0 50px rgba(255, 20, 147, 0.6);
      transform: scale(1.05);
    }
    100% {
      box-shadow: 0 0 10px rgba(255, 20, 147, 0.6), 0 0 20px rgba(255, 20, 147, 0.4), 0 0 30px rgba(255, 20, 147, 0.3);
      transform: scale(1);
    }
  `

/** Glowing animation for Knight badge (Yellow/Gold) */
const kingGlowAnimation = keyframes`
    0% {
      box-shadow: 0 0 10px rgba(255, 215, 0, 0.6), 0 0 20px rgba(255, 215, 0, 0.4), 0 0 30px rgba(255, 215, 0, 0.3);
      transform: scale(1);
    }
    50% {
      box-shadow: 0 0 20px rgba(255, 215, 0, 1), 0 0 40px rgba(255, 215, 0, 0.8), 0 0 50px rgba(255, 215, 0, 0.6);
      transform: scale(1.05);
    }
    100% {
      box-shadow: 0 0 10px rgba(255, 215, 0, 0.6), 0 0 20px rgba(255, 215, 0, 0.4), 0 0 30px rgba(255, 215, 0, 0.3);
      transform: scale(1);
    }
  `

/** Glowing animation for King badge (Teal/Cyan) */
const legendGlowAnimation = keyframes`
    0% {
      box-shadow: 0 0 10px rgba(0, 206, 209, 0.6), 0 0 20px rgba(0, 206, 209, 0.4), 0 0 30px rgba(0, 206, 209, 0.3);
      transform: scale(1);
    }
    50% {
      box-shadow: 0 0 20px rgba(0, 206, 209, 1), 0 0 40px rgba(0, 206, 209, 0.8), 0 0 50px rgba(0, 206, 209, 0.6);
      transform: scale(1.05);
    }
    100% {
      box-shadow: 0 0 10px rgba(0, 206, 209, 0.6), 0 0 20px rgba(0, 206, 209, 0.4), 0 0 30px rgba(0, 206, 209, 0.3);
      transform: scale(1);
    }
  `

/** Glowing animation for Legend badge (Purple) */
const knightGlowAnimation = keyframes`
    0% {
      box-shadow: 0 0 10px rgba(138, 43, 226, 0.6), 0 0 20px rgba(138, 43, 226, 0.4), 0 0 30px rgba(138, 43, 226, 0.3);
      transform: scale(1);
    }
    50% {
      box-shadow: 0 0 20px rgba(138, 43, 226, 1), 0 0 40px rgba(138, 43, 226, 0.8), 0 0 50px rgba(138, 43, 226, 0.6);
      transform: scale(1.05);
    }
    100% {
      box-shadow: 0 0 10px rgba(138, 43, 226, 0.6), 0 0 20px rgba(138, 43, 226, 0.4), 0 0 30px rgba(138, 43, 226, 0.3);
      transform: scale(1);
    }
  `

/** Get glow animation based on guardian type */
const getGlowAnimation = (guardianType: GuardianType) => {
  switch (guardianType) {
    case GuardianType.Warrior:
      return warriorGlowAnimation
    case GuardianType.Knight:
      return knightGlowAnimation
    case GuardianType.King:
      return kingGlowAnimation
    case GuardianType.Legend:
      return legendGlowAnimation
    default:
      return knightGlowAnimation // fallback to gold
  }
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
        selected: true,
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

          const isSelected = userJewel?.selected

          const imageElement = (
            <HStack position="relative" alignItems="center" justifyContent="center">
              <Box
                position="absolute"
                w="full"
                h="full"
                height="18px"
                width="18px"
                borderRadius="full"
                animation={isSelected ? `${getGlowAnimation(guardianType)} 2s ease-in-out infinite` : 'none'}
                transition="all 0.3s ease"
              />
              <Image
                src={guardianJewel}
                alt={`${guardian}-jewel`}
                width={sizeMap[size]}
                _hover={{ cursor: 'pointer' }}
                opacity={hasJewel ? 1 : 0.5}
                filter={hasJewel ? 'none' : 'grayscale(100%)'}
                borderRadius="12px"
                zIndex={1}
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
            </HStack>
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
