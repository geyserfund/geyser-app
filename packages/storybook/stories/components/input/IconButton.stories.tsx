import { BellIcon } from '@chakra-ui/icons'
import { IconButton as ChakraButton } from '@chakra-ui/react'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

const meta = {
  title: 'Components/Input/IconButton',
  component: ChakraButton,
  tags: ['autodocs'],
  args: {
    icon: <BellIcon />,
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
    variant: {
      options: ['solid', 'soft', 'surface', 'outline', 'ghost'],
      control: { type: 'select' },
    },
    colorScheme: {
      options: ['primary1', 'neutral1', 'error'],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof ChakraButton>

export default meta
type Story = StoryObj<typeof meta>

export const IconButton: Story = {
  args: {
    variant: 'primary',
    'aria-label': 'Notification',
  },
}
