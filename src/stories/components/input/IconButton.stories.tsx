import { BellIcon } from '@chakra-ui/icons'
import { IconButton as ChakraButton } from '@chakra-ui/react'
import type { Meta, StoryObj } from '@storybook/react'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Input/IconButton',
  component: ChakraButton,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    icon: <BellIcon />,
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
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
  },
}
