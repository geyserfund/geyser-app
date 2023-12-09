import React, { useEffect, useState } from 'react';
import { Box, Container, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { SimplePool, Event } from 'nostr-tools';
import Noteslist from './Components/Noteslist';

const GEYSERELAY = [
  'wss://relay.geyser.fund',
];

export const LatestProjects = () => {
  const [pool, setPool] = useState(new SimplePool());
  const initialEvents: Event[] = [];
  const [events, setEvents] = useState(initialEvents);

  useEffect(() => {
    const _pool = new SimplePool();
    setPool(_pool);

    return () => {
      _pool.close(GEYSERELAY);
    };
  }, []);

  useEffect(() => {
    if (!pool) return;

    const sub = pool.sub(GEYSERELAY, [
      {
        kinds: [0],
        limit: 100,
        // filter by kind, types.
      },
    ]);

    sub.on('event', (event: Event) => {
      console.log(event);
      setEvents((events) => [...events, event]);
    });

    return () => {
      sub.unsub();
    };
  }, [pool]);

  return (
    <Box className="App">
        <Container maxW="container.xl">
          <VStack spacing={16}>
            <Noteslist projects={events} />
          </VStack>
        </Container>
      </Box>
  );
}

export default LatestProjects;
