import React from 'react';
import Select from 'react-select';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants';
import classNames from 'classnames';
import { useDisclosure } from '@chakra-ui/react';

const useStyles = createUseStyles({
	inputElement: ({focused}:{focused: boolean}) => ({
		'& .platform__select__control': {
			borderWidth: '2px',
			borderColor: focused ? colors.normalLightGreen : colors.bgLightGrey,
			boxShadow: focused ? `0 0 0 1px ${colors.normalLightGreen}` : `0 0 0 1px ${colors.bgLightGrey}`,
			'&:hover': {
				borderColor: colors.normalLightGreen,
				boxShadow: `0 0 0 1px ${colors.normalLightGreen}`,
			},
			'&:active': {
				borderColor: colors.normalLightGreen,
				boxShadow: `0 0 0 1px ${colors.normalLightGreen}`,
			},
		},
		'& .platform__select__menu': {
			zIndex: 9,
		},
		'& .platform__select__option': {
			'&:hover': {
				backgroundColor: colors.normalLightGreen,

			},
		},
		'& .platform__select__option--is-selected': {
			backgroundColor: colors.bgLightGreen,
			color: 'black',
		},

	}),
});

export const SelectComponent = ({className, ...rest}: any) => {
	const {isOpen: focused, onOpen: onFocus, onClose: onBlur} = useDisclosure();
	const classes = useStyles({focused});

	return (
		<Select
			onFocus={onFocus}
			onBlur={onBlur}
			classNamePrefix="platform__select"
			className={classNames(classes.inputElement, className)}
			{...rest}
		/>
	);
};
