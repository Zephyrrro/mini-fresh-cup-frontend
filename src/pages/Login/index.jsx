import React, { useState } from 'react';
import './index.less';

function Login() {
  const [registerVisible, setVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  return <div className="login-container" />;
}

export default Login;
