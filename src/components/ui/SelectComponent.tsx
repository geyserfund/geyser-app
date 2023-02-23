import classNames from 'classnames'
import { createUseStyles } from 'react-jss'
import Select from 'react-select'
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager'

import { colors } from '../../styles'

const useStyles = createUseStyles({
  inputElement: {
    width: '100%',
    '& .platform__select__control': {
      borderRadius: '8px',
      borderWidth: '2px',
      borderColor: colors.gray200,
      '&:hover': {
        borderColor: colors.gray300,
        cursor: 'text',
      },
      '&:active': {
        borderColor: colors.normalLightGreen,
        boxShadow: `none`,
      },
    },
    '& .platform__select__input': {
      fontWeight: 600,
    },
    '& .platform__select__control--is-focused': {
      borderColor: `${colors.normalLightGreen} !important`,
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
      borderColor: colors.normalLightGreen,
      boxShadow: 'none',
      borderTopWidth: 0,
      marginTop: '-2px',
      paddingTop: '10px',
      backgroundColor: colors.neutral50,
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
        backgroundColor: colors.gray300,
      },
    },
    '& .platform__select__indicator-separator ': {
      display: 'none',
    },
    '& .platform__select__indicator ': {
      display: 'none',
    },
    '& .platform__select__option--is-focused': {
      backgroundColor: colors.neutral200,
    },
    '& .platform__select__option--is-selected': {
      backgroundColor: colors.bgLightGreen,
      color: 'black',
    },
  },
})

export function SelectComponent<T, S extends boolean>({
  className,
  ...rest
}: { fullWidth?: boolean } & StateManagerProps<T, S, any>) {
  const classes = useStyles()
  return (
    <Select
      classNamePrefix="platform__select"
      className={classNames(classes.inputElement, className)}
      {...rest}
    />
  )
}
