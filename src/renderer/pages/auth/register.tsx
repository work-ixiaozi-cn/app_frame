import React, { FC, PropsWithChildren } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import AuthPage from './index';

const RegisterPage: FC<PropsWithChildren> = () => {
  return (
    <>
      <div>RegisterPage</div>
      <Link to="/">Home</Link>
    </>
  );
};

export default observer(RegisterPage);
