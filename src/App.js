import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import './App.css';

const base_url = 'http://localhost:80'
const axios = require('axios')

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      json: null,
      token_key: null,
      loginId: "",
      tenant: "",
      name:"",
      entity_number:0
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

    const body = {
      'loginId': this.state.loginId,//'LID-1588',
      'tenant': this.state.tenant,//'tim',
      'name': this.state.name//'Stefano Paci'
    }
    
    axios.get(url, body).then((response) => {
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

  requestPrivateEntity(path) {

    let number=parseInt(this.state.entity_number);
    let url = base_url+path;

    axios.get(url, null, { params: {
      number      
    }}).then((response) => {
      const formatted = JSON.stringify(response.data, undefined, 4);
      this.setState({
        json: formatted
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
  
  handlePrivateEntity(event) {
    this.setState({entity_number: event.target.value});
    console.log(event.target.value)
  } 

  render() {

    return (
      <div className="App">
        <div className="App-left">
          <div className="button-margin">
            <Button variant="contained" color="primary" onClick={()=>this.requestGet('public')} >
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
              number:
              <Input value={this.state.entity_number} onChange={this.handlePrivateEntity} />
            </label>
            <br/>
            <Button variant="contained" color="primary" onClick={() => this.requestPrivateEntity('private/entity')} >
              Get private entity
            </Button>
          </form>
          <form>
            <label>
              loginId:
              <Input value={this.state.value} onChange={this.handleChangeLogin} />
            </label>
            <br/>
            <label>
              tenant:
              <Input value={this.state.value} onChange={this.handleChangeTenant} />
            </label>
            <br/>
            <label>
              name:
              <Input value={this.state.value} onChange={this.handleChangeName} />
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