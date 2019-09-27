import React, { Component } from 'react'
import { 
  Alert, Card, CardBody, ListGroup, ListGroupItem,
  Form, Input, InputGroup, InputGroupAddon, InputGroupText, Button,
} from 'reactstrap';
import axios from 'axios'
import ServerInteractionBox from "./ServerInteractionBox";


class RestoreBox extends ServerInteractionBox {

    constructor(props) {
      super(props);      
      this.state = {
        email:"",
      };
    }
  

    handleEmailInput(event) {
      this.setState({email: event.target.value});        
    }

    handleSubmit () {      
      event.preventDefault();
      const { email } = this.state      
      this.setState ({responseText:null})      
      const req = {email: email}
      this.sendReq("http://localhost:3000/api/restore", req);
    }
  
    render() {
      const { responseText, responseSuccess} = this.state; 

      return (                  
        <CardBody className="p-4">
          <Form>
            <h1>Reset password</h1>
            <p className="text-muted">Restore the password to your email</p>
            <Alert isOpen = {responseText != null} color = {responseSuccess ? "success":"danger"}>
              {responseText}
            </Alert>
            <InputGroup className="mb-4">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>@</InputGroupText>
              </InputGroupAddon>
              <Input 
                type="text" 
                placeholder="Email" 
                autoComplete="email" 
                onChange = {this.handleEmailInput.bind (this)}
              />
            </InputGroup>  
            <Button 
              color="primary" 
              className="px-4" 
              onClick = {this.handleSubmit.bind(this)}
              block>
              Reset pasword
            </Button>
          </Form>
        </CardBody>
      );
    }
  }


  export default RestoreBox;
