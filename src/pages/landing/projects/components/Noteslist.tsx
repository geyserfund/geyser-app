import { useState } from 'react';
import { Event } from 'nostr-tools';
import { Button, Flex } from '@chakra-ui/react';
import NoteCard from './NoteCard.tsx';

interface Props {
  projects: Event[];
}

export default function NotesList({ projects }: Props) {
  const initialDisplayCount = 12;
  const itemsPerPage = 10;
  const [displayedProjects, setDisplayedProjects] = useState<Event[]>([]);
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

  const loadMore = () => {
    const nextDisplayCount = displayCount + itemsPerPage;
    setDisplayCount(nextDisplayCount);
  };

  const initialProjects = projects.slice(0, initialDisplayCount);

  const renderProjects =
    displayCount > initialDisplayCount ? projects.slice(0, displayCount) : initialProjects;

  const buttonStyle = {
    border: '1px solid',
    padding: '8px 16px',
    borderColor: 'neutral.200',
    borderRadius: '8px',
    margin: '8px 0',
    cursor: 'pointer',
  };

  return (
    <Flex direction="column" margin="0 20px" padding="10px">
      <Flex direction="column">
        {renderProjects.map((nostr, index) => (
          <NoteCard key={index} nostrich={nostr.pubkey} content={nostr.content} />
        ))}
        {projects.length > displayCount && (
          <Button style={buttonStyle} onClick={loadMore}>
            Load More
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
