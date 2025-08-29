import { useState, useEffect, useCallback } from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import notesService from '../services/notesService';
import { UI_MESSAGES } from '../constants';

const { confirm } = Modal;

export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadNotes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const allNotes = await notesService.getAllNotes();
      setNotes(allNotes);
    } catch (err) {
      setError(err.message);
      console.error('Ошибка загрузки заметок:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createNote = useCallback(async () => {
    try {
      setError(null);
      const noteId = await notesService.createNote();
      await loadNotes();
      return noteId;
    } catch (err) {
      setError(err.message);
      console.error('Ошибка создания заметки:', err);
      return null;
    }
  }, [loadNotes]);

  const updateNote = useCallback(async (noteId, content) => {
    try {
      setError(null);
      await notesService.updateNote(noteId, content);
      await loadNotes();
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Ошибка обновления заметки:', err);
      return false;
    }
  }, [loadNotes]);

  const deleteNote = useCallback((noteId, onSuccess) => {
    confirm({
      title: UI_MESSAGES.CONFIRM_DELETE_TITLE,
      content: UI_MESSAGES.CONFIRM_DELETE_TEXT,
      icon: <ExclamationCircleOutlined />,
      okText: UI_MESSAGES.OK_TEXT,
      okType: 'danger',
      cancelText: UI_MESSAGES.CANCEL_TEXT,
      async onOk() {
        try {
          setError(null);
          await notesService.deleteNote(noteId);
          await loadNotes();
          onSuccess?.();
        } catch (err) {
          setError(err.message);
          console.error('Ошибка удаления заметки:', err);
        }
      },
    });
  }, [loadNotes]);

  const filterNotes = useCallback((searchQuery) => {
    return notesService.filterNotes(notes, searchQuery);
  }, [notes]);

  const getNoteById = useCallback((noteId) => {
    return notes.find(note => note.id === noteId);
  }, [notes]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  return {
    notes,
    loading,
    error,
    loadNotes,
    createNote,
    updateNote,
    deleteNote,
    filterNotes,
    getNoteById,
  };
};
