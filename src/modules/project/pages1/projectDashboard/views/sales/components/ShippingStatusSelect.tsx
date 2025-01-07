import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StylesConfig, Props } from 'react-select'
import Select from 'react-select'


import { useCustomTheme } from '../../../../../../../utils'

export interface ShippingStatusSelectProps<T = any, S extends boolean = any> extends Props<T, S, any> {
  placeholder?: string
  backgroundColor?: string
  hoverBgColor?: string
}

export function ShippingStatusSelect<T, S extends boolean>({
  placeholder,
  backgroundColor,
  hoverBgColor,
  value,
  ...rest
}: ShippingStatusSelectProps<T, S>) {
  const { t } = useTranslation()
  const { colors } = useCustomTheme()

  const [currentPlacement, setCurrentPlacement] = useState('bottom')

  const styles: StylesConfig<T, S> = useMemo(
    () => ({
      control(base, props) {
        return {
          ...base,
          minWidth: '100px',
          maxWidth: '120px',
          minHeight: '24px',
          height: '24px',
          boxShadow: 'none',
          backgroundColor,
          borderRadius: '8px',
          borderWidth: '1px',
          borderColor: colors.neutral[900],
          '&:hover': {
            backgroundColor: hoverBgColor,
            cursor: 'pointer',
          },
          ...(props.menuIsOpen
            ? currentPlacement === 'bottom'
              ? {
                  borderBottomRightRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderBottomColor: 'transparent !important',
                }
              : {
                  borderTopRightRadius: 0,
                  borderTopLeftRadius: 0,
                  borderTopColor: 'transparent !important',
                }
            : {}),
        }
      },

      valueContainer: (provided: any, state: any) => ({
        ...provided,
        height: '24px',
        padding: '0 6px',
        fontSize: '12px',
      }),

      input: (provided: any, state: any) => ({
        ...provided,
        margin: '0px',
        padding: '5px 0px',
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
          border: '1px solid',
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
                marginTop: '-1px',
                paddingTop: '0px',
              }
            : {
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
                borderBottomWidth: 0,
                marginBottom: '-1px',
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
          padding: '4px 10px',
          backgroundColor: props.isSelected ? colors.neutral[0] : undefined,
          color: props.isSelected ? colors.neutral[600] : undefined,
          fontSize: '12px',
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
        height: '24px',
        display: 'flex',
        direction: 'column',
        justifyContent: 'center',
      }),
      dropdownIndicator(base, props) {
        return {
          ...base,
          padding: '0px 5px',
          color: colors.neutral[600],
        }
      },
    }),
    [backgroundColor, hoverBgColor, colors, currentPlacement],
  )

  return (
    <Select
      styles={styles}
      classNamePrefix="contributions__select"
      placeholder={placeholder || t('Select')}
      value={value}
      menuPlacement="auto"
      {...rest}
    />
  )
}
