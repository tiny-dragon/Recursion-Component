import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import App from './components/App';
import AxiosTest from './components/AxiosTest';
import AxiosTestEdit from './components/AxiosTestEdit';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Root = () => {
  return (
    <Router>
      <Provider store={store}>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a href={'/'} className="navbar-brand">My First React Page</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item"><Link to={'/blog'} className="nav-link">Blog</Link></li>
                <li className="nav-item"><Link to={'/employee'} className="nav-link">Axios</Link></li>
              </ul>
              <hr />
            </div>
          </nav> <br />
          <Switch>
            <Route exact path='/blog' component={ App } />
            <Route path='/employee/:id' component={ AxiosTestEdit } />
            <Route path='/employee' component={ AxiosTest } />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
};

export default Root;