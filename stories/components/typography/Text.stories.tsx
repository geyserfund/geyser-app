import { BellIcon } from '@chakra-ui/icons'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Body } from '../../../src/shared/components/typography/Body'

const meta = {
  title: 'Components/typography/Text',
  component: Body,
  tags: ['autodocs'],
  args: {
    children: 'This is the text body.',
  },
  argTypes: {
    fontSize: {
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
      control: { type: 'radio' },
      defaultValue: 'xl',
    },
  },
} satisfies Meta<typeof Body>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {}
