import { useState, useCallback } from 'react';

export const useActiveNote = () => {
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const selectNote = useCallback((noteId) => {
    setActiveNoteId(noteId);
    setIsEditing(false);
  }, []);

  const clearActiveNote = useCallback(() => {
    setActiveNoteId(null);
    setIsEditing(false);
  }, []);

  const toggleEditing = useCallback(() => {
    setIsEditing(prev => !prev);
  }, []);

  const startEditing = useCallback(() => {
    setIsEditing(true);
  }, []);

  const stopEditing = useCallback(() => {
    setIsEditing(false);
  }, []);

  return {
    activeNoteId,
    isEditing,
    selectNote,
    clearActiveNote,
    toggleEditing,
    startEditing,
    stopEditing,
  };
};
