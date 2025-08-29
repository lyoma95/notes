import React from 'react';
import { Empty } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

import { APP_CONFIG } from '../../constants';

const DefaultLayout = () => {
  return (
    <div className="app-default">
      <Empty
        image={<FileTextOutlined style={{ fontSize: 64, color: '#d9d9d9' }} />}
        description={
          <span style={{ fontSize: 18, color: '#999' }}>
            {APP_CONFIG.DEFAULT_LAYOUT_TEXT}
          </span>
        }
      />
    </div>
  );
};

export default DefaultLayout;