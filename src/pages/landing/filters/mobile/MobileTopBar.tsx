import {
  Button,
  HStack,
  StackProps,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useRef } from 'react'
import { BsSliders } from 'react-icons/bs'

import { Body1 } from '../../../../components/typography'
import { FilterTopBar } from '../../projects/components'
import { FilterDrawer } from './FilterDrawer'

interface MobileTopBarProps extends StackProps {
  title: string
  subTitle?: string
}

export const MobileTopBar = ({
  title,
  subTitle,
  ...rest
}: MobileTopBarProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const btnRef = useRef(null)

  return (
    <>
      <VStack
        width="100%"
        borderBottom="2px solid"
        borderColor="neutral.200"
        spacing="0px"
        {...rest}
      >
        <HStack width="100%" justifyContent="space-between" paddingY="6px">
          <Body1 semiBold color="neutral.1000">
            {title}
          </Body1>
          <Button
            ref={btnRef}
            size="sm"
            variant="primaryNeutral"
            color="neutral.800"
            rightIcon={<BsSliders fontSize="16px" />}
            onClick={onOpen}
          >
            {subTitle || 'Sort & filter'}
          </Button>
        </HStack>
        <FilterTopBar paddingBottom="10px" />
      </VStack>

      <FilterDrawer
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
        title={title}
      />
    </>
  )
}
