import { Image, Text } from '@chakra-ui/react';
import classNames from 'classnames';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router';
import { isDarkMode } from '../../utils';
import { Card, FundingStatus, ICard } from '../ui';

interface IProjectCardProp extends ICard {
	title: string
	open?: boolean
	name: string
	className?: string
}

const useStyles = createUseStyles({
	container: {
		'&:hover': {
			cursor: 'pointer',
		},
	},
});

export const ProjectCard = ({ title, open, name, className, ...rest }: IProjectCardProp) => {
	const classes = useStyles();
	const history = useHistory();
	const isDark = isDarkMode();

	const handleCardCLick = () => {
		history.push(`/project/${name}`);
	};

	return (
		<Card
			className={classNames(classes.container, className)}
			backgroundColor={isDark ? 'brand.bgHeavyDarkMode' : undefined}
			borderRadius="5px"
			height="fit-content"
			padding="5px"
			display="flex"
			flexDirection="column"
			alignItems="center"
			onClick={handleCardCLick}
			maxWidth="500px"
			minWidth="350px"
			width="100%"
			{...rest}
		>
			<Image src="https://picsum.photos/500/600" height="150px" width="100%" borderRadius="5px" marginBottom="10px" />
			<Text fontSize="15px" marginBottom="10px"> {title}</Text>
			<FundingStatus open={open}/>
		</Card>
	);
};

