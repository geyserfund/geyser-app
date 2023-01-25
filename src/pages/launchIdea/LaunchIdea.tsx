import { Box, HStack, Link, Stack, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { createUseStyles } from 'react-jss';

import { createCreatorRecord } from '../../api';
import { EnvelopeIcon, LightningIcon, RopeIcon } from '../../components/icons';
import {
  ButtonComponent,
  Card,
  SectionTitle,
  TextArea,
  TextInputBox,
} from '../../components/ui';
import Loader from '../../components/ui/Loader';
import { GeyserFAQUrl } from '../../constants';
import { useMobileMode, useNotification } from '../../utils';

const useStyles = createUseStyles({
  iconContainer: {
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '55px',
    minWidth: '55px',
    boxShadow: '0px 0px 9.51722px rgba(0, 0, 0, 0.11)',
  },
  cardContainer: {
    width: '100%',
    maxWidth: '700px',
    padding: '40px 25px',
  },
});

export const LaunchIdea = () => {
  const isMobile = useMobileMode();
  const classes = useStyles();

  const { toast } = useNotification();

  const [form, setForm] = useState({ email: '', description: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event: any) => {
    const { name } = event.target;
    const { value } = event.target;
    if (name) {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmitForm = async () => {
    if (!form.email) {
      toast({
        title: 'Empty email',
        description: 'please provide your email',
        status: 'error',
      });
    }

    if (!form.description) {
      toast({
        title: 'Empty description',
        description: 'description of your idea is required',
        status: 'error',
      });
    }

    try {
      setSubmitting(true);
      const records = [
        {
          fields: {
            Email: form.email,
            Project: form.description,
            Type: ['Creator'],
          },
        },
      ];
      const value = await createCreatorRecord({ records });
      console.log('checking value', value);
      setSubmitted(true);
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again',
        status: 'error',
      });
    }

    setSubmitting(false);
  };

  const SuccesfullySubmitted = () => (
    <Card className={classes.cardContainer}>
      <VStack spacing="30px">
        <Text fontSize="33px" fontWeight={700}>
          Successful submission!
        </Text>
        <Text fontSize="18px">
          Thanks for submitting a crowdfunding project idea to Geyser. We
          received your project submission, and will get back to you soon to get
          you all set up. As we are still in our early product development we
          are currently adding the projects manually.
        </Text>
      </VStack>
    </Card>
  );

  const Loading = () => (
    <Card
      className={classes.cardContainer}
      height="400px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Loader />
    </Card>
  );

  return (
    <Box display="flex" justifyContent="center">
      <VStack
        spacing="50px"
        maxWidth="1370px"
        padding={isMobile ? '10px 10px 40px 10px' : '40px 40px'}
      >
        <VStack width="100%" alignItems="flex-start" spacing="30px">
          <Text fontSize="35px" fontWeight={700}>
            Transform your ideas into reality
          </Text>
          <Text fontSize="18px">
            Are you a Bitcoin creator, creative, educator or entrepreneur
            looking to raise funds from your community? No matter where you are
            in the world, Geyser now makes it easy for you to create
            crowdfunding projects, and to allow your supporters to fund and keep
            track of your project. Get started by submitting an idea to
            crowdfund on Geyser below, and we will get back to you soon on how
            to proceed. For more info check out our{' '}
            <Link href={GeyserFAQUrl} isExternal textDecoration="underline">
              FAQ
            </Link>
            .
          </Text>
          <Stack
            direction={isMobile ? 'column' : 'row'}
            width="100%"
            justifyContent="space-between"
            spacing={isMobile ? '30px' : '15px'}
          >
            <HStack flex="1" spacing="18px">
              <Box className={classes.iconContainer}>
                <RopeIcon height="33px" width="33px" />
              </Box>
              <Text fontSize="18px" wordBreak="break-word">
                Create accountability by leveraging your network as ambassadors
                & sponsors.
              </Text>
            </HStack>
            <HStack flex="1" spacing="18px">
              <Box className={classes.iconContainer}>
                <LightningIcon height="33px" width="33px" />
              </Box>
              <Text fontSize="18px">
                Give back to your funders with rewards and badges.
              </Text>
            </HStack>
            <HStack flex="1" spacing="18px">
              <Box className={classes.iconContainer}>
                <EnvelopeIcon height="33px" width="33px" />
              </Box>
              <Text fontSize="18px">
                Keep your backers in the loop with updates
              </Text>
            </HStack>
          </Stack>
        </VStack>
        {submitting ? (
          <Loading />
        ) : submitted ? (
          <SuccesfullySubmitted />
        ) : (
          <Card className={classes.cardContainer}>
            <VStack spacing="30px">
              <Text fontSize="33px" fontWeight={700}>
                Submit project idea
              </Text>
              <VStack width="100%" alignItems="flex-start">
                <SectionTitle>Your email/contact</SectionTitle>
                <TextInputBox
                  type="email"
                  name="email"
                  fontSize="14px"
                  placeholder="satoshi@geyser.fund"
                  value={form.email}
                  onChange={handleChange}
                />
              </VStack>
              <VStack width="100%" alignItems="flex-start">
                <SectionTitle>Your idea</SectionTitle>
                <TextArea
                  pr={16}
                  name="description"
                  fontSize="14px"
                  placeholder="Building a peer-to-peer electronic cash system."
                  value={form.description}
                  onChange={handleChange}
                />
              </VStack>

              <ButtonComponent
                primary
                standard
                w="full"
                onClick={handleSubmitForm}
              >
                Submit
              </ButtonComponent>
            </VStack>
          </Card>
        )}
      </VStack>
    </Box>
  );
};
