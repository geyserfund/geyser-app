import type { Preview } from '@storybook/react'
import {theme} from '../src/config/theme/theme'
import { lightModeColors } from '../src/shared/styles'


const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    chakra: {
      theme: {...theme, colors: lightModeColors},
    }
    
  },
}

export default preview
