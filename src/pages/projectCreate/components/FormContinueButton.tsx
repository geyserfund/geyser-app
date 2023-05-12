import { Button, ButtonProps } from '@chakra-ui/react'

type Props = Required<Pick<ButtonProps, 'onClick'>> &
  Pick<ButtonProps, 'isLoading' | 'width' | 'flexGrow' | 'isDisabled'>

export const FormContinueButton = (props: Props) => {
  return (
    <Button variant="primary" {...props}>
      Continue
    </Button>
  )
}
