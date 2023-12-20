import React, { useEffect, useState } from 'react';
import { Container, VStack, HStack, useBreakpointValue, Button, useDisclosure } from '@chakra-ui/react';
import { SimplePool, Event } from 'nostr-tools';
import Noteslist from '../components/Noteslist';
import { CardLayout } from '../../../../components/layouts';

const GEYSERELAY = [
  'wss://relay.geyser.fund',
];

export const Latest = () => {
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
    <Container>
  <VStack>
    <HStack>
      <Noteslist projects={events} />
    </HStack>
  </VStack>
</Container>

  );
};

export default Latest;
