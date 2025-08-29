import React from 'react';

import Sidebar from './components/sidebar/Sidebar';
import Workspace from './components/workspace/Workspace';
import DefaultLayout from './components/defaultLayout/DefaultLayout';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { NotesProvider } from './context/NotesContext';
import { useNotes, useActiveNote, useSearch } from './hooks';

import './App.scss';

function App() {
  return (
    <ErrorBoundary>
      <NotesProvider>
        <AppContent />
      </NotesProvider>
    </ErrorBoundary>
  );
}

const AppContent = () => {
  const notesHook = useNotes();
  const activeNoteHook = useActiveNote();
  const searchHook = useSearch(notesHook.notes);

  const { activeNoteId } = activeNoteHook;
  const activeNote = notesHook.getNoteById(activeNoteId);

  return (
    <div className="app">
      <Sidebar 
        notes={searchHook.filteredNotes}
        searchQuery={searchHook.searchQuery}
        onSearchChange={searchHook.setSearchQuery}
        activeNoteId={activeNoteId}
        onNoteSelect={activeNoteHook.selectNote}
        onAddNote={async () => {
          const newNoteId = await notesHook.createNote();
          if (newNoteId) {
            activeNoteHook.selectNote(newNoteId);
            activeNoteHook.startEditing();
          }
        }}
        loading={notesHook.loading}
        error={notesHook.error}
        isSearching={searchHook.isSearching}
      />
      {activeNote ? (
        <Workspace 
          note={activeNote}
          isEditing={activeNoteHook.isEditing}
          onToggleEdit={activeNoteHook.toggleEditing}
          onUpdateNote={(content) => notesHook.updateNote(activeNoteId, content)}
          onDeleteNote={() => notesHook.deleteNote(activeNoteId, activeNoteHook.clearActiveNote)}
          error={notesHook.error}
        />
      ) : (
        <DefaultLayout />
      )}
    </div>
  );
};

export default App;
