import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, RouteProps, Outlet, Link, useParams } from 'react-router-dom';
import { Avatar, Button, Image, Layout, Space } from 'antd';
import {
  CloseOutlined,
  LineOutlined,
  PlusOutlined,
  UserOutlined,
} from '@ant-design/icons';

const AuthPage: FC<RouteProps> = (props: RouteProps) => {
  return (
    <div className="flex-auto flex bg-gray-50">
      <section className="flex-auto drag">
        <Image
          preview={false}
          src="https://lanye.co/holder/530x480/00aff0/fff/"
        />
      </section>
      <section className="w-260px flex flex-col">
        <header className="flex">
          <div className="flex-auto drag" />
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
        <main className="flex-auto">
          <Outlet />
        </main>
      </section>
    </div>
  );
};

export default observer(AuthPage);
