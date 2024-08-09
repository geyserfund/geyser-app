import { BellIcon } from '@chakra-ui/icons'
import { Badge } from '@chakra-ui/react'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

const meta = {
  title: 'Components/Display/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    children: 'Badge',
  },
  argTypes: {
    variant: {
      options: ['solid', 'soft', 'surface', 'outline'],
      control: { type: 'select' },
    },
    colorScheme: {
      options: ['primary1', 'neutral1', 'error', 'success', 'warning', 'info'],
      control: { type: 'select' },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const SimpleBadge: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    colorScheme: 'primary1',
  },
}
