import React from 'react';
import { IndexRoute, Route, browserHistory } from 'react-router';
import App from './containers/App';
import NoMatch from './components/NoMatch';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/auth/Login';
import Admin from './components/Admin';
import Sections from './components/Sections';
import Section from './components/Section';
import Settings from './components/Settings';
import Textpad from './components/Textpad';
// import { UserAuthWrapper } from 'redux-auth-wrapper';
import { connectedReduxRedirect } from 'redux-auth-wrapper/history3/redirect'
import { handleLogout } from './components/auth/actions';

// const UserIsAuthenticated = UserAuthWrapper({
//   authSelector: state => state.auth,
//   predicate: auth => auth.isAuthenticated,
//   redirectAction: () => handleLogout(browserHistory),
//   wrapperDisplayName: 'UserIsAuthenticated'
// })

export const userIsAuthenticated = connectedReduxRedirect({
  redirectPath: '/login',
  authenticatedSelector: state => state.auth !== null,
  predicate: auth => auth.isAuthenticated,
  redirectAction: () => handleLogout(browserHistory),
  wrapperDisplayName: 'UserIsAuthenticated'
})

export default (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="about" component={About} />
      <Route path="contact" component={Contact} />
      <Route path="login" component={Login} />
      <Route path="admin" component={userIsAuthenticated(Admin)} />
      <Route path="settings" component={Settings} />
      {/*<Route path="textpad" component={Textpad} />*/}
      {/*<Route path="/sections" component={Sections} />*/}
      <Route path="section/:id" component={Section} />
    </Route>
    <Route path="*" status={404} component={NoMatch}/>
  </Route>
)

