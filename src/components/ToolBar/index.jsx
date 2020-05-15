import React,{useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Button } from 'antd';
import { LoginStatusContext } from '@/store/context';
import './index.less';

const { Header } = Layout;

function ToolBar({ isLogged }) {
  //  使用 hooks 获取在 Router 中注入的 history 对象
  const history = useHistory();
  const { status, toggleStatus } = useContext(LoginStatusContext);

  const handleClick = () => {
    //  根据是否已经登录实现不同功能
    if (!isLogged) {
      history.push('/login');
    } else {
      toggleStatus(false);
      history.push('/login');
      //  退出登录
    }
  };
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
      <Button type="link" className="login-button" onClick={handleClick}>
        {isLogged ? '注 销' : '登 录'}
      </Button>
    </Header>
  );
}

export default ToolBar;
