import React, { createContext, useContext } from 'react';

const NotesContext = createContext(null);

export const NotesProvider = ({ children }) => {
  return (
    <NotesContext.Provider value={{}}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotesContext = () => {
  const context = useContext(NotesContext);
  if (context === null) {
    throw new Error('useNotesContext must be used within a NotesProvider');
  }
  return context;
};

export default NotesContext;
