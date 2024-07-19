import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StylesConfig } from 'react-select'
import Select from 'react-select'
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager'

import { useCustomTheme } from '../../../../../utils'

export interface SelectComponentProps<T = any, S extends boolean = any> extends StateManagerProps<T, S, any> {
  placeholder?: string
  backgroundColor?: string
  hoverBgColor?: string
}

export function SelectComponent<T, S extends boolean>({
  placeholder,
  backgroundColor,
  hoverBgColor,
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
          minHeight: '32px',
          height: '32px',
          boxShadow: 'none',
          backgroundColor,
          borderRadius: '8px',
          borderWidth: '1px',
          '&:hover': {
            borderColor: colors.neutral1[7],
            cursor: 'pointer',
          },
          ...(props.menuIsOpen
            ? currentPlacement === 'bottom'
              ? {
                  borderBottomRightRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderBottomColor: 'transparent !important',
                  borderColor: colors.neutral1[6],
                }
              : {
                  borderTopRightRadius: 0,
                  borderTopLeftRadius: 0,
                  borderTopColor: 'transparent !important',
                  borderColor: colors.neutral1[6],
                }
            : {
                borderColor: colors.neutral1[6],
              }),
        }
      },
      placeholder(base, props) {
        return {
          ...base,
          color: colors.neutral1[11],
        }
      },
      valueContainer: (provided: any, state: any) => ({
        ...provided,
        height: '28px',
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
          color: colors.neutral1[11],
        }
      },
      menu(base, props) {
        setCurrentPlacement(props.placement)
        return {
          ...base,
          borderRadius: '8px',
          border: '1px solid',
          borderColor: colors.neutral1[7],
          boxShadow: 'none',
          backgroundColor: colors.utils.pbg,
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
          backgroundColor: props.isSelected ? colors.neutral1[1] : undefined,
          color: props.isSelected ? colors.neutral1[7] : undefined,
          fontSize: '14px',
          '&:hover': {
            backgroundColor: colors.neutral1[4],
            cursor: 'pointer',
          },
          '&:focused': {
            backgroundColor: colors.neutral1[4],
            cursor: 'pointer',
          },
        }
      },
      indicatorSeparator: () => ({
        display: 'none',
      }),
      indicatorsContainer: (provided: any, state: any) => ({
        ...provided,
        height: '28px',
        padding: '0px 5px',
        display: 'flex',
        direction: 'column',
        justifyContent: 'center',
      }),
      dropdownIndicator(base, props) {
        return {
          ...base,
          color: colors.neutral[600],
        }
      },
    }),
    [backgroundColor, colors, currentPlacement],
  )

  return <Select styles={styles} placeholder={placeholder || t('Select')} menuPlacement="auto" {...rest} />
}
