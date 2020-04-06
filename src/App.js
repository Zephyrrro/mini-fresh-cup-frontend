import React from 'react';
import routerConfig from './router/router.config';
import renderRoutes from './router/router';

function App() {
  return <div className="App">{renderRoutes(routerConfig)}</div>;
}

export default App;
