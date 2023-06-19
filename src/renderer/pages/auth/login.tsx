import React, { FC, PropsWithChildren } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, RouteProps } from 'react-router-dom';
import { Avatar, Button, Checkbox, Form, Image, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import AuthPage from './index';

const Login: FC<RouteProps> = (props) => {
  console.log(props.children);
  return (
    <>
      <div className="flex flex-col justify-around my-20px">
        <Avatar
          className="mx-auto w-80px h-80px"
          src="https://lanye.co/holder/80x80/00aff0/fff/"
        />
        <div className="self-center">LoginPage</div>
      </div>
      <div className="mx-15px">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              allowClear
              prefix={<UserOutlined />}
              placeholder="large size"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              allowClear
              prefix={<LockOutlined />}
              placeholder="large size"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <div className="flex justify-between">
              <Checkbox>记住我</Checkbox>
              <Link to="/">忘记密码</Link>
            </div>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                window.electron.window.resizeWithMain('/plug', '/main');
              }}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
        <div className="flex">
          <div className="flex-1 h-1px bg-gray-300 self-center" />
          <div className="px-5px">更多登录方式</div>
          <div className="flex-1 h-1px bg-gray-300 self-center" />
        </div>
      </div>
      <Link to="/">Home</Link>
    </>
  );
};

export default observer(Login);
