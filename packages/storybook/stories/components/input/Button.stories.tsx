import { BellIcon } from '@chakra-ui/icons'
import { Button as ChakraButton } from '@chakra-ui/react'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

const meta = {
  title: 'Components/Input/Button',
  component: ChakraButton,
  tags: ['autodocs'],
  args: {
    children: 'Button',
  },
  argTypes: {
    variant: {
      options: ['solid', 'soft', 'surface', 'outline', 'ghost'],
      control: { type: 'select' },
    },
    colorScheme: {
      options: ['primary1', 'neutral1', 'error'],
      control: { type: 'select' },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof ChakraButton>

export default meta
type Story = StoryObj<typeof meta>

export const SimpleButton: Story = {
  args: {
    variant: 'primary',
  },
}

export const LeftIconButton: Story = {
  args: {
    variant: 'primary',
    leftIcon: <BellIcon />,
  },
}

export const RightIconButton: Story = {
  args: {
    variant: 'primary',
    rightIcon: <BellIcon />,
  },
}
