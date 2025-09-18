import { Button, HStack, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import { MIN_WIDTH_AFTER_START } from '@/modules/project/pages1/projectFunding/views/fundingInit/sections/DonationInput.tsx'
import { commaFormatted } from '@/shared/utils/formatData/index.ts'

import { Body } from '../typography'

export const AmountInput = (props: {
  inputRef?: React.Ref<HTMLInputElement>
  satoshi: number
  dollar: number
  isSatoshi: boolean
  handleInput?: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onToggle: () => void
}) => {
  const [satsPosition, setSatsPosition] = useState(MIN_WIDTH_AFTER_START)

  useEffect(() => {
    if (props.satoshi) {
      const currentText = commaFormatted(props.satoshi)
      const commaCount = (currentText.match(/,/g) || []).length
      const restCount = currentText.length - commaCount
      const textWidth = restCount * 9 + commaCount * 5

      setSatsPosition(textWidth + MIN_WIDTH_AFTER_START)
    } else {
      setSatsPosition(MIN_WIDTH_AFTER_START)
    }
  }, [props.satoshi])

  return (
    <HStack w="full" position="relative">
      <InputGroup>
        <Input
          ref={props.inputRef}
          data-testid="donation-input"
          borderRadius="12px"
          size="lg"
          fontWeight={500}
          value={
            props.satoshi > 0 ? (props.isSatoshi ? commaFormatted(props.satoshi) : commaFormatted(props.dollar)) : ''
          }
          type="text"
          onChange={props.handleInput}
          onKeyDown={props.handleKeyDown}
          pl={7}
          _placeholder={{
            color: 'neutral1.11',
          }}
          color="neutral1.11"
          placeholder="0"
        />
        <InputRightElement
          w="fit-content"
          minWidth="100px"
          maxWidth="150px"
          height="100%"
          display="flex"
          alignItems={'center'}
          paddingRight={2}
        >
          <Button
            data-testid="toggle-donation-input"
            w="100%"
            variant="soft"
            colorScheme="neutral1"
            onClick={props.onToggle}
          >
            {props.isSatoshi ? (
              <>
                <Body isTruncated>
                  {props.dollar > 0 ? `$${commaFormatted(props.dollar)}` : props.satoshi > 0 ? '< $1' : '$0'}
                </Body>
              </>
            ) : (
              <>
                <Body isTruncated>{commaFormatted(props.satoshi) || 0}</Body>
                <Body pl={0.5}>{'sats'}</Body>
              </>
            )}
          </Button>
        </InputRightElement>
      </InputGroup>

      <Body
        size="xl"
        position="absolute"
        top="49%"
        left={props.isSatoshi ? `${satsPosition}px` : '14px'}
        transform="translateY(-50%)"
        pointerEvents="none"
        transition="left 0.05s"
        muted
      >
        {props.isSatoshi ? 'sats' : '$'}
      </Body>
    </HStack>
  )
}
