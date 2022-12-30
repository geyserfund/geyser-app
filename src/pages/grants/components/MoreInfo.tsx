import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { fonts } from '../../../constants/fonts';
import shareicon from '../../../assets/shareico.svg';

export const MoreInfo = () => {
  return (
    <>
      <Box mt={4}>
        <Text
          fontWeight={'bold'}
          fontSize="large"
          fontFamily={fonts.interBlack}
        >
          More Information
        </Text>
        <Text
          mt={5}
          color="brand.neutral600"
          fontSize={'14px'}
          textAlign="justify"
        >
          Bitcoin is signal, everything else is noise. We created Geyser Grants
          to help broadcast more Bitcoin signal into the world. That is, to
          accelerate the growth of the Bitcoin ecosystem by increasing Bitcoin
          awarenes, enabling Bitcoin culture, and supporting needed development.
          Through these grants we will be supporting Bitcoin educators,
          developers, entrepreneurs and creatives with the resources they need
          to bootstrap their initiatives. We accept Bitcoin contributions for
          each individual grant and take no fees at this stage. When the Round
          goes live applications will be opened, and they will be evaluated once
          the Rounds close. Grants will be given away as soon as the goal is
          reached. For more information see this doc.
        </Text>
        <Box w={20} mt="4" mb={10}>
          <Box
            boxShadow="lg"
            px="4"
            gap={4}
            py={'2'}
            alignItems="center"
            display="flex"
          >
            <Text fontWeight={'600'}>Faq</Text>
            <img src={shareicon} alt="icon" />
          </Box>
        </Box>
      </Box>
    </>
  );
};
