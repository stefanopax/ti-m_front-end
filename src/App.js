
import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';


const base_url = 'http://localhost:80/'
const axios = require('axios')


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      json: null,
      token_key: null
    }
    this.requestGet = this.requestGet.bind(this);
    this.requestPost = this.requestPost.bind(this);
    this.getToken = this.getToken.bind(this);

  }

  requestPost(path) {
    console.log("in the function");
    const my_url = base_url + path;
    const body = {
      'loginId': 'LID-1555',
      'tenant': 'tim',
      'name': 'Stefano Paci'
    }

    axios.post(my_url, body).then((response) => {

      const formatted = JSON.stringify(response.data, undefined, 4);
      this.setState({
        json: formatted
      })
    })


  }

  requestGet(path) {

    console.log("in the function");

    const url = base_url + path;
    console.log(url);
    console.log(path);

    axios.get(url).then((response) => {
      console.log(response);
      console.log(response.data);
      console.log(response.data.hello)
      const formatted = JSON.stringify(response.data, undefined, 4);
      this.setState({
        json: formatted
      })
    })


  }

  getToken() {
    console.log("in the function");

    const url = 'http://localhost:80/token';


    axios.get(url).then((response) => {
      console.log(response);
      console.log(response.data);
      console.log(response.data.hello)
      const token = response.data;
      this.setState({
        token_key: token
      })
      console.log(token);
    })
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
          <div className="button-margin">
            <Button variant="contained" color="primary" onClick={() => this.requestPost('private/entity')} >
              POST private entity
        </Button>
          </div>

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
