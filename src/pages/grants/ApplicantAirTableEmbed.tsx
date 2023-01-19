import { Box } from '@chakra-ui/react';
import React from 'react';
import { isMobileMode } from '../../utils';

export default function ApplicantAirTableEmbed() {
  const isMobile = isMobileMode();
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
