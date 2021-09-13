import { IconButton } from '@chakra-ui/button';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { Icon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/layout';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { Switch } from '@chakra-ui/switch';
import React from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import {FaMoon, FaSun} from 'react-icons/fa';
import { createUseStyles } from 'react-jss';
import { colors, styles } from '../../constants';

const useStyles = createUseStyles({
	menuList: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		minWidth: '150px',
		backgroundColor: colors.primary,
		color: colors.textBlack,
		padding: 0,
		borderRadius: 20,
		overflow: 'hidden',
		'& button': {
			'&:hover': {
				backgroundColor: colors.primaryTint,
			},
			'&:active': {
				backgroundColor: colors.primaryTint,
			},
			'&:focus': {
				backgroundColor: colors.primaryTint,
			},
		},
	},
	menuItem: {
		display: 'flex',
		justifyContent: 'center',
	},
	switchContainer: {
		paddingTop: '5px',
		paddingBottom: '10px',
		position: 'relative',
	},
	iconNight: {
		position: 'absolute',
		right: '5.5px',
		top: 11,
		pointerEvents: 'none',
	},
	iconDay: {
		position: 'absolute',
		left: '5.5px',
		top: 11,
		pointerEvents: 'none',
	},
});

export const NavMenu = () => {
	const classes = useStyles();
	const {colorMode, toggleColorMode} = useColorMode();
	const textColor = useColorModeValue(colors.textBlack, colors.textWhite);
	const backgroundColor = useColorModeValue(colors.bgWhite, colors.bgDark);
	const iconClassName = useColorModeValue(classes.iconNight, classes.iconDay);
	const SwitchIcon = useColorModeValue(FaMoon, FaSun);

	return (
		<Menu placement="bottom" >
			<MenuButton
				as={IconButton}
				aria-label="options"
				borderRadius="50%"
				color={textColor}
				backgroundColor={backgroundColor}
				icon={<Icon as={FiMoreHorizontal} boxSize="30px"/>}
				variant="solid"
				margin="0px 12px"
				sx={styles.buttonCommon}
			/>
			<MenuList width="150px" className={classes.menuList}>
				<MenuItem className={classes.menuItem}>
                    About
				</MenuItem>
				<MenuItem className={classes.menuItem}>
                    TC
				</MenuItem>
				<MenuItem className={classes.menuItem}>
                    Feedback
				</MenuItem>
				<MenuItem className={classes.menuItem}>
                    Lightening 101
				</MenuItem>
				<Box className={classes.switchContainer}>
					<Switch
						colorScheme="blackAlpha"
						size="lg"
						isChecked={colorMode === 'light'}
						onChange={toggleColorMode}
					/>
					<Icon className={iconClassName} as={SwitchIcon}/>
				</Box>

			</MenuList>
		</Menu>
	);
};
