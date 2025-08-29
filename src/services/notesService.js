import db from '../db';
import { APP_CONFIG } from '../constants';

class NotesService {
  async getAllNotes() {
    try {
      return await db.notes.orderBy('date').reverse().toArray();
    } catch (error) {
      console.error('Ошибка при загрузке заметок:', error);
      throw new Error('Не удалось загрузить заметки');
    }
  }

  async createNote() {
    try {
      const noteId = await db.notes.add({
        value: APP_CONFIG.DEFAULT_NOTE_CONTENT,
        date: Date.now(),
      });
      return noteId;
    } catch (error) {
      console.error('Ошибка при создании заметки:', error);
      throw new Error('Не удалось создать заметку');
    }
  }

  async updateNote(noteId, content) {
    try {
      await db.notes.update(noteId, {
        value: content,
        date: Date.now(),
      });
    } catch (error) {
      console.error('Ошибка при обновлении заметки:', error);
      throw new Error('Не удалось обновить заметку');
    }
  }

  async deleteNote(noteId) {
    try {
      await db.notes.delete(noteId);
    } catch (error) {
      console.error('Ошибка при удалении заметки:', error);
      throw new Error('Не удалось удалить заметку');
    }
  }

  filterNotes(notes, searchQuery) {
    if (!searchQuery.trim()) {
      return notes;
    }

    const query = searchQuery.toLowerCase();
    return notes.filter(note => 
      note.value.toLowerCase().includes(query)
    );
  }
}

export const notesService = new NotesService();
export default notesService;
