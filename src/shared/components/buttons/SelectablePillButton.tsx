import { Button, ButtonProps, useColorModeValue } from '@chakra-ui/react'

type SelectablePillButtonProps = ButtonProps & {
  isSelected: boolean
}

/**
 * A pill-shaped selectable button with soft borders and a primary-tinted selected state.
 * Used for discrete choices like preset donation amounts and tip percentages.
 *
 * @param isSelected Whether the button represents the currently selected option.
 */
export const SelectablePillButton = ({ isSelected, children, sx, ...rest }: SelectablePillButtonProps) => {
  const unselectedBorder = useColorModeValue('neutral1.6', 'neutral1.6')
  const unselectedHoverBorder = useColorModeValue('neutral1.8', 'neutral1.8')
  const unselectedHoverBg = useColorModeValue('neutral1.3', 'neutral1.3')
  const unselectedActiveBg = useColorModeValue('neutral1.4', 'neutral1.4')
  const unselectedText = useColorModeValue('neutral1.12', 'neutral1.12')

  const selectedBorder = useColorModeValue('primary1.9', 'primary1.8')
  const selectedHoverBorder = useColorModeValue('primary1.10', 'primary1.9')
  const selectedBg = useColorModeValue('primary1.2', 'primary1.3')
  const selectedHoverBg = useColorModeValue('primary1.3', 'primary1.4')
  const selectedActiveBg = useColorModeValue('primary1.4', 'primary1.5')
  const selectedText = useColorModeValue('primary1.11', 'primary1.12')

  return (
    <Button
      size="md"
      variant="outline"
      height="44px"
      borderRadius="innerCard"
      borderWidth="1px"
      aria-pressed={isSelected}
      borderColor={isSelected ? selectedBorder : unselectedBorder}
      bg={isSelected ? selectedBg : 'transparent'}
      color={isSelected ? selectedText : unselectedText}
      fontWeight={isSelected ? 700 : 500}
      _hover={{
        borderColor: isSelected ? selectedHoverBorder : unselectedHoverBorder,
        bg: isSelected ? selectedHoverBg : unselectedHoverBg,
      }}
      _active={{
        bg: isSelected ? selectedActiveBg : unselectedActiveBg,
      }}
      sx={{
        fontVariantNumeric: 'tabular-nums',
        transition: 'transform 0.1s cubic-bezier(0.2, 0, 0, 1), background-color 0.2s, border-color 0.2s',
        '&:active:not(:disabled)': { transform: 'scale(0.96)' },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  )
}
