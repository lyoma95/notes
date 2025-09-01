import React, { memo } from 'react';
import { Empty } from 'antd';

import { parseNoteContent, formatDate } from '../../utils/noteUtils';

const NoteItem = memo(({ note, isActive, onSelect }) => {
  const { title, preview } = parseNoteContent(note.value);

  return (
    <div
      className={`app-sidebar__note ${isActive ? 'app-sidebar__note_active' : ''}`}
      onClick={() => onSelect(note.id)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(note.id);
        }
      }}
    >
      <h2 className="app-sidebar__note-title">{title}</h2>
      <div className="wrapper">
        <p className="app-sidebar__note-date">{formatDate(note.date)}</p>
        <p className="app-sidebar__note-preview">{preview}</p>
      </div>
    </div>
  );
});

NoteItem.displayName = 'NoteItem';

const NotesList = memo(({ notes, activeNoteId, onNoteSelect }) => {
  if (!notes || notes.length === 0) {
    return (
      <div className="app-sidebar__notes-list">
        <Empty 
          description="Заметок пока нет"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{ marginTop: '50px' }}
        />
      </div>
    );
  }

  return (
    <div className="app-sidebar__notes-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          isActive={activeNoteId === note.id}
          onSelect={onNoteSelect}
        />
      ))}
    </div>
  );
});

NotesList.displayName = 'NotesList';

export default NotesList;