import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Select, { StylesConfig } from 'react-select'
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager'

import { useCustomTheme } from '../../utils'

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
  const { colors } = useCustomTheme()

  const [currentPlacement, setCurrentPlacement] = useState('bottom')

  const styles: StylesConfig<T, S> = useMemo(
    () => ({
      control(base, props) {
        return {
          ...base,
          minWidth: '140px',
          minHeight: '40px',
          boxShadow: 'none',
          borderRadius: '8px',
          borderWidth: '2px',
          backgroundColor: colors.neutral[50],
          '&:hover': {
            borderColor: colors.neutral[400],
            cursor: 'pointer',
          },
          ...(props.menuIsOpen
            ? currentPlacement === 'bottom'
              ? {
                  borderBottomRightRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderBottomColor: 'transparent !important',
                  borderColor: colors.neutral[500],
                }
              : {
                  borderTopRightRadius: 0,
                  borderTopLeftRadius: 0,
                  borderTopColor: 'transparent !important',
                  borderColor: colors.neutral[500],
                }
            : {
                borderColor: colors.neutral[100],
              }),
        }
      },
      placeholder(base, props) {
        return {
          ...base,
          color: colors.neutral[900],
        }
      },
      valueContainer: (provided: any, state: any) => ({
        ...provided,
        padding: '0 6px',
        verticalAlign: 'middle',
      }),
      input: (provided: any, state: any) => ({
        ...provided,
        margin: '0px',
        padding: '0px',
      }),
      singleValue(base, props) {
        return {
          ...base,
          color: colors.neutral[900],
        }
      },
      menu(base, props) {
        setCurrentPlacement(props.placement)
        return {
          ...base,
          borderRadius: '8px',
          border: '2px solid',
          borderColor: colors.neutral[500],
          boxShadow: 'none',
          backgroundColor: colors.neutral[50],
          overflow: 'hidden',
          zIndex: 999,
          ...(props.placement === 'bottom'
            ? {
                borderTopRightRadius: 0,
                borderTopLeftRadius: 0,
                borderTopWidth: 0,
                marginTop: '-3px',
                paddingTop: '0px',
              }
            : {
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
                borderBottomWidth: 0,
                marginBottom: '-3px',
                paddingBottom: '0px',
              }),
        }
      },
      menuList: (base, props) => ({
        ...base,
        paddingTop: '0px',
        paddingBottom: '0px',
        maxHeight: '190px',
        borderTopWidth: '0px',
      }),
      option(base, props) {
        return {
          ...base,
          backgroundColor: props.isSelected ? colors.neutral[0] : undefined,
          color: props.isSelected ? colors.neutral[600] : undefined,
          fontSize: '14px',
          '&:hover': {
            backgroundColor: colors.neutral[400],
            cursor: 'pointer',
          },
          '&:focused': {
            backgroundColor: colors.neutral[400],
            cursor: 'pointer',
          },
        }
      },
      indicatorSeparator: () => ({
        display: 'none',
      }),
      indicatorsContainer: (provided: any, state: any) => ({
        ...provided,
        padding: '0px 5px',
        display: 'flex',
        direction: 'column',
        justifyContent: 'center',
      }),
      dropdownIndicator(base, props) {
        return {
          ...base,
          color: colors.neutral[600],
          display: !showIndicator ? 'none' : undefined,
        }
      },
    }),
    [colors, currentPlacement, showIndicator],
  )

  return (
    <Select
      styles={styles}
      classNamePrefix="platform__select"
      className={className}
      placeholder={placeholder || t('Select')}
      menuPortalTarget={document.body}
      {...rest}
    />
  )
}
