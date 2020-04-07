import React from 'react';

export default function AdminLayout({ children }) {
  //  这里可以写管理员的侧边栏，这样组件里可以专注于组件本身逻辑
  return <div className="layouts">{children}</div>;
}
