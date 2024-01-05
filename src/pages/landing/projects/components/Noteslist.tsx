import { useState } from 'react';
import { Event } from 'nostr-tools';
import NoteCard from './NoteCard.tsx';

interface Props {
  projects: Event[];
}

export default function Noteslist({ projects }: Props) {
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
    border: '1px solid #ccc',
    padding: '8px 16px',
    borderRadius: '4px',
    margin: '8px 0',
    cursor: 'pointer',
  };

  return (
    <div style={{ margin: '0 20px', padding: '10px' }}>
      <div className="flex" style={{ display: 'flex', flexDirection: 'column' }}>
        {renderProjects.map((nostr, index) => (
          <NoteCard key={index} nostrich={nostr.pubkey} content={nostr.content} />
        ))}
        {projects.length > displayCount && (
          <button style={buttonStyle} onClick={loadMore}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
