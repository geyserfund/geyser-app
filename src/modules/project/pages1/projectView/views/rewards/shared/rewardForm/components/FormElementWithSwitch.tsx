import { Collapse, HStack, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useController } from 'react-hook-form'

import {
  ControlledSwitchInput,
  ControlledSwitchInputProps,
} from '@/shared/components/controlledInput/ControlledSwitchInput.tsx'
import { CardLayout, CardLayoutProps } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'

type FormElementWithSwitchProps = {
  title: string
  description: string
  children: React.ReactNode
  switchProps: ControlledSwitchInputProps
} & CardLayoutProps

export const FormElementWithSwitch = ({
  title,
  description,
  switchProps,
  children,
  ...rest
}: FormElementWithSwitchProps) => {
  const { field } = useController({ control: switchProps.control, name: switchProps.name })

  const isOpen = Boolean(field.value)
  const [isOpenAfter, setIsOpenAfter] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsOpenAfter(true)
    }, 200)
  }, [isOpen])

  return (
    <CardLayout w="full" padding={4} overflow="none" spacing={0} {...rest}>
      <VStack alignItems={'flex-start'} spacing={0}>
        <HStack w="full" spacing={4} justifyContent={'space-between'}>
          <Body size="md" medium>
            {title}
          </Body>
          <ControlledSwitchInput containerProps={{ width: 'auto' }} {...switchProps} />
        </HStack>
        <Body size={'sm'} light pr={{ base: 0, lg: 2 }}>
          {description}
        </Body>
      </VStack>
      <Collapse in={isOpen}>
        {isOpenAfter && (
          <VStack paddingTop={4} paddingX={'1px'}>
            {children}
          </VStack>
        )}
      </Collapse>
    </CardLayout>
  )
}
