export const APP_CONFIG = {
  DB_NAME: 'NotesApp',
  DEFAULT_NOTE_CONTENT: '# Новая заметка',
  SEARCH_PLACEHOLDER: 'Поиск заметок...',
  DEFAULT_LAYOUT_TEXT: 'Выберите заметку',
  DATE_FORMAT: 'dd.mm.yyyy',
  PREVIEW_LIMITS: {
    TITLE_LENGTH: 20,
    TEXT_LENGTH: 30,
  },
};

export const UI_MESSAGES = {
  CONFIRM_DELETE_TITLE: 'Удалить заметку?',
  CONFIRM_DELETE_TEXT: 'Вы уверены, что хотите удалить эту заметку?',
  OK_TEXT: 'Да',
  CANCEL_TEXT: 'Нет',
  EDIT_BUTTON: 'Редактировать',
  DONE_BUTTON: 'Готово',
  ADD_TOOLTIP: 'Добавить заметку',
  DELETE_TOOLTIP: 'Удалить заметку',
  NO_ADDITIONAL_TEXT: 'Нет дополнительного текста',
  NEW_NOTE_TITLE: 'Новая заметка',
};

export const EDITOR_OPTIONS = {
  autofocus: true,
  spellChecker: false,
  maxHeight: '75vh',
  toolbar: [
    'bold', 'italic', 'heading', '|',
    'quote', 'unordered-list', 'ordered-list', '|',
    'link', 'image', '|',
    'preview', 'side-by-side', 'fullscreen', '|',
    'guide'
  ],
};
