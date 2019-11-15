import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import './App.css';
import 'react-json-pretty/themes/monikai.css';
import JSONPretty from 'react-json-pretty';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


import { withStyles } from "@material-ui/core/styles";

const base_url = 'http://localhost:80/'
const axios = require('axios')
const styles = theme => ({
  root: {
    backgroundColor: "red"
  }
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      json: null,
      token_key: null,
      loginId: "",
      tenant: "",
      name:"",
      entity_number: "",
      entity_id: "",
      a : "",
      b : "",
      amount : "",
      notes : "",
      document_number: "",
      document_id: "",
      document_page: ""
    }
 
    this.requestGet = this.requestGet.bind(this);
    this.requestPost = this.requestPost.bind(this);
    this.getToken = this.getToken.bind(this);
    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleChangeTenant = this.handleChangeTenant.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handlePrivateEntity = this.handlePrivateEntity.bind(this)
    this.handleDeleteEntity = this.handleDeleteEntity.bind(this)
    this.handleChangeA = this.handleChangeA.bind(this)
    this.handleChangeB = this.handleChangeB.bind(this)
    this.handleChangeAmount = this.handleChangeAmount.bind(this)
    this.handleChangeNotes = this.handleChangeNotes.bind(this)
    this.handleGetDocument = this.handleGetDocument.bind(this)
    this.handleDeleteDocument = this.handleDeleteDocument.bind(this)
  }
  

  requestPost(path) {
    const my_url = base_url + path;
    const body = {
      'loginId': this.state.loginId,
      'tenant': this.state.tenant,
      'name': this.state.name
    }

    axios.post(my_url, body).then((response) => {
      const formatted = JSON.stringify(response.data, undefined, 4);
      this.setState({
        json: formatted
      })
    })
  }

  requestPostDocument(path) {
    const my_url = base_url + path;
    const body = {
      'partALoginId': this.state.a,
      'partBLoginId': this.state.b,
      'amount': this.state.amount,
      'notes': this.state.notes
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
      'loginId': this.state.loginId,
      'tenant': this.state.tenant,
      'name': this.state.name
    }
    axios.get(url, body).then((response) => {
      const formatted = JSON.stringify(response.data, undefined, 4);
      this.setState({
        json: formatted
      })
    })
  }

  requestGetDocument(path) {
    let url = base_url+path+"/"+this.state.document_page;
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

  requestDeleteEntity(path){
  let url = base_url+path;
    let id = this.state.entity_id
    axios.delete(url, null, { params: {
      id      
    }}).then((response) => {
      const formatted = JSON.stringify(response.data, undefined, 4);
      this.setState({
        json: formatted
      })
    })
  }

  requestDeleteDocument(path){
    let url = base_url+path+"/"+this.state.document_id
      axios.delete(url).then((response) => {
        const formatted = JSON.stringify(response.data, undefined, 4);
        this.setState({
          json: formatted
        })
      })
    }
  

  requestPrivateEntity(path) {
    let url = base_url+path+"/"+this.state.entity_number;
    axios.get(url).then((response) => {
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
  } 

  handleDeleteEntity(event) {
    this.setState({entity_id: event.target.value});
  } 

  handleChangeA(event) {
    this.setState({a: event.target.value});
  } 

  handleChangeB(event) {
    this.setState({b: event.target.value});
  } 

  handleChangeAmount(event) {
    this.setState({amount: event.target.value});
  } 

  handleChangeNotes(event) {
    this.setState({notes: event.target.value});
  } 

  handleGetDocument(event) {
    this.setState({document_page: event.target.value})
  }

  handleDeleteDocument(event) {
    this.setState({document_id: event.target.value})
  }

  

  render() {
    const { classes } = this.props;
    return (
      
      <div className="App">
        <div className="App-left">
          <div className="button-margin">
            <Button variant="contained" color="primary" startIcon={<SaveIcon />}  onClick={()=>this.requestGet('public')} >
            GET public
            </Button>
          </div>
          <div className="button-margin">
            <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={() => this.getToken()} >
              Generate JWT TOKEN
          </Button>
          </div>
          <div className="button-margin">
            <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={() => this.requestGet('actuator/health')} >
              GET Health Status
        </Button>
          </div>
          <div className="button-margin">
            <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={() => this.requestGet('private')} >
              GET private
            </Button>
          </div>
          <form>
            <label>
              number:
              <Input type="number" value={this.state.entity_number} onChange={this.handlePrivateEntity} />
            </label>
            <br/>
            <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={() => this.requestPrivateEntity('private/entity')} >
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
            <Button variant="contained" color="default" startIcon={<CloudUploadIcon />} onClick={() => this.requestPost('private/entity')} >
              POST private entity
            </Button>
          </form>
          <form>
            <label>
              id:
              <Input type="number" value={this.state.entity_id} onChange={this.handleDeleteEntity} />
            </label>
            <br/>
            <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={() => this.requestDeleteEntity('private/entity')} >
              Delete private entity
            </Button>
          </form>
          <form>
          <label>
              A:
              <Input value={this.state.a} onChange={this.handleChangeA} />
            </label>
            <br/>
            <label>
              B:
              <Input value={this.state.b} onChange={this.handleChangeB} />
            </label>
            <br/>
            <label>
              amount:
              <Input value={this.state.amount} onChange={this.handleChangeAmount} />
            </label>
            <br/>
            <label>
              notes:
              <Input value={this.state.notes} onChange={this.handleChangeNotes} />
            </label>
            <br/>
            <Button variant="contained" color="primary" color="default" startIcon={<CloudUploadIcon />} onClick={() => this.requestPostDocument('private/document')} >
              POST private document
            </Button>
          </form>
          <form>
            <label>
              number:
              <Input type="number" value={this.state.document_page} onChange={this.handleGetDocument} />
            </label>
            <br/>
            <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={() => this.requestGetDocument('private/document')} >
              Get private document
            </Button>
          </form>
          <form>
            <label>
              number:
              <Input type="number" value={this.state.document_id} onChange={this.handleDeleteDocument} />
            </label>
            <br/>
            <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={() => this.requestDeleteDocument('private/document')} >
              Delete private document
            </Button>
          </form>
        </div>
        <div className="App-right">
          <JSONPretty className="my-json" data={this.state.json} theme="acai"></JSONPretty>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
