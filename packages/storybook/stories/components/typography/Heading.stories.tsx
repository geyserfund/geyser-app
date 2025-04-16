import { BellIcon } from '@chakra-ui/icons'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { BaseHeading } from '../../../../../src/shared/components/typography/Heading'

const meta = {
  title: 'Components/typography/Heading',
  component: BaseHeading,
  tags: ['autodocs'],
  args: {
    children: 'Heading',
  },
  argTypes: {
    fontSize: {
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
      control: { type: 'radio' },
      defaultValue: 'xl',
    },
  },
} satisfies Meta<typeof BaseHeading>

export default meta
type Story = StoryObj<typeof meta>

export const H1: Story = {
  args: {
    as: 'h1',
  },
}

export const H2: Story = {
  args: {
    as: 'h2',
  },
}

export const H3: Story = {
  args: {
    as: 'h3',
  },
}

export const H4: Story = {
  args: {
    as: 'h4',
  },
}

export const H5: Story = {
  args: {
    as: 'h5',
  },
}

export const H6: Story = {
  args: {
    as: 'h6',
  },
}
