import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import {
  Alert, Button, Card, CardBody, Col, ListGroup, ListGroupItem, Label,
  Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Row
} from 'reactstrap';
import axios from 'axios'
import ServerInteractionBox from "./ServerInteractionBox";


class LoginBox extends ServerInteractionBox {

  constructor(props) {
    super(props);

    this.state = {
      email:"",
      password:"",
      rememberChecked:false,
    };
  }



  handleEmailInput(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordInput(event) {
    this.setState({password: event.target.value});
  }

  handleRememberToggle(event) {
    this.setState({rememberChecked: !this.state.rememberChecked});
  }

  handleSubmit () {
    event.preventDefault();

    const {email, password, rememberChecked} = this.state
    this.setState ({responseText:null})

    const req = {
      email: email,
      password: password,
      rememberChecked: rememberChecked
    }
    this.sendReq("http://localhost:3000/api/login", req);
    //this.sendReq(this.props.loginReqUrl, req);

  }

  reqSucceeded (login, resp) {
    super.reqSucceeded(login, resp);
    this.props.authService.login(login);
    setTimeout(() => this.props.history.push('/imgviewer'), 1200);
  }

  render() {
    const { responseText, responseSuccess} = this.state;

    return (
        <CardBody className="p-4">
          <Form>
            <h1>Login</h1>
            <p className="text-muted">Sign In to your account</p>
            <Alert isOpen = {responseText != null} color = {responseSuccess ? "success":"danger"}>
              {responseText}
            </Alert>
            <FormGroup>
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>@</InputGroupText>
                </InputGroupAddon>
                <Input
                  type="text"
                  placeholder="Email"
                  autoComplete="email"
                  onChange={this.handleEmailInput.bind(this)}
                  required
                />
              </InputGroup>

            </FormGroup>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-lock"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                onChange={this.handlePasswordInput.bind(this)}
                required
              />
            </InputGroup>
            <FormGroup check className="checkbox" className="mb-4">
              <Input
                className="form-check-input"
                type="checkbox"
                id="checkbox-remember"
                name="Remember me"
                value="remember"
                onChange={this.handleRememberToggle.bind(this)}
              />
              <Label check className="form-check-label" htmlFor="checkbox-remember">
                Remember me
              </Label>
            </FormGroup>
            <Row>
              <Col xs="6">
                <Button
                  color="primary"
                  className="px-4"
                  onClick={this.handleSubmit.bind(this)}
                >
                  Login
                </Button>
              </Col>
              <Col xs="6" className="text-right">
                <Button color="link" className="px-0" onClick={this.props.toggleRestore}>
                  Forgot password?
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
    );
  }
}


const mapStateToProps = state => {
  return {
    AuthService: state.AuthService
  };
};


export default withRouter(connect(mapStateToProps)(LoginBox));
