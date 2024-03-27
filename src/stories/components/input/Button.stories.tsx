import { BellIcon } from '@chakra-ui/icons'
import { Button as ChakraButton } from '@chakra-ui/react'
import type { Meta, StoryObj } from '@storybook/react'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Input/Button',
  component: ChakraButton,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    children: 'Button',
  },
  argTypes: {
    variant: {
      options: [
        'primary',
        'primaryNeutral',
        'primaryLink',
        'primaryGradient',
        'secondary',
        'secondaryNeutral',
        'transparent',
      ],
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
