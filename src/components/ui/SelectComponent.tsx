import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { createUseStyles } from 'react-jss'
import Select from 'react-select'
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager'

import { AppTheme } from '../../context'

type Rules = string

interface StyleProps {
  showIndicator?: boolean
}

const useStyles = createUseStyles<Rules, StyleProps, AppTheme>(
  ({ colors }: AppTheme) => ({
    inputElement: ({ showIndicator }: StyleProps) => ({
      width: '100%',
      '& .platform__select__control': {
        borderRadius: '8px',
        borderWidth: '2px',
        backgroundColor: colors.neutral[50],
        borderColor: colors.neutral[400],
        '&:hover': {
          borderColor: colors.neutral[600],
          cursor: 'text',
        },
        '&:active': {
          borderColor: colors.neutral[800],
          boxShadow: `none`,
        },
      },
      '& .platform__select__input-container': {
        color: colors.neutral[600],
      },
      '& .platform__select__input': {
        fontWeight: 600,
      },
      '& .platform__select__control--is-focused': {
        borderColor: `${colors.neutral[500]} !important`,
        boxShadow: `none`,
      },
      '& .platform__select__control--menu-is-open': {
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomColor: 'transparent !important',
      },
      '& .platform__select__menu': {
        borderRadius: '8px',
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        border: '2px solid',
        borderColor: colors.neutral[500],
        boxShadow: 'none',
        borderTopWidth: 0,
        marginTop: '-2px',
        paddingTop: '10px',
        backgroundColor: colors.neutral[50],
        zIndex: 9,
      },
      '& .platform__select__menu-notice': {
        textAlign: 'start',
      },
      '& .platform__select__menu-list': {
        maxHeight: '190px',
        borderTopWidth: '0px !important',
      },
      '& .platform__select__option': {
        fontSize: '14px',
        '&:hover': {
          backgroundColor: colors.neutral[400],
        },
      },
      '& .platform__select__indicator-separator ': {
        display: 'none',
      },
      '& .platform__select__dropdown-indicator ': {
        display: !showIndicator ? 'none' : undefined,
      },
      '& .platform__select__option--is-focused': {
        backgroundColor: colors.neutral[200],
      },
      '& .platform__select__option--is-selected': {
        backgroundColor: colors.neutral[0],
        color: colors.neutral[600],
      },
    }),
  }),
)

export interface SelectComponentProps<T = any, S extends boolean = any>
  extends StateManagerProps<T, S, any> {
  fullWidth?: boolean
  showIndicator?: boolean
  placeholder?: string
}

export function SelectComponent<T, S extends boolean>({
  className,
  placeholder,
  showIndicator,
  ...rest
}: SelectComponentProps<T, S>) {
  const { t } = useTranslation()
  const classes = useStyles({ showIndicator })

  return (
    <Select
      classNamePrefix="platform__select"
      className={classNames(classes.inputElement, className)}
      placeholder={placeholder || t('Select')}
      {...rest}
    />
  )
}
