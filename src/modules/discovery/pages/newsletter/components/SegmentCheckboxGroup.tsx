import { Checkbox, useColorModeValue, Wrap, WrapItem } from '@chakra-ui/react'
import { t } from 'i18next'

import { NEWSLETTER_SEGMENTS } from '../constants.ts'

type SegmentCheckboxGroupProps = {
  selected: Set<string>
  onChange: (selected: Set<string>) => void
}

/** Checkbox group letting users opt into specific newsletter segments. */
export const SegmentCheckboxGroup = ({ selected, onChange }: SegmentCheckboxGroupProps) => {
  const labelColor = useColorModeValue('neutral1.11', 'neutral1.12')

  const toggle = (id: string) => {
    const next = new Set(selected)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }

    onChange(next)
  }

  return (
    <Wrap spacing={4} aria-label={t('Newsletter topics')}>
      {NEWSLETTER_SEGMENTS.map((segment) => (
        <WrapItem key={segment.id}>
          <Checkbox
            colorScheme="primary1"
            isChecked={selected.has(segment.id)}
            onChange={() => toggle(segment.id)}
            color={labelColor}
            fontWeight={500}
            size="md"
          >
            {segment.label}
          </Checkbox>
        </WrapItem>
      ))}
    </Wrap>
  )
}
