import { Guardian } from './types'

export const GuardiansGradients = {
  light: {
    [Guardian.Warrior]: {
      dim: 'linear-gradient(180deg, rgba(136, 128, 135, 0.2) 0%, rgba(52, 69, 97, 0) 70%);',
      bright: 'linear-gradient(180deg, rgba(136, 128, 135, 0.3) 0%, rgba(52, 69, 97, 0) 70%);',
    },

    [Guardian.Knight]: {
      dim: 'linear-gradient(180deg, rgba(175, 142, 191, 0.2) 0%, rgba(74, 76, 139, 0) 70%);',
      bright: 'linear-gradient(180deg, rgba(175, 142, 191, 0.3) 0%, rgba(74, 76, 139, 0) 70%);',
    },

    [Guardian.King]: {
      dim: 'linear-gradient(180deg, rgba(246, 204, 69, 0.2) 0%, rgba(198, 144, 49, 0) 70%);',
      bright: 'linear-gradient(180deg, rgba(246, 204, 69, 0.3) 0%, rgba(198, 144, 49, 0) 70%);',
    },

    [Guardian.Legend]: {
      dim: 'linear-gradient(180deg, rgba(83, 183, 163, 0.2) 0%, rgba(55, 126, 125, 0) 70%);',
      bright: 'linear-gradient(180deg, rgba(83, 183, 163, 0.3) 0%, rgba(55, 126, 125, 0) 70%);',
    },
  },
  dark: {
    [Guardian.Warrior]: {
      dim: 'linear-gradient(180deg, rgba(52, 69, 97, 0.2) 0%, rgba(123, 163, 229, 0) 70%);',
      bright: 'linear-gradient(180deg, rgba(52, 69, 97, 0.3) 0%, rgba(123, 163, 229, 0) 70%);',
    },

    [Guardian.Knight]: {
      dim: 'linear-gradient(180deg, rgba(74, 76, 139, 0.2) 0%, rgba(175, 142, 191, 0) 70%);',
      bright: 'linear-gradient(180deg, rgba(74, 76, 139, 0.3) 0%, rgba(175, 142, 191, 0) 70%);',
    },

    [Guardian.King]: {
      dim: 'linear-gradient(180deg, rgba(198, 144, 49, 0.2) 0%, rgba(246, 204, 69, 0) 70%);',
      bright: 'linear-gradient(180deg, rgba(198, 144, 49, 0.3) 0%, rgba(246, 204, 69, 0) 70%);',
    },

    [Guardian.Legend]: {
      dim: 'linear-gradient(180deg, rgba(55, 126, 125, 0.2) 0%, rgba(83, 183, 163, 0) 70%);',
      bright: 'linear-gradient(180deg, rgba(55, 126, 125, 0.3) 0%, rgba(83, 183, 163, 0) 70%);',
    },
  },
}
