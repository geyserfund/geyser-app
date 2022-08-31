import { Box, Grid, GridItem, HStack, Image, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FileUpload } from '../../../components/molecules';
import { ButtonComponent, Card, ImageWithReload, TextArea, TextBox } from '../../../components/ui';
import { isMobileMode, validateEmail } from '../../../utils';
import {AiOutlineUpload} from 'react-icons/ai';
import { TProjectDetails } from './types';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { createUseStyles } from 'react-jss';
import { GeyserAssetDomainUrl, GeyserSkeletonUrl } from '../../../constants';
import { useHistory } from 'react-router';
import TitleWithProgressBar from '../../../components/molecules/TitleWithProgressBar';

const useStyles = createUseStyles({
	backIcon: {
		fontSize: '25px',
	},
});

export const ProjectCreate = () => {
	const isMobile = isMobileMode();
	const classes = useStyles();
	const history = useHistory();

	const [form, setForm] = useState<TProjectDetails>({title: '', description: '', image: '', email: ''});
	const [formError, setFormError] = useState<{[key: string]: string}>({});

	const handleChange = (event: any) => {
		if (event) {
			const {name, value} = event.target;
			setForm({...form, [name]: value || ''});
			setFormError({});
		}
	};

	const lighteningAddressPreview = form.title.split(' ').join('').toLowerCase() + '@geyser.fund';

	const handleUpload = (url: string) => {
		setForm({...form, image: `${GeyserAssetDomainUrl}${url}`});
	};

	const handleNext = () => {
		const isValid = validateForm();

		if (isValid) {
			console.log('Add the graphql mutation trigger here');
		}
	};

	const validateForm = () => {
		const errors: any = {};
		let isValid = true;
		if (!form.title) {
			errors.title = 'title is a required field';
			isValid = false;
		}

		if (!form.description) {
			errors.description = 'Project objective is a required field';
			isValid = false;
		}

		if (!form.email) {
			errors.email = 'Email address is a required field.';
			isValid = false;
		} else if (!validateEmail(form.email)) {
			errors.email = 'Please enter a valid email address.';
			isValid = false;
		}

		if (!isValid) {
			setFormError(errors);
		}

		return isValid;
	};

	const handleBack = () => {
		history.push('/');
	};

	const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');

	console.log('checking project', form);

	return (
		<Box
			background={'brand.bgGrey4'}
			position="relative"
			paddingTop="60px"
			height="100%"
			justifyContent="space-between"
		>
			<Grid width="100%" templateColumns={isMobile ? 'repeat(2, 1fr)' : 'repeat(6, 1fr)'} padding={isMobile ? '10px' : '40px 40px 20px 40px'} >
				<GridItem colSpan={isLargerThan1280 ? 2 : 1} display="flex" justifyContent="flex-start">
					<ButtonComponent leftIcon={<BiLeftArrowAlt className={classes.backIcon} onClick={handleBack} />}>Back</ButtonComponent>
				</GridItem>
				<GridItem colSpan={2} display="flex" justifyContent="center">
					<VStack
						spacing="30px"
						width="100%"
						maxWidth="400px"
						minWidth="350px"
						marginBottom="40px"
						display="flex"
						flexDirection="column"
						alignItems="flex-start"
					>
						<VStack width="100%" spacing="40px" alignItems="flex-start">
							<Text color="brand.gray500" fontSize="30px" fontWeight={700}> Create a new Project</Text>
							<TitleWithProgressBar
								paddingBottom="20px"
								title="Project details"
								subTitle="Step 1 of 3"
								percentage={33}
							/>
						</VStack>
						<VStack width="100%" alignItems="flex-start">
							<VStack width="100%" alignItems="flex-start">
								<Text
									name="title"
									value={form.title}
									onChange={handleChange}
								>
								Project Title
								</Text>
								<TextBox
									name="title"
									onChange={handleChange}
									value={form.title}
									error={formError.title}
								/>
							</VStack>
							<VStack width="100%" alignItems="flex-start">
								<Text>Lightening Address Preview</Text>
								<Text>{lighteningAddressPreview}</Text>
							</VStack>
							<VStack width="100%" alignItems="flex-start">
								<Text>Project Image</Text>
								<FileUpload onUploadComplete={handleUpload} >
									<HStack
										borderRadius="4px"
										backgroundColor="brand.bgGrey"
										width="100%"
										height="70px"
										justifyContent="center"
										alignItems="center"
										_hover={{backgroundColor: 'brand.gray300'}}
									>
										<AiOutlineUpload />
										<Text>Select a header image</Text>
									</HStack>
								</FileUpload>
							</VStack>
							<VStack width="100%" alignItems="flex-start">
								<Text>Main Objective</Text>
								<TextArea
									name="description"
									value={form.description}
									onChange={handleChange}
									error={formError.description}
								/>
							</VStack>

							<VStack width="100%" alignItems="flex-start">
								<Text>Project E-mail</Text>
								<TextBox
									name="email"
									value={form.email}
									onChange={handleChange}
									error={formError.email}
								/>
							</VStack>
							<ButtonComponent primary isFullWidth onClick={handleNext}>Next</ButtonComponent>
						</VStack>

					</VStack>
				</GridItem>
				<GridItem colSpan={2} display="flex" justifyContent="center">
					<VStack justifyContent="center" alignItems="flex-start" maxWidth="370px" spacing="10px">
						<Text>Preview</Text>
						<Card padding="16px 10px" >
							{
								form.image ? <ImageWithReload src={form.image} height="222px" width="350px"/>
									: <Image
										src={GeyserSkeletonUrl}
										maxHeight="500px"
										height="222px"
										width="350px"
									/>
							}
							<Text>geyser.fund/project</Text>
							<Text fontSize="28px" fontWeight={700} >{form.title || 'Project Title'}</Text>
							<Text fontSize="16px" color="brand.textGrey">{form.description || 'project description'}</Text>

						</Card>
					</VStack>
				</GridItem>
			</Grid>

		</Box>
	);
};
