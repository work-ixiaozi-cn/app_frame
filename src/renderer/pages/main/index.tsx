import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Space } from 'antd';
import {
  AppstoreAddOutlined,
  BugOutlined,
  DesktopOutlined,
  MergeCellsOutlined,
  SettingOutlined,
  WechatFilled,
} from '@ant-design/icons';
import { NavTo, PlugTo } from '../../utils';
import Header from './header';
import Setting from './setting';
import Store from './store';

const MainPage: FC = () => {
  const [current, setCurrent] = useState<string>('ai');
  const [setting, setSetting] = useState(false);
  const [store, setStore] = useState(false);
  const topItems = [
    // ai助手
    {
      key: 'ai',
      icon: <WechatFilled />,
      uri: 'http://localhost:3001/',
    },
    // 开发工具
    {
      key: 'tools',
      icon: <BugOutlined />,
      uri: 'http://localhost:3002/',
    },
    // 远程桌面
    {
      key: 'desktop',
      icon: <DesktopOutlined />,
      uri: 'http://localhost:3003/',
    },
    // 内网穿透
    {
      key: 'vpn',
      icon: <MergeCellsOutlined />,
      uri: 'http://localhost:3004/',
    },
  ];
  const bottomItems = [
    {
      icon: <AppstoreAddOutlined />,
      action: () => setStore(true),
    },
    {
      icon: <SettingOutlined />,
      action: () => setSetting(true),
    },
  ];

  useEffect(() => {
    console.log('=================');
    setCurrent(topItems[0].key);
    PlugTo(topItems[0].key, topItems[0].uri);
  }, []);

  return (
    <>
      <aside className="w-48px bg-light-800 bg-opacity-80 flex flex-col">
        <div className="h-32px drag self-center flex">
          <div className="self-center text-gray-50">APP</div>
        </div>
        <Space.Compact direction="vertical">
          {topItems.map((item) => {
            return (
              <Button
                type="text"
                className="w-full h-48px border-none rounded-none"
                onClick={() => {
                  setCurrent(item.key);
                  PlugTo(item.key, item.uri);
                }}
              >
                {item.icon}
              </Button>
            );
          })}
        </Space.Compact>
        <div className="flex-auto drag" />
        <Space.Compact direction="vertical">
          {bottomItems.map((item) => {
            return (
              <Button
                type="text"
                className="w-full h-48px border-none rounded-none"
                onClick={item.action}
              >
                {item.icon}
              </Button>
            );
          })}
        </Space.Compact>
      </aside>
      <section className="flex-auto flex flex-col">
        <Header />
        <main className="flex-auto">
          <Setting open={setting} onClose={() => setSetting(false)} />
          <Store open={store} onClose={() => setStore(false)} />
        </main>
      </section>
    </>
  );
};

export default MainPage;
