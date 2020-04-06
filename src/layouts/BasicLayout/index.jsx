import React from 'react';
import ToolBar from '@/components/ToolBar';
import { Layout } from 'antd';

import './index.less';

const { Content } = Layout;

export default function BasicLayout({ children }) {
  return (
    <Layout>
      <ToolBar />
      <Content
        className="site-layout"
        style={{ padding: '0 50px', marginTop: 64 }}
      >
        <div className="site-layout-background" style={{ padding: 24 }}>
          {children}
        </div>
      </Content>
    </Layout>
  );
}
