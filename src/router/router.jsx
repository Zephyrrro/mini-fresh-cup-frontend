/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Auth from '@/components/withAuth';
import BasicLayout from '@/layouts/BasicLayout';
import NotFound from '../layouts/NotFound';

export default function renderRoutes(routerConfig) {
  return (
    <Router>
      <BasicLayout>
        <Switch>
          {routerConfig.map((route, id) => {
            const { path, component, routes, ...others } = route;
            if (!routes) {
              const RouteComponent = component;
              return (
                <Route
                  {...others}
                  path={path}
                  key={id}
                  render={props => {
                    return (
                      <Auth path={path}>
                        <RouteComponent {...props} />
                      </Auth>
                    );
                  }}
                />
              );
            }
            const RouteLayout = component;
            return (
              <Route path={path} key={id} {...others}>
                <RouteLayout>
                  <Switch>
                    {routes.map((routeChild, idx) => {
                      routeChild.path = path.concat(routeChild.path);
                      const { component: RouteComponent, ...rest } = routeChild;
                      return (
                        <Route
                          key={`${id}-${idx}`}
                          {...rest}
                          render={props => {
                            return (
                              <Auth path={routeChild.path}>
                                <RouteComponent {...props} />
                              </Auth>
                            );
                          }}
                        />
                      );
                    })}
                    <Redirect to="/404" />
                  </Switch>
                </RouteLayout>
              </Route>
            );
          })}
          <Route path="/404" render={() => <NotFound />} />
          <Redirect to="/404" />
        </Switch>
      </BasicLayout>
    </Router>
  );
}
