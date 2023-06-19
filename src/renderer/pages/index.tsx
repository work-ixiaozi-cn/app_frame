import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { RouteProps } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

const IndexPage: FC<RouteProps> = () => {
  setTimeout(() => {
    window.electron.window.resizeWithoutMain('/auth/login');
  }, 2500);
  return (
    <div className="self-center flex flex-col bg-gray-50 bg-opacity-60 rounded-10px">
      <LoadingOutlined className="self-center bg-transparent text-6xl" />
      <div className="self-center">正在打开中...</div>
    </div>
  );
};

export default observer(IndexPage);
