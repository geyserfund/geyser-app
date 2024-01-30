import { useEffect, useState } from 'react';
import { Container, VStack, HStack, useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import { SimplePool, Event } from 'nostr-tools';
import NostrProjectList from '../components/NostrProjectList';
import { FilterDrawer } from '../../filters/mobile/FilterDrawer';
import { MobileTopBar } from '../../filters/mobile/MobileTopBar';

const GEYSER_RELAY_URL = [
  'wss://relay.geyser.fund',
];

export const LatestNostrProjects = () => {
  const [pool, setPool] = useState(new SimplePool());
  const initialEvents: Event[] = [];
  const [events, setEvents] = useState(initialEvents);

  useEffect(() => {
    const _pool = new SimplePool();
    setPool(_pool);

    return () => {
      _pool.close(GEYSER_RELAY_URL);
    };
  }, []);

  useEffect(() => {
    if (!pool) return;

    const sub = pool.sub(GEYSER_RELAY_URL, [
      {
        kinds: [0],
        limit: 100,
      },
    ]);

    sub.on('event', (event: Event) => {
      setEvents((events) => [...events, event]);
    });

    return () => {
      sub.unsub();
    };
  }, [pool]);

  const isMobile = useBreakpointValue({ base: true, sm: true, md: true, lg: false });

  const { isOpen, onClose } = useDisclosure();

  return (
    <Container>
      <VStack>
        {isMobile && <MobileTopBar title="Latest Projects" />}
        {isMobile && <FilterDrawer isOpen={isOpen} onClose={onClose} />}

        <HStack>
          <NostrProjectList projects={events} />
        </HStack>
      </VStack>
    </Container>
  );
};

export default LatestNostrProjects;
