import React from 'react';
import { Layout, Button } from 'antd';
import './index.less';

const { Header } = Layout;

export default function ToolBar() {
  return (
    <Header
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        backgroundColor: 'rgb(61, 81, 181)',
      }}
      className="header"
    >
      <div className="title">简 易 版 新 生 杯</div>
      <Button type="link" className="login-button">
        登 录
      </Button>
    </Header>
  );
}
