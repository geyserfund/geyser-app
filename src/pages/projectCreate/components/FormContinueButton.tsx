import { Button, ButtonProps } from '@chakra-ui/react'

type Props = ButtonProps

export const FormContinueButton = (props: Props) => {
  return (
    <Button variant="primary" {...props}>
      Continue
    </Button>
  )
}
