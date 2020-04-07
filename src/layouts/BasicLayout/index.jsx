import React, { useState } from 'react';
import ToolBar from '@/components/ToolBar';
import { Layout } from 'antd';
import { LoginStatusContext } from '@/store/context';

import './index.less';

const { Content } = Layout;

export default function BasicLayout({ children }) {
  const defaultLoginStatus =
    sessionStorage.getItem('token') && localStorage.getItem('identity');
  const [loginStatus, setLoginStatus] = useState(defaultLoginStatus);

  return (
    <Layout>
      <LoginStatusContext.Provider
        value={{ status: loginStatus, toggleStatus: setLoginStatus }}
      >
        <ToolBar isLogged={loginStatus} />
        <Content className="site-layout" style={{ marginTop: 64 }}>
          <div className="site-layout-background">{children}</div>
        </Content>
      </LoginStatusContext.Provider>
    </Layout>
  );
}
