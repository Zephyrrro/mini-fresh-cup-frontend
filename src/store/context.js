import React from 'react';

//  提供Context
const LoginStatusContext = React.createContext({
  status: false,
  toggleStatus: () => {},
});
LoginStatusContext.displayName = 'LoginStatus';

export { LoginStatusContext };
