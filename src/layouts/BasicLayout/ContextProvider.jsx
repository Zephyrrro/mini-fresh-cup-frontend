import React, { Component } from 'react';
import ToolBar from '@/components/ToolBar';
import { LoginStatusContext } from '@/store/context';

class LoginStatusProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: false,
    };
  }

  componentDidMount() {
    const defaultLoginStatus =
      sessionStorage.getItem('token') && localStorage.getItem('identity');
    this.setState({ loginStatus: defaultLoginStatus });
  }

  toggleStatus = value => {
    this.setState({ loginStatus: value });
  };

  render() {
    const { loginStatus } = this.state;
    const { children } = this.props;
    return (
      <LoginStatusContext.Provider
        value={{ status: loginStatus, toggleStatus: this.toggleStatus }}
      >
        <ToolBar isLogged={loginStatus} />
        {children}
      </LoginStatusContext.Provider>
    );
  }
}

export default LoginStatusProvider;
