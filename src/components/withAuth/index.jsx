import React from 'react';
import { Redirect } from 'react-router-dom';
import { commonRouterConfig, adminRouterConfig } from '@/router/router.config';

const generateAuth = (config = []) => {
  const routes = [];
  config.forEach(item => {
    if (Array.isArray(item.routes)) {
      routes.push(...generateAuth(item.routes));
    }
    routes.push(item.path);
  });
  return routes;
};

export default function Auth({ children, path }) {
  const authIdentity = localStorage.getItem('identity') || 'Visitor';
  const VisitorAuth = ['/', '/login', '/404'];
  const UserAuth = generateAuth(commonRouterConfig);
  const AdminAuth = generateAuth(adminRouterConfig).concat(UserAuth);

  //  根据登录情况以及身份实现重定向
  if (
    (authIdentity === 'Visitor' && !VisitorAuth.includes(path)) ||
    (authIdentity === 'User' && !UserAuth.includes(path)) ||
    (authIdentity === 'Admin' && !AdminAuth.includes(path))
  ) {
    return <Redirect to="/" />;
  }
  return children;
}
