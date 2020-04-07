import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'antd';
import { LoginStatusContext } from '@/store/context';
import UserForm from './components/UserForm';
import AdminForm from './components/AdminForm';

import './index.less';

function Login() {
  const history = useHistory();
  const { status, toggleStatus } = useContext(LoginStatusContext);
  const [identity, setIdentity] = useState('user');
  const [title, setTitle] = useState('用 户 登 录');

  useEffect(() => {
    //  使用上下文判断是否已经登录，如果已经登录则根据身份跳转到相应页面
    if (status) {
      if (localStorage.getItem('identity') === 'User') {
        history.push('/answer');
      } else {
        history.push('/admin/question/add');
      }
    }
  }, [status, history]);

  return (
    <div className="login-container">
      <Card
        title={title}
        className="login-card"
        headStyle={styles.cardHeader}
        bodyStyle={styles.cardBody}
      >
        <div className="wrapper">
          <div className={`form-container ${identity}`}>
            <UserForm
              style={{ display: `${identity === 'user' ? 'block' : 'none'}` }}
              titleTrigger={setTitle}
              identityTrigger={setIdentity}
              toggleLogin={toggleStatus}
            />
            <AdminForm
              titleTrigger={setTitle}
              identityTrigger={setIdentity}
              toggleLogin={toggleStatus}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

const styles = {
  cardHeader: {
    width: '70%',
    margin: '0 auto',
    backgroundColor: 'rgb(61, 81, 181)',
    borderColor: 'rgb(61, 81, 181)',
    borderRadius: '15px',
    transform: 'translateY(-30%)',
    textAlign: 'center',
    color: 'white',
    fontSize: '1.2rem',
    boxShadow: '0px 2px 6px grey, 0px 2px 5px grey',
  },
  cardBody: {
    paddingBottom: '0',
  },
};

export default Login;
