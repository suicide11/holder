/*global chrome*/
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css'
import Home from './pages/home'
import AddHolder from './pages/addholder'
import Auth from './pages/auth'
import Loader from './pages/loader'
class App extends Component {
  state = {
    token: false,
    addHolder: false,
    loader: false
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
  handleToken=(data)=>{
    this.setState({
      token:data
    })
  }

  handleLoader = (data)=>{
    this.setState({
      loader:data
    })
  }

  render() {
    return (
      <div className="application-body">
        {this.state.loader && <Loader></Loader>}
        {this.state.token && !this.state.addHolder && <Home handleLoader={this.handleLoader} addHolder={this.addHolder} token={this.state.token} />}
        {this.state.addHolder && <AddHolder handleLoader={this.handleLoader} addHolder={this.addHolder} token={this.state.token} />}
        {!this.state.token && <Auth handleLoader={this.handleLoader} handleToken={this.handleToken} />}
      </div>
    );
  }

}

export default App;
