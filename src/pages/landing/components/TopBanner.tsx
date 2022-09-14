import React, { useEffect } from 'react';
import { HStack, Text, VStack, Skeleton } from '@chakra-ui/react';
import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router';
import { useQuery } from '@apollo/client';

import BannerPattern from '../../../assets/banner-pattern.png';
import { colors } from '../../../constants';
import { isMobileMode, useNotification } from '../../../utils';
import { ButtonComponent } from '../../../components/ui';
import { ALL_PROJECTS_SUMMARY } from '../../../graphql';

type RuleNames = string

interface IStyleProps {
	isMobile?: boolean
}

const useStyles = createUseStyles<RuleNames, IStyleProps>({
	subtitleText: {
		fontSize: '12px',
		fontWeight: 500,
		color: '#2B2A2A',
	},
});

export const TopBanner = () => {
	const isMobile = isMobileMode();
	const { toast } = useNotification();
	const classes = useStyles({ isMobile: isMobileMode() });
	const history = useHistory();

	const { loading: summaryLoading, error: summaryError, data: summaryData } = useQuery(ALL_PROJECTS_SUMMARY);
	const summary = (summaryData && summaryData.projectsSummary) || {};

	useEffect(() => {
		if (summaryError) {
			toast({
				title: 'Could not load summary data',
				description: 'Please refresh the page',
				status: 'error',
			});
		}
	}, [summaryError]);

	const handleLaunch = () => {
		history.push('/launch');
	};

	return (
		<VStack
			display="flex" width="full" height="250px" paddingBottom={30} paddingRight={30} paddingLeft={30} paddingTop={30}
			backgroundImage={BannerPattern} justifyContent="flex-start">
			<Text
				lineHeight="40px"
				fontSize={isMobile ? '27px' : '32px'}
				fontWeight={700}
				textColor={colors.secondaryPink}
				justifyItems="center"
			>
                    Play a part in world-changing ideas
			</Text>
			<Text
				textColor={colors.neutral900}
				justifyItems="center"
			>
                    Geyser is a global crowdfunding platform that helps Bitcoin creators change the world with their communities
			</Text>
			{ summaryLoading
				? <>
					<VStack>
						<Skeleton w="50px" h="25px"/>
						<Text className={classes.subtitleText}>PROJECTS</Text>
					</VStack>
					<VStack>
						<Skeleton w="100px" h="25px"/>
						<Text className={classes.subtitleText}>SATS RAISED</Text>
					</VStack><VStack>
						<Skeleton w="50px" h="25px"/>
						<Text className={classes.subtitleText}>PLEBS</Text>
					</VStack></>
				: <HStack>
					<HStack><Text fontWeight={500} textColor={colors.neutral900}>{summary.projectsCount}</Text><Text textColor={colors.neutral700}>PROJECTS</Text></HStack>
					<HStack><Text fontWeight={500} textColor={colors.neutral900}>{summary.fundedTotal}</Text><Text textColor={colors.neutral700}>SATS RAISED</Text></HStack>
					<HStack><Text fontWeight={500} textColor={colors.neutral900}>{summary.fundersCount}</Text><Text textColor={colors.neutral700}>PLEB CONTRIBUTORS</Text></HStack>
				</HStack>
			}
			<ButtonComponent
				primary
				width={300}
				onClick={handleLaunch}
			>
                    Launch your project
			</ButtonComponent>
		</VStack>
	);
};
