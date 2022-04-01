import {
	Input,
	InputGroup,
	InputLeftElement,
	InputProps,
	InputRightElement,
	Button,
	useDisclosure,
	InputGroupProps,
} from '@chakra-ui/react';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { BiDollar } from 'react-icons/bi';
import { BsArrowRepeat } from 'react-icons/bs';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants';
import { useBtcContext } from '../../context/btc';
import { SatoshiIcon } from '../icons';

const useStyles = createUseStyles({
	inputElement: {
		borderWidth: '2px',
		textAlign: 'center',
		'&:focus': {
			borderColor: colors.normalLightGreen,
			boxShadow: `0 0 0 1px ${colors.normalLightGreen}`,
		},
	},
	switchButtton: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 0,
		background: 'none',
		color: colors.textGrey,
		position: 'relative',
		'&:hover': {
			background: 'none',
		},
	},
	insideIcon: {
		position: 'absolute',
	},
	switchIcon: {
		fontSize: '35px',
	},
});

interface IDonationInputProps extends InputProps {
    name: string
    onChange: any
	inputGroup?: InputGroupProps
}

export const DonationInput = ({className, onChange, name, inputGroup, ...rest}: IDonationInputProps) => {
	const {btcRate} = useBtcContext();

	const classes = useStyles();

	const {isOpen: isDollar, onToggle} = useDisclosure();
	const isSatoshi = !isDollar;

	const [satoshi, setSatoshi] = useState(0);
	const [dollar, setDollar] = useState(0.0);

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const val = parseInt(event.target.value, 10);
		console.log('cehcking btcRate', btcRate);
		if (isSatoshi) {
			setSatoshi(val);
			setDollar(Math.round(val * btcRate));
		} else {
			setDollar(val);
			setSatoshi(Math.round(val / btcRate));
		}
	};

	useEffect(() => {
		onChange(name, satoshi);
	}, [satoshi]);

	return (
		<InputGroup {...inputGroup}>
			<InputLeftElement>
				{
					isSatoshi ? <SatoshiIcon /> : <BiDollar fontSize="25px"/>
				}
			</InputLeftElement>
			<Input value={isSatoshi ? satoshi : dollar} type="number" className={classNames(classes.inputElement, className)} onChange={handleInput} {...rest} />
			<InputRightElement width="50px" >
				<Button className={classes.switchButtton} onClick={onToggle} variant="ghost">
					<BsArrowRepeat className={classes.switchIcon} />
					{
						isSatoshi ? <BiDollar className={classes.insideIcon}/>
							: <SatoshiIcon wrapperClass={classes.insideIcon} scale={0.7}/>
					}

				</Button>
			</InputRightElement>
		</InputGroup>
	);
};
