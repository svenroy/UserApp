import React, { Component } from 'react';
import 'bootstrap';
import './style.css';
 
import {view as LoginView} from '../features/login';

class App extends Component {  
  render() {
      return(<LoginView />);
  }
}

export default App;
