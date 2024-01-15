import React from 'react';
import { Text, Box, Flex, Link as ChakraLink, useBreakpointValue } from '@chakra-ui/react';
import { ImageWithReload } from '../../../../components/ui/ImageWithReload';

const NostrProjectCard = ({ content: rawContent, nostrich, date }) => {
  let parsedContent;
  try {
    parsedContent = JSON.parse(rawContent);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    parsedContent = {};
  }
  const { display_name, image, about, website } = parsedContent;

  const imageSize = useBreakpointValue({ base: '120px', md: '120px' });

  return (
    <ChakraLink href={website} textDecoration="none" _hover={{ textDecoration: 'none' }}>
      <Flex
        display="flex"
        alignItems="flex-start"
        overflow="hidden"
        margin="16px 0"
        paddingTop="0px"
        border="2px solid"
        borderRadius="8px"
        borderColor="neutral.200"
        backgroundColor="neutral.0"
        transition="border-color 0.5s"
        boxShadow="none"
        _hover={{ cursor: 'pointer', borderColor: 'neutral.200' }}
        _active={{ borderColor: 'primary.300' }}
        _focus={{ borderColor: 'primary.230' }}
      >
        <Box
          flex="0 0 auto"
          position="relative"
          overflow="hidden"
          height="120px"
          width="120px"
          marginRight={{ base: '0px', md: '20px' }}
          max-height={imageSize}
        >
          <ImageWithReload src={image} />
        </Box>

        <Flex
          flex="1"
          flexDirection="column"
          justifyContent="flex-start"
          padding="8px"
        >
          <Text
            fontFamily="Arial, sans-serif"
            fontSize={{ base: '18px', md: '18px' }}
            fontWeight="bold"
            lineHeight="1.3"
            marginBottom="10px"
            noOfLines={{ base: 1, sm: 1, md: 1 }}
          >
            {display_name}
          </Text>
          <Text
            fontSize={{ base: '14px', md: '14px' }}
            lineHeight="1.4"
            color="neutral.600"
            noOfLines={{ base: 1, sm: 2, md: 3 }}
          >
            {about}
          </Text>
        </Flex>
      </Flex>
    </ChakraLink>
  );
};

export default NostrProjectCard;
