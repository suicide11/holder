/*global chrome*/
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css'
import Home from './pages/home'
import AddHolder from './pages/addholder'
import Auth from './pages/auth'
class App extends Component {
  state = {
    token: false,
    addHolder: false
  }
  componentDidMount() {

    chrome.storage.sync.get(['token'], function (items) {
      if (items) {
        this.setState({
          token: items.token
        })
      }
    }.bind(this));

    
  }

  addHolder = (data) => {
    this.setState({
      addHolder: data
    })
  }

  render() {
    return (
      <div className="application-body">
        {this.state.token && !this.state.addHolder && <Home addHolder={this.addHolder} token={this.state.token} />}
        {this.state.addHolder && <AddHolder addHolder={this.addHolder} token={this.state.token} />}
        {!this.state.token && <Auth />}
      </div>
    );
  }

}

export default App;
