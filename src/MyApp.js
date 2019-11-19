import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import './MyApp.css';
import 'react-json-pretty/themes/monikai.css';
import JSONPretty from 'react-json-pretty';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import NavigationIcon from '@material-ui/icons/Navigation';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import WarningSnackbars from './WarningSnackbars'
import SuccessSnackbars from './SuccessSnackbars'

import { withStyles } from "@material-ui/core/styles";

const base_url = 'http://localhost:80/'
const axios = require('axios')

//axios.defaults.timeout = 5000

const styles = theme => ({
  card: {
  borderRadius: "20px",
  background: "#adad85",
  marginLeft: "65px",
  padding: "2px",
  width: "auto",
  maxWidth: "500px",
  height: "auto",
  boxShadow: "1px 2px black"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: "transparent",
    boxShadow: "none"
  },
  root: {
    flexGrow: 1,
    backgroundColor: "red"
  }
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      is_authenticated: false,
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
    if(this.checkAuthentication()){
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
  }

  checkAuthentication() {
    if(!this.state.is_authenticated){
      this.setState({
        json: "You are not authenticated"
      })
      return false
    }
      return true
  }

  requestPostDocument(path) {
    if(this.checkAuthentication()){
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
  }

  requestGet(path) {
    if(path=='private' && this.checkAuthentication() || path=='public' || path=='actuator/health'){
      const url = base_url + path;
      axios.get(url).then((response) => {
        const formatted = JSON.stringify(response.data, undefined, 4);
        this.setState({
          json: formatted
        })
      })
    }
  }

  requestGetDocument(path) {
    if(this.checkAuthentication()){
      let url = base_url+path+"/"+this.state.document_page;
      axios.get(url).then((response) => {
        const formatted = JSON.stringify(response.data, undefined, 4);
        this.setState({
          json: formatted
        })
      })
    }
  }

  getToken() {
    this.setState({
      is_authenticated: !this.state.is_authenticated
    })
    const url = 'http://localhost:80/token';
    axios.get(url).then((response) => {
      const token = response.data;
      this.setState({
        token_key: token
      })
    })
  }

  requestDeleteEntity(path){
    if(this.checkAuthentication()){
      let url = base_url+path+"/"+this.state.entity_id;
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
  }

  requestDeleteDocument(path){
    if(this.checkAuthentication()){
      let url = base_url+path+"/"+this.state.document_id;
        let id = this.state.document_id
        axios.delete(url, null, { params: {
          id
        }}).then((response) => {
          const formatted = JSON.stringify(response.data, undefined, 4);
          this.setState({
            json: formatted
          })
        })
      }
    }
  
  requestPrivateEntity(path) {
    if(this.checkAuthentication()){
      let url = base_url+path+"/"+this.state.entity_number;
      axios.get(url).then((response) => {
        const formatted = JSON.stringify(response.data, undefined, 4);
        this.setState({
          json: formatted
        })
      })
    }
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

  
  showContent(){
    if(this.state.is_authenticated)
    return (
      <SuccessSnackbars/>
    )
    else
    return (
      <WarningSnackbars/>
    )
  }

  render() {
    const { classes } = this.props;
    
    return (
      <div className="App">
        <div className="App-left"> 
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div className="button-margin">
                <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={() => this.getToken()} >
                  Generate JWT TOKEN
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} style={{"position":"absolute","right":"0", "top":"0"}}>
              {
                this.showContent()
              }
            </Grid>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                  <Button onClick={() => this.requestGet('actuator/health')}  >
                    <NavigationIcon/>
                  </Button>      
                  }
                  title="Health endpoint"
                  subheader="No need to be authenticated"
                />
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card className={classes.card} >
                <CardHeader
                  avatar={
                    <Button startIcon={<SaveIcon />}  onClick={()=>this.requestGet('public')} >
                    </Button>
                  }
                  title="Public endpoint"
                  subheader="No need to be authenticated"
                />
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                  <Button startIcon={<SaveIcon />} onClick={() => this.requestGet('private')} >
                  </Button>
                  }
                  title="Private endpoint"
                  subheader="Need to be authenticated"
                />
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Button startIcon={<SaveIcon />} onClick={() => this.requestPrivateEntity('private/entity')} >
                    </Button>
                  }
                  title="Returns a paginated list with all the users in the system"
                  subheader="Page number is needed"
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    <form>
                      <label>
                        number:
                        <Input value={this.state.entity_number} onChange={this.handlePrivateEntity} />
                      </label>
                    </form> 
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Button startIcon={<CloudUploadIcon />} onClick={() => this.requestPost('private/entity')} >
                    </Button>
                  }
                  title="Create a private entity"
                  subheader="loginId, tenant and name are needed"
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
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
                    </form> 
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Button startIcon={<DeleteIcon />} onClick={() => this.requestDeleteEntity('private/entity')} >
                    </Button>
                  }
                  title="Delete entity"
                  subheader="Deletes a user by its ID"
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    <form>
                      <label>
                        id:
                        <Input type="number" value={this.state.entity_id} onChange={this.handleDeleteEntity} />
                      </label>
                    </form>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Button startIcon={<SaveIcon />} onClick={() => this.requestGetDocument('private/document')} >
                    </Button>
                  }
                  title="Returns a paginated list with all the contracts in the system"
                  subheader="Page number is needed"
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                  <form>
                    <label>
                      number:
                      <Input type="number" value={this.state.document_page} onChange={this.handleGetDocument} />
                    </label>
                  </form>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Button startIcon={<CloudUploadIcon/>} onClick={() => this.requestPostDocument('private/document')} >
                    </Button>
                  }
                  title="Creates a contract between two users"
                  subheader="loginIdA, loginIdB, amount and notes are needed"
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
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
                    </form>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Button startIcon={<DeleteIcon />} onClick={() => this.requestDeleteDocument('private/document')} >
                    </Button>
                  }
                  title="Delete document"
                  subheader="Deletes a contract by its ID"
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    <form>
                      <label>
                        number:
                        <Input value={this.state.document_id} onChange={this.handleDeleteDocument} />
                      </label>
                    </form>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <br/>
        </div>
        <div className="App-right">
          <JSONPretty className="my-json" data={this.state.json}></JSONPretty>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
