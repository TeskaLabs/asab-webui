import React, { Component } from 'react'
import { Alert, Button, Card, CardBody, Form, Input, InputGroup, InputGroupAddon, InputGroupText, FormFeedback, ListGroup, ListGroupItem} from 'reactstrap';
import axios from 'axios'
import ServerInteractionBox from "./ServerInteractionBox";


class RegisterBox extends ServerInteractionBox {

    constructor(props) {
      super(props);      
      this.state = {
        email:{
          value:"",
          validate:false,
          valid:null 
        },
        pwd:{
          value:"",
          validate:false,
          valid:null
        },
        repPwd:{
          value:"",
          validate:false,
          valid:null
        },              
        submitPossible:false,
      };      
    }

    handleEmailInput(event) {      
      const { email } = this.state
      email.value = event.target.value
      this.setState({ email });              
      if (email.validate) {
        this.doValidateEmail (event.target.value);
      }      
    }
  
    handleEmailBlur(event) {
      const { email } = this.state
      email.validate = true
      this.setState({email});
      this.doValidateEmail (event.target.value);
    }
  
    doValidateEmail (value) {    
      const { email } = this.state;
      const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailRex.test(email.value)) {
        email.valid = true;
      } else {
        email.valid = false;
      }
      this.setState({ email });   
      this.doValidateSubmit ()
    }

    handlePwdInput(event) {      
      const { pwd, repPwd} = this.state
      pwd.value = event.target.value
      this.setState({ pwd });              
      if (pwd.validate) {
        this.doValidatePwd (event.target.value);
      }      
      if (repPwd.validate) {
        this.doValidateRepPwd (repPwd.value)
      }
    }
  
    handlePwdBlur(event) {
      const { pwd } = this.state
      pwd.validate = true
      this.setState({pwd});
      this.doValidatePwd (event.target.value);
    }
  
    doValidatePwd (value) {    
      const { pwd } = this.state;      
      const pwdRex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&\.]{8,}$/;
      
      if (pwdRex.test (pwd.value)) {
        pwd.valid = true;
      } else {
        pwd.valid = false;
      }
      this.setState({ pwd });   
      this.doValidateSubmit ()
    }

    handleRepPwdInput(event) {      
      const { repPwd } = this.state
      repPwd.validate = true
      repPwd.value = event.target.value
      this.setState({ repPwd });              
      if (repPwd.validate) {
        this.doValidateRepPwd (event.target.value);
      }      
    }
  
    doValidateRepPwd (value) {    
      const { repPwd, pwd } = this.state;      
      if (pwd.value == repPwd.value) {
        repPwd.valid = true;
      } else {
        repPwd.valid = false;
      }
      this.setState({ repPwd });   
      this.doValidateSubmit ()
    }

    doValidateSubmit () {
      const {email, pwd, repPwd, submitPossible} = this.state
      if (email.valid == true && pwd.valid == true && repPwd.valid == true) {           
        this.setState ({ submitPossible: true })
      } 
      
    }

    handleSubmit () {      
      event.preventDefault();
      
      const {email, pwd} = this.state      
      this.setState ({responseText:null})

      const req = {
        email: email.value,
        password: pwd.value,
      }
      this.sendReq("http://localhost:3000/api/register", req);      
    } 

    reqSucceeded (login, resp) {    
      super.reqSucceeded(login, resp);      
      setTimeout(() => this.props.toggleLogin(), 3000);
    }
  

  
    render() {
      const { responseText, responseSuccess } = this.state;
      
      return (                 
        <CardBody className="p-4">
          <Form>
            <h1>Register</h1>
            <p className="text-muted">Create your account</p>            
            <Alert isOpen = {responseText != null} color = {responseSuccess ? "success":"danger"}>
              {responseText}
            </Alert>     
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>@</InputGroupText>
              </InputGroupAddon>
              <Input 
              type="text" 
              placeholder="Email" 
              autoComplete="email" 
              onBlur = {this.handleEmailBlur.bind(this)}
              onChange={this.handleEmailInput.bind(this)}
              required
              valid={this.state.email.valid}
              invalid={this.state.email.valid===false}
              />
              <FormFeedback valid>
                This email looks great!
              </FormFeedback>     
              <FormFeedback invalid="true">
                This doesn't look like an email
              </FormFeedback>  
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-lock"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input 
                type="password" 
                placeholder="Password" 
                autoComplete="new-password" 
                onBlur = {this.handlePwdBlur.bind(this)}
                onChange={this.handlePwdInput.bind(this)}
                required
                valid={this.state.pwd.valid}
                invalid={this.state.pwd.valid===false}                
              />
              <FormFeedback valid>
                Awesome password!
              </FormFeedback>     
              <FormFeedback invalid="true">
                Password has to be longer than 8 characters, containing numbers and letters.
              </FormFeedback>               
            </InputGroup>
            <InputGroup className="mb-4">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-lock"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input 
                type="password" 
                placeholder="Repeat password" 
                autoComplete="new-password"                 
                onChange={this.handleRepPwdInput.bind(this)}
                required
                valid={this.state.repPwd.valid}
                invalid={this.state.repPwd.valid===false}                       
              />
              <FormFeedback valid>
                Passwords are the same
              </FormFeedback>     
              <FormFeedback invalid="true">
                Passwords are not the same!
              </FormFeedback>                
            </InputGroup>
            <InputGroup>
              <Button 
                color="success" 
                onClick={this.handleSubmit.bind(this)}
                disabled={!this.state.submitPossible}
                block
              >
                Create Account
              </Button>
            </InputGroup>
          </Form>
        </CardBody>        
      );
    }
  }


  class RegisterFailedSign extends Component {

    constructor(props) {
      super(props);      
    }
  
    render () {  
      return (        
        <Card>
            <ListGroup>
              <ListGroupItem color="danger">
                Invalid registration
              </ListGroupItem>        
            </ListGroup>      
        </Card>
      )
    }
  }
  
  
  class RegisterSuccessSign extends Component {
  
    constructor(props) {
      super(props);      
    }
  
    render () {  
      return (        
        <Card>
            <ListGroup>
              <ListGroupItem color="success">Registration successfull</ListGroupItem>        
            </ListGroup>      
        </Card>
      )
    }
  }

  
  export default RegisterBox;