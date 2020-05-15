import React from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { MessageOutlined, FileAddOutlined, FolderViewOutlined } from '@ant-design/icons';

const { Content, Sider } = Layout;

export default function AdminLayout({ children }) {
  const history = useHistory();
  const handleOnClick = e => {
    history.push(`/admin/${e.key}`);
  };
  //  这里可以写管理员的侧边栏，这样组件里可以专注于组件本身逻辑
  return (
    <div className="layouts">
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            theme="light"
            style={{ width: 220 }}
            defaultSelectedKeys="2"
            mode="inline"
            onClick={handleOnClick}
          >
            <Menu.Item icon={<MessageOutlined/>} key="notice/edit">
              公告管理
            </Menu.Item>
            <Menu.Item icon={<FileAddOutlined/>} key="question/add">添加题目</Menu.Item>
            <Menu.Item icon={<FolderViewOutlined/>} key="question/view">查看题目</Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 10,
              margin: 0,
              minHeight: 280
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
