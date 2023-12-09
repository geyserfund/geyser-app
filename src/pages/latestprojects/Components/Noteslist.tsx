import { Event } from "nostr-tools";
import NoteCard from './NoteCard.tsx';

interface Props {
  projects: Event[];
}

export default function Noteslist({ projects }: Props) {
  const sortedProjects = projects.slice().sort((a, b) => {
    // Sorting logic remains the same
  });

  return (
    <div className="notes-list-container" style={{ margin: '0 20px', border: '1px solid #ccc', padding: '10px' }}>
      <div className="flex">
        {sortedProjects.map((nostr, index) => (
          // Use a unique identifier as the 'key' prop for NoteCard
          <NoteCard key={index} nostrich={nostr.pubkey} content={nostr.content} />
        ))}
      </div>
    </div>
  );
}
