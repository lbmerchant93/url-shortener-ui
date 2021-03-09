import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrl, deleteUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      errorMsg: ''
    }
  }

  componentDidMount() {
    getUrls()
      .then(results => {
        if (typeof results === 'string') {
          this.setState({errorMsg: results}) 
        } else {
          this.setState({ urls: results.urls})
        }
      })
  }

  addUrl = (newUrl) => {
    const post = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({...newUrl})
    }
    postUrl(post)
      .then(results => {
        if (typeof results === 'string') {
          this.setState({errorMsg: results}) 
        } else {
          this.setState({  urls: [...this.state.urls, results] })
        }
        })
  }

  removeUrl = (id) => {
    const filteredUrls = this.state.urls.filter(url => url.id !== parseInt(id))
    deleteUrl(id)
      .then(results => {
        if (results !== 'success!') {
          this.setState({errorMsg: results}) 
        } else {
          this.setState({  urls: filteredUrls })
        }
        })
  }

  render() {

    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm addUrl={this.addUrl} />
        </header>

        <UrlContainer urls={this.state.urls} errorMsg={this.state.errorMsg} removeUrl={this.removeUrl} />
      </main>
    );
  }
}

export default App;
