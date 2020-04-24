import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Button } from 'antd';
import './index.less';

const { Header } = Layout;

class ToolBar extends Component {
  handleClick = () => {
    const { isLogged, history } = this.props;
    //  根据是否已经登录实现不同功能
    if (!isLogged) {
      history.push('/login');
    } else {
      //  退出登录
    }
  };

  render() {
    const { isLogged } = this.props;
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
        <Button type="link" className="login-button" onClick={this.handleClick}>
          {isLogged ? '注 销' : '登 录'}
        </Button>
      </Header>
    );
  }
}

export default withRouter(ToolBar);
