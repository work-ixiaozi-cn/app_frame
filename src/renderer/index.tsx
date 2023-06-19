import { createRoot } from 'react-dom/client';
import zhCN from 'antd/locale/zh_CN';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import IndexPage from './pages';
import AuthLayout from './pages/auth';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import Plug from './pages/plug';
import 'windi.css';
import MainPage from './pages/main';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider locale={zhCN}>
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route index path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route path="/plug" element={<Plug />} />
      </Routes>
    </Router>
  </ConfigProvider>
);
