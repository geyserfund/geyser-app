import { Event } from "nostr-tools";
import NoteCard from './NoteCard.tsx';

interface Props {
  projects: Event[];
}

export default function Noteslist({ projects }: Props) {
  const sortedProjects = projects.slice().sort((a, b) => {
    // Sorting logic here if needed
  });

  return (
    <div className="notes-list-container" style={{ margin: '0 20px', padding: '10px' }}>
      <div className="flex" style={{ display: 'flex', flexDirection: 'column' }}>
        {sortedProjects.map((nostr, index) => (
          <NoteCard key={index} nostrich={nostr.pubkey} content={nostr.content} />
        ))}
      </div>
    </div>
  );
}
