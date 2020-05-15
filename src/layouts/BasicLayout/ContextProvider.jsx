import React, { useState } from 'react';
import ToolBar from '@/components/ToolBar';
import { LoginStatusContext } from '@/store/context';

export default function LoginStatusProvider({ children }) {
  //  登录状态的总入口，组件可以通过 useContext 来获取以及修改登录状态
  const defaultLoginStatus =
    sessionStorage.getItem('token') && localStorage.getItem('identity');
  const [loginStatus, setLoginStatus] = useState(defaultLoginStatus);
  return (
    <LoginStatusContext.Provider
      value={{ status: loginStatus, toggleStatus: setLoginStatus }}
    >
      <ToolBar isLogged={loginStatus} />
      {children}
    </LoginStatusContext.Provider>
  );
}
