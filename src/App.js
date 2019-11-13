import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './App.css';

const base_url = 'http://localhost:80/'
const axios = require('axios')

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: null,
      token_key: null,
      loginId: "",
      tenant: "",
      name:""
    }

    this.requestGet = this.requestGet.bind(this);
    this.requestPost = this.requestPost.bind(this);
    this.getToken = this.getToken.bind(this);
    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleChangeTenant = this.handleChangeTenant.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);

  }

  requestPost(path) {
    const my_url = base_url + path;
    const body = {
      'loginId': this.state.loginId,//'LID-1588',
      'tenant': this.state.tenant,//'tim',
      'name': this.state.name//'Stefano Paci'
    }

    axios.post(my_url, body).then((response) => {
      const formatted = JSON.stringify(response.data, undefined, 4);
      this.setState({
        json: formatted
      })
    })
  }

  requestGet(path) {

    const url = base_url + path;

    axios.get(url).then((response) => {
      const formatted = JSON.stringify(response.data, undefined, 4);
      this.setState({
        json: formatted
      })
    })
  }

  getToken() {
    const url = 'http://localhost:80/token';
    axios.get(url).then((response) => {
      const token = response.data;
      this.setState({
        token_key: token
      })
    })
  }

  handleChangeLogin(event) {
    this.setState({loginId: event.target.value});
  }

  handleChangeTenant(event) {
    this.setState({tenant: event.target.value});
  }

  handleChangeName(event) {
    this.setState({name: event.target.value});
  }  

  render() {
    
    return (
      <div className="App" >
        <div className="App-left">
          <div className="button-margin">
            <Button variant="contained" color="primary" onClick={() => this.requestGet('public')} >
              GET public
        </Button>
          </div>
          <div className="button-margin">
            <Button variant="contained" color="primary" onClick={() => this.getToken()} >
              Generate JWT TOKEN
        </Button>
          </div>
          <div className="button-margin">
            <Button variant="contained" color="primary" onClick={() => this.requestGet('actuator/health')} >
              GET Health Status
        </Button>
          </div>
          <div className="button-margin">
            <Button variant="contained" color="primary" onClick={() => this.requestGet('private')} >
              GET private
            </Button>
          </div>
          <form>
            <label>
              loginId:
              <textarea value={this.state.value} onChange={this.handleChangeLogin} />
            </label>
            <br/>
            <label>
              tenant:
              <textarea value={this.state.value} onChange={this.handleChangeTenant} />
            </label>
            <br/>
            <label>
              name:
              <textarea value={this.state.value} onChange={this.handleChangeName} />
            </label>
            <br/>
            <Button variant="contained" color="primary" onClick={() => this.requestPost('private/entity')} >
              POST private entity
            </Button>
          </form>
        </div>

        <div className="App-right">
          <pre className="json-format">
            {this.state.json}
          </pre>
        </div>

      </div>
    );
  }
}

export default App;