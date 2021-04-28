import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import FormLayout from './components/FormLayout';
import { UserContext } from './contexts/UserContext';
import NotAuthorized from './errors/NotAuthorized';

class App extends Component {

  render() {
    return (
      <Router forceRefresh={true} basename='/bitcountry/learnandearn'>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/form' component={FormLayout} />
          <Route path='/unauthorized' component={NotAuthorized} />
        </Switch>
      </Router>
    );
  }
}

App.contextType = UserContext;
export default App;
