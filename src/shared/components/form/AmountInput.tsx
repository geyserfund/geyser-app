import { Button, HStack, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

import { MIN_WIDTH_AFTER_START } from '@/modules/project/pages/projectFunding/views/fundingInit/sections/DonationInput.tsx'
import { commaFormatted } from '@/shared/utils/formatData/index.ts'

import { Body } from '../typography'

export const AmountInput = (props: {
  size?: 'md' | 'lg'
  inputRef?: React.Ref<HTMLInputElement>
  satoshi: number
  dollar: number
  isSatoshi: boolean
  handleInput?: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onToggle: () => void
}) => {
  const [satsPosition, setSatsPosition] = useState(MIN_WIDTH_AFTER_START)

  const isSmallSize = props.size === 'md'

  useEffect(() => {
    if (props.satoshi) {
      const currentText = commaFormatted(props.satoshi)
      const commaCount = (currentText.match(/,/g) || []).length
      const restCount = currentText.length - commaCount
      const textWidth = isSmallSize ? restCount * 9 + commaCount * 5 : (restCount - 1) * 28 + commaCount * 15

      setSatsPosition(textWidth + MIN_WIDTH_AFTER_START)
    } else {
      setSatsPosition(MIN_WIDTH_AFTER_START)
    }
  }, [props.satoshi, isSmallSize])

  return (
    <HStack w="full" position="relative">
      <InputGroup>
        <Input
          ref={props.inputRef}
          data-testid="donation-input"
          borderRadius="12px"
          fontSize={isSmallSize ? 'xl' : '5xl'}
          height={isSmallSize ? '40px' : '70px'}
          fontWeight={isSmallSize ? 500 : 700}
          lineHeight="1.0"
          value={
            props.satoshi > 0 ? (props.isSatoshi ? commaFormatted(props.satoshi) : commaFormatted(props.dollar)) : ''
          }
          type="text"
          onChange={props.handleInput}
          onKeyDown={props.handleKeyDown}
          pl={isSmallSize ? 7 : props.isSatoshi ? 4 : 9}
          _placeholder={{
            color: 'neutral1.11',
          }}
          color="utils.text"
          placeholder="0"
        />
        <InputRightElement
          w="fit-content"
          minWidth="100px"
          maxWidth="150px"
          height="100%"
          display="flex"
          alignItems={'center'}
          paddingRight={isSmallSize ? 2 : 3}
        >
          <Button
            data-testid="toggle-donation-input"
            w="100%"
            variant="soft"
            size={isSmallSize ? 'md' : 'lg'}
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

      <motion.p
        animate={{
          left: props.isSatoshi ? `${satsPosition}px` : '14px',
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 200,
        }}
        style={{
          fontSize: isSmallSize ? 'var(--chakra-fontSizes-xl)' : 'var(--chakra-fontSizes-3xl)',
          fontWeight: isSmallSize ? 500 : 700,
          color: 'var(--chakra-colors-neutral1-9)',
          position: 'absolute',
          top: '49%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }}
      >
        {props.isSatoshi ? 'sats' : '$'}
      </motion.p>
    </HStack>
  )
}
