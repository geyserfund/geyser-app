import { Button, HStack, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

import { MIN_WIDTH_AFTER_START } from '@/modules/project/pages/projectFunding/views/fundingInit/sections/DonationInput.tsx'
import { commaFormatted } from '@/shared/utils/formatData/index.ts'

import { Body } from '../typography'

export const AmountInput = (props: {
  size?: 'md' | 'lg'
  inputRef?: React.Ref<HTMLInputElement>
  satoshi: number
  dollar: number
  isSatoshi: boolean
  suffix?: string
  handleInput?: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onToggle: () => void
  isDisabled?: boolean
}) => {
  const [satsPosition, setSatsPosition] = useState(MIN_WIDTH_AFTER_START)
  const [suffixPosition, setSuffixPosition] = useState(MIN_WIDTH_AFTER_START)
  const amountMeasureRef = useRef<HTMLSpanElement>(null)
  const unitMeasureRef = useRef<HTMLSpanElement>(null)

  const isSmallSize = props.size === 'md'
  const displayAmount = commaFormatted(props.isSatoshi ? props.satoshi || 0 : props.dollar || 0)
  const inputFontSize = isSmallSize ? 'var(--chakra-fontSizes-xl)' : 'var(--chakra-fontSizes-5xl)'
  const inputFontWeight = isSmallSize ? 500 : 700
  const unitFontSize = isSmallSize ? 'var(--chakra-fontSizes-xl)' : 'var(--chakra-fontSizes-3xl)'
  const unitFontWeight = isSmallSize ? 500 : 700
  useEffect(() => {
    const amountWidth = amountMeasureRef.current?.offsetWidth ?? 0
    const unitWidth = unitMeasureRef.current?.offsetWidth ?? 0
    const satsStart = isSmallSize ? 28 : 16
    const satsGap = isSmallSize ? 4 : 8
    const suffixGap = isSmallSize ? 8 : 14

    if (props.isSatoshi) {
      setSatsPosition(amountWidth + satsStart + satsGap)
      setSuffixPosition(amountWidth + unitWidth + satsStart + satsGap + suffixGap)
    } else {
      const dollarStart = 14
      setSatsPosition(MIN_WIDTH_AFTER_START)
      setSuffixPosition(amountWidth + unitWidth + dollarStart + suffixGap)
    }
  }, [displayAmount, props.isSatoshi, isSmallSize])

  return (
    <HStack w="full" position="relative">
      <InputGroup>
        <Input
          ref={props.inputRef}
          data-testid="donation-input"
          borderRadius="innerCard"
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
          isDisabled={props.isDisabled}
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
            isDisabled={props.isDisabled}
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
          fontSize: unitFontSize,
          fontWeight: unitFontWeight,
          color: 'var(--chakra-colors-neutral1-9)',
          position: 'absolute',
          top: '49%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }}
      >
        {props.isSatoshi ? 'sats' : '$'}
      </motion.p>

      {props.suffix ? (
        <motion.p
          animate={{
            left: `${suffixPosition}px`,
            opacity: props.satoshi > 0 || props.dollar > 0 ? 1 : 0.7,
          }}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 200,
          }}
          style={{
            fontSize: unitFontSize,
            fontWeight: unitFontWeight,
            color: 'var(--chakra-colors-neutral1-9)',
            position: 'absolute',
            top: '49%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {props.suffix}
        </motion.p>
      ) : null}

      <span
        ref={amountMeasureRef}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          fontSize: inputFontSize,
          fontWeight: inputFontWeight,
          lineHeight: '1.0',
        }}
      >
        {displayAmount}
      </span>
      <span
        ref={unitMeasureRef}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          fontSize: unitFontSize,
          fontWeight: unitFontWeight,
          lineHeight: '1.0',
        }}
      >
        {props.isSatoshi ? 'sats' : '$'}
      </span>
    </HStack>
  )
}
