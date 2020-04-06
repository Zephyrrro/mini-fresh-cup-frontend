import React from 'react';

export default function AdminLayout({ children }) {
  //  这里可以写管理员的侧边栏，然后pages里面就可以专注写主要逻辑了
  return (
    <div className="layouts">
      layouts
      {children}
    </div>
  );
}
