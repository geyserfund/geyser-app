import { ButtonProps, Icon } from '@chakra-ui/react'

import { ButtonComponent } from './'

interface IExternalAccountComponentProps extends ButtonProps {
  icon: any
  username: string
}

export const ExternalAccountComponent = ({
  icon,
  username,
  ...rest
}: IExternalAccountComponentProps) => (
  <ButtonComponent
    leftIcon={<Icon mr={2} as={icon} />}
    border="2px solid #20ECC7"
    cursor="default"
    style={{ backgroundColor: 'transparent' }}
    {...rest}
  >
    {username}
  </ButtonComponent>
)
