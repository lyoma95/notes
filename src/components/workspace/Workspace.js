import React, { memo, useMemo, useCallback } from 'react';
import SimpleMdeReact from 'react-simplemde-editor';
import { Button, Tooltip, Alert } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

import { markdownToHtml } from '../../utils/noteUtils';
import { EDITOR_OPTIONS, UI_MESSAGES } from '../../constants';

const NoteContentView = memo(({ content }) => {
  const htmlContent = useMemo(() => markdownToHtml(content), [content]);
  
  return (
    <div 
      className="app-main__content" 
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
});

NoteContentView.displayName = 'NoteContentView';

const Workspace = memo(({
  note,
  isEditing,
  onToggleEdit,
  onUpdateNote,
  onDeleteNote,
  error
}) => {
  const editorOptions = useMemo(() => ({
    ...EDITOR_OPTIONS,
  }), []);

  const handleContentChange = useCallback((value) => {
    onUpdateNote(value);
  }, [onUpdateNote]);

  if (!note) {
    return (
      <div className="app-main">
        <Alert
          message="Заметка не найдена"
          type="warning"
          style={{ margin: '20px' }}
        />
      </div>
    );
  }

  return (
    <div className="app-main">
      <div className="app-main__header">
        <Button 
          type="text" 
          className="app-main__btn" 
          onClick={onToggleEdit}
          icon={isEditing ? <EyeOutlined /> : <EditOutlined />}
        >
          {isEditing ? UI_MESSAGES.DONE_BUTTON : UI_MESSAGES.EDIT_BUTTON}
        </Button>
        <Tooltip title={UI_MESSAGES.DELETE_TOOLTIP}>
          <Button 
            type="text" 
            icon={<DeleteOutlined />} 
            className="app-main__btn" 
            onClick={onDeleteNote}
            danger
          />
        </Tooltip>
      </div>
      
      {error && (
        <Alert
          message="Ошибка"
          description={error}
          type="error"
          style={{ margin: '20px' }}
          showIcon
        />
      )}
      
      {isEditing ? (
        <SimpleMdeReact
          value={note.value}
          onChange={handleContentChange}
          className="app-main__content"
          options={editorOptions}
        />
      ) : (
        <NoteContentView content={note.value} />
      )}
    </div>
  );
});

Workspace.displayName = 'Workspace';

export default Workspace;