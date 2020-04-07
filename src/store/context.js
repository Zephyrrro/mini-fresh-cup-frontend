import React from 'react';

const LoginStatusContext = React.createContext({
  status: false,
  toggleStatus: () => {},
});
LoginStatusContext.displayName = 'LoginStatus';

export { LoginStatusContext };
