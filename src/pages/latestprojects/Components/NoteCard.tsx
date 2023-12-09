import { Box, Image, Text, Flex, Link } from '@chakra-ui/react';

interface Props {
  content: string;
  nostrich: string;
}

export default function NoteCard({ nostrich, content, date }: Props) {
  let parsedContent;
  try {
    // Parse the JSON content to an object
    parsedContent = JSON.parse(content);
  } catch (error) {
    // Handle JSON parsing errors here
    console.error('Error parsing JSON:', error);
    parsedContent = {};
  }

  // Extract the necessary information from parsedContent
  const { display_name, image, about } = parsedContent;

  return (
    <Box
      className="notecard"
      display="flex"
      alignItems="flex-start"
      margin="16px 0"
      padding="5px"
      border="1px solid #ccc"
    >
      <Box width="120px" height="120px" overflow="hidden" marginRight="2px">
        <Image src={image} alt={display_name} w="100%" h="100%" objectFit="cover" />
      </Box>
      <Flex flex="1" flexDirection="column">
        <Link href={website} textDecoration="none">
          <Text
            as="span"
            textAlign="left"
            fontFamily="Arial, sans-serif"
            fontSize="20px"
            fontWeight="bold"
            marginTop="0"
            _hover={{ textDecoration: 'nonene' }}
          >
          {display_name}
        </Text>
        <Text>{about}</Text>
      </Flex>
    </Box>
  );
}
