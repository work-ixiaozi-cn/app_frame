import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { RouteProps } from 'react-router-dom';
import { Empty } from 'antd';

const Plug: FC<RouteProps> = () => {
  return <Empty className="self-center" />;
};

export default observer(Plug);
