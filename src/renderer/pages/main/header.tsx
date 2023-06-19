import { Button, Space } from 'antd';
import { CloseOutlined, LineOutlined, PlusOutlined } from '@ant-design/icons';
import React, { FC } from 'react';

const Header: FC = () => {
  return (
    <header className="h-32px flex bg-light-800 bg-opacity-80">
      <div className="flex-auto text-gray-900 drag">title</div>
      <Space.Compact direction="horizontal">
        <Button
          className="w-full h-32px border-none rounded-none"
          type="text"
          size="small"
          onClick={window.electron.window.minimize}
        >
          <LineOutlined />
        </Button>
        <Button
          className="w-full h-32px border-none rounded-none"
          type="text"
          size="small"
          onClick={window.electron.window.maximize}
        >
          <PlusOutlined />
        </Button>
        <Button
          className="w-full h-32px border-none rounded-none"
          type="text"
          size="small"
          onClick={window.electron.window.close}
        >
          <CloseOutlined />
        </Button>
      </Space.Compact>
    </header>
  );
};

export default Header;
