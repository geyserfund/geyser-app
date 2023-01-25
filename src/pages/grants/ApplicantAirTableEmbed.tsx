import { Box } from '@chakra-ui/react';

import { useMobileMode } from '../../utils';

export default function ApplicantAirTableEmbed() {
  const isMobile = useMobileMode();
  return (
    <Box height={isMobile ? 'calc(100vh - 230px)' : 'calc(100vh - 250px)'}>
      <iframe
        className="airtable-embed"
        src="https://airtable.com/embed/shrfeI21FWzyCqHZy?backgroundColor=teal"
        frameBorder="0"
        width="100%"
        height="100%"
      ></iframe>
    </Box>
  );
}
