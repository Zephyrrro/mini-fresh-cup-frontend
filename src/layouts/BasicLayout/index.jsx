import React from 'react';
import { Layout } from 'antd';
import LoginStatusProvider from './ContextProvider';

import './index.less';

const { Content } = Layout;

export default function BasicLayout({ children }) {
  return (
    <Layout>
      <LoginStatusProvider>
        <Content className="site-layout" style={{ marginTop: 64 }}>
          <div className="site-layout-background">{children}</div>
        </Content>
      </LoginStatusProvider>
    </Layout>
  );
}
