import { useState } from 'react';
import { Text, Box, Flex, Link, useBreakpointValue } from '@chakra-ui/react';

const ImageWithReload = ({ src, alt, ...rest }) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  return (
    <img
      src={error ? '' : src}
      alt={alt}
      onError={handleError}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
      {...rest}
    />
  );
};

interface Props {
  content: string;
  nostrich: string;
  date: string;
}

export default function CustomCard({ content: rawContent, nostrich, date }: Props) {
  let parsedContent;
  try {
    parsedContent = JSON.parse(rawContent);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    parsedContent = {};
  }
  const { display_name, image, about, website } = parsedContent;

  const imageSize = useBreakpointValue({ base: '100px', md: '120px' });

  return (
    <Link href={website} textDecoration="none" _hover={{ textDecoration: 'none' }}>
      <Flex
        alignItems="flex-start"
        overflow="hidden"
        margin="16px 0"
        paddingTop="0px"
        border="2px solid #ccc"
        borderRadius="8px"
        backgroundColor="neutral.0"
        transition="border-color 0.5s"
        boxShadow="none"
        maxHeight="120px"
        _hover={{ cursor: 'pointer', borderColor: 'neutral.400' }}
        _active={{ borderColor: 'primary.400' }}
        _focus={{ borderColor: 'primary.400' }}
      >
        <Box
          flex="0 0 auto"
          position="relative"
          overflow="hidden"
          height={imageSize}
          width={imageSize}
          marginRight={{ base: '0px', md: '20px' }}
        >
          {image ? (
            <ImageWithReload src={image} alt={display_name} />
          ) : (
            <Box
              height="100%"
              width="100%"
              backgroundColor="neutral.0"
              borderRadius="8px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <span></span>
            </Box>
          )}
        </Box>

        <Flex
          flex="1"
          flexDirection="column"
          justifyContent="flex-start"
          padding="6px"
        >
          <Text
            fontFamily="Arial, sans-serif"
            fontSize={{ base: '18px', md: '20px' }}
            fontWeight="bold"
            lineHeight="1.3"
            marginBottom="10px"
            overflowWrap="break-word"
          >
            {display_name}
          </Text>
          <Text
            fontSize={{ base: '12px', md: '12px' }}
            lineHeight="1.4"
            color="gray.600"
          >
            {about}
          </Text>
        </Flex>
      </Flex>
    </Link>
  );
}
