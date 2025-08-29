import React, { memo } from 'react';
import { Button, Input, Tooltip, Spin, Alert } from 'antd';
import { SearchOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons';

import NotesList from '../notesList/NotesList';
import { APP_CONFIG, UI_MESSAGES } from '../../constants';

const Sidebar = memo(({
  notes,
  searchQuery,
  onSearchChange,
  activeNoteId,
  onNoteSelect,
  onAddNote,
  loading,
  error,
  isSearching
}) => {
  return (
    <div className="app-sidebar">
      <div className="app-sidebar__header">
        <div className="app-sidebar__search-box">
          <Input
            value={searchQuery}
            placeholder={APP_CONFIG.SEARCH_PLACEHOLDER}
            prefix={isSearching ? <LoadingOutlined /> : <SearchOutlined />}
            style={{ width: '100%', height: '100%' }}
            bordered={false}
            onChange={(e) => onSearchChange(e.target.value)}
            allowClear
          />
        </div>
        <Tooltip title={UI_MESSAGES.ADD_TOOLTIP}>
          <Button 
            onClick={onAddNote} 
            type="text" 
            icon={<PlusOutlined />} 
            className="app-sidebar__btn"
            disabled={loading}
          />
        </Tooltip>
      </div>
      
      {error && (
        <Alert
          message="Ошибка"
          description={error}
          type="error"
          style={{ margin: '10px' }}
          showIcon
        />
      )}
      
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <NotesList
          notes={notes}
          activeNoteId={activeNoteId}
          onNoteSelect={onNoteSelect}
        />
      )}
    </div>
  );
});

export default Sidebar;
