import { Box, Text, Flex, Link } from '@chakra-ui/react';

interface Props {
  content: string;
  nostrich: string;
}

export default function NoteCard({ nostrich, content, date }: Props) {
  let parsedContent;
  try {
    parsedContent = JSON.parse(content);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    parsedContent = {};
  }
  const { display_name, image, about, website } = parsedContent;

  const imageStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '120px',
    height: '120px',
    maxHeight: '120px', // Set a maximum height for the container
  };

  return (
    <Flex
      className="notecard"
      alignItems="flex-start"
      margin="16px 0"
      padding="0px"
      border="1px solid #ccc"
      borderRadius="8px"
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      flexWrap="wrap"
    >
      <Box
        flex={{ base: '0 0 120px', md: '0 0 auto' }}
        minWidth="120px"
        position="relative"
        overflow="hidden"
        marginLeft="0px"
        marginRight={{ base: '0px', md: '20px' }}
        marginBottom={{ base: '0px', md: '0px' }}
        style={image ? imageStyle : {}} // Apply style only if the image exists
      ></Box>

      <Flex
        flex="1"
        flexDirection="column"
        overflow="hidden"
        maxHeight="120px" // Set a maximum height for the content area
      >
        <Link href={website} textDecoration="none">
          <Text
            marginLeft="20px"
            fontFamily="Arial, sans-serif"
            fontSize="16px"
            fontWeight="bold"
            paddingRight="20px" // Add padding to the right side
            marginBottom="5px"
            lineHeight="1.3"
            _hover={{ textDecoration: 'none' }}
          >
            {display_name}
          </Text>
        </Link>
        <Box marginLeft="20px" marginTop="5px" overflowY="auto"> {/* Make the text content scrollable */}
          <Text
            fontSize="13px"
            overflow="hidden"
            textOverflow="ellipsis"
            wordWrap="break-word"
          >
            {about}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}
