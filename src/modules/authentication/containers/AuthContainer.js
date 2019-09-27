import React, { Component } from 'react'
import { Button, ButtonGroup, Card, CardBody, CardHeader, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import LoginBox from './LoginBox'
import RegisterBox from './RegisterBox'
import RestoreBox from './RestoreBox'

class AuthContainer extends React.Component {

    constructor(props) {
      super(props);
      this.AuthService =  this.props.app.locateService("AuthService");
      this.toggleRestore = this.toggleRestore.bind(this);
      this.state = {
        active: "login"
      };

      // registrationEndpoint
      // requestIDEndpoint
      // requestTokenEndpoint
      // // restorePasswordEndpoint

    }


    isActive(s) {
      if (this.state.active==s){
        return "primary"
      }
      else {
        return "secondary"
      }
    }

    setActive(s) {
      this.setState({active:s})
    }

    toggleLogin() {
      this.setActive("login")
    }

    toggleRegister() {
      this.setActive("register")
    }

    toggleRestore() {
      this.setActive ("restore")
    }


    render() {
      //console.log("this.props.app",this.props.app)
      const { active } = this.state;
      //console.log('this.AuthService AUTH CONTAINER',this.AuthService)

      return (
        <Container>
				  <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-6">
                  <CardHeader>
                  	<ButtonGroup className="login-toggle" size="lg">
                      <Button color={this.isActive("login")} onClick={this.toggleLogin.bind(this)}>Login</Button>
                      <Button color={this.isActive("register")} onClick={this.toggleRegister.bind(this)}>Register</Button>
                    </ButtonGroup>
                  </CardHeader>
                  {this.state.active == "login" &&<LoginBox loginReqUrl = {this.props.loginReqUrl} authService = {this.AuthService} toggleRestore = {this.toggleRestore} />}
                  {this.state.active == "register" &&<RegisterBox toggleLogin={this.toggleLogin.bind(this)}/>}
                  {this.state.active == "restore" &&<RestoreBox/>}
                </Card>
              </CardGroup>
            </Col>
          </Row>
			  </Container>
      );
    }

  }


  export default AuthContainer;
