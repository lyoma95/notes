import { marked } from 'marked';
import { APP_CONFIG, UI_MESSAGES } from '../constants';


export const parseNoteContent = (noteContent) => {
  if (!noteContent) {
    return {
      title: UI_MESSAGES.NEW_NOTE_TITLE,
      preview: UI_MESSAGES.NO_ADDITIONAL_TEXT,
    };
  }

  try {
    const tokens = marked.lexer(noteContent);
    
    const title = tokens.length && tokens[0].text?.length 
      ? tokens[0].text 
      : UI_MESSAGES.NEW_NOTE_TITLE;
    
    const preview = tokens[1]?.text?.length 
      ? tokens[1].text 
      : UI_MESSAGES.NO_ADDITIONAL_TEXT;
    
    return {
      title: truncateText(title, APP_CONFIG.PREVIEW_LIMITS.TITLE_LENGTH),
      preview: truncateText(preview, APP_CONFIG.PREVIEW_LIMITS.TEXT_LENGTH),
    };
  } catch (error) {
    console.error('Ошибка при парсинге заметки:', error);
    return {
      title: UI_MESSAGES.NEW_NOTE_TITLE,
      preview: UI_MESSAGES.NO_ADDITIONAL_TEXT,
    };
  }
};

export const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) {
    return text || '';
  }
  
  return `${text.slice(0, maxLength)}...`;
};

export const markdownToHtml = (markdown) => {
  if (!markdown) return '';
  
  try {
    return marked.parse(markdown);
  } catch (error) {
    console.error('Ошибка при конвертации markdown:', error);
    return markdown;  
  }
};

export const isEmpty = (str) => {
  return !str || !str.trim();
};

export const formatDate = (timestamp) => {
  try {
    return new Date(timestamp).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Ошибка при форматировании даты:', error);
    return '';
  }
};
