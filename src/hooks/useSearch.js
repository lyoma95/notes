import { useState, useMemo } from 'react';
import { useDebounce } from './useDebounce';

export const useSearch = (notes) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredNotes = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return notes;
    }

    const query = debouncedSearchQuery.toLowerCase();
    return notes.filter(note => 
      note.value.toLowerCase().includes(query)
    );
  }, [notes, debouncedSearchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  return {
    searchQuery,
    setSearchQuery,
    filteredNotes,
    clearSearch,
    hasActiveSearch: Boolean(debouncedSearchQuery.trim()),
    isSearching: searchQuery !== debouncedSearchQuery && Boolean(searchQuery.trim()),
  };
};
