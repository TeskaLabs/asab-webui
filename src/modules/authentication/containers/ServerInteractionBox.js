import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { 
  Alert, Button, Card, CardBody, Col, ListGroup, ListGroupItem, Label,
  Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Row 
} from 'reactstrap';
import axios from 'axios'

class ServerInteractionBox extends Component {

  constructor(props) {
    super(props);     
    
    this.state = {
      responseText:null,
      responseSuccess:false,
    };
  }

  sendReq (address, req) {           
    axios.post(
      address, req
    ).then(
      resp => this.reqSucceeded(req, resp)
    ).catch(
      error => this.reqFailed(req, error)
    );
  }

  reqSucceeded (login, resp) {        
    console.log ("REQUEST SUCCESSFUL");
    console.log("resp: " + resp.data);
    
    const responseText = resp.data;
    const responseSuccess = true;
    
    this.setState ({responseText, responseSuccess});         
  }

  reqFailed (login, error) {    
    console.log ("REQUEST FAILED");
    console.log(error.response.data);    

    const responseText = error.response.data;
    const responseSuccess = false;

    this.setState ({responseText, responseSuccess});
  }
}
  


export default ServerInteractionBox;