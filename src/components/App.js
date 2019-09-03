import React, { Component } from 'react';
import BlogContainer from '../containers/BlogContainer';
import AppTemplate from './AppTemplate';

class App extends Component {
  render() {
    return (
      <AppTemplate
        blog_container={<BlogContainer />}
      />
    );
  }
}

export default App;
