import React, { Component } from 'react'
import { Button, ButtonGroup, Card, CardBody, CardHeader, CardFooter, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import LoginBox from './LoginBox'
import RegisterBox from './RegisterBox'
import RestoreBox from './RestoreBox'
import queryString from 'query-string'
import axios from 'axios'

class AuthContainer extends React.Component {

    constructor(props) {
      super(props);
      this.AuthService =  this.props.app.locateService("AuthService");
      this.toggleRestore = this.toggleRestore.bind(this);
      this.state = {
        active: "login"
      };

      const responseType = "code";
      const clientID = "kapr";
      const scope = "openid%20profile&state=EqlqtwjhZZ6Vd41Z";
      const redirect = "http%3A%2F%2Flocalhost:3000/auth";
      const domain = "https://via.teskalabs.com/seacat-auth";
      //this.teskalabsAuthProvider = `http://localhost:8080/authorization_endpoint/authentication_request?response_type=${responseType}&client_id=${clientID}&scope=${scope}&redirect_uri=${redirect}`;
      this.teskalabsAuthProvider = `${domain}/authorization_endpoint/authentication_request?response_type=${responseType}&client_id=${clientID}&scope=${scope}&redirect_uri=${redirect}`;



      const urlParams = queryString.parse(props.location.search);
      console.log("urlParams.code",urlParams.code);
      console.log("urlParams.state",urlParams.state);

      if (urlParams.code) {
        console.log ("GOT AUTHORIZATION CODE")
        //const address = "/authorization_endpoint/sign_in/"
        const address = "/token_endpoint/token_request"

        const requestBody = {
          'response_type': 'code',
          'client_id': 'kapr',
          'scope': '?',
          'grant_type': 'authorization_code',
          'redirect_uri':"http://localhost:3000/auth",
          'client_secret': 'secret',
          'state': urlParams.state,
          'code': urlParams.code,
        }
        console.log ("requestBody",requestBody)


        this.sendReq(address, queryString.stringify(requestBody))
        //this.props.history.push('/imgviewer')
      }

      // registrationEndpoint
      // requestIDEndpoint
      // requestTokenEndpoint
      // // restorePasswordEndpoint
    }

    sendReq (address, req) {
      axios({
        method:'post',
        url:address,
        data: req,
        config:{
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            //'Content-Type': 'kapr'
          }
        }
      }).then(
        resp => this.reqSucceeded(req, resp)
      ).catch(
        error => this.reqFailed(req, error)
      );
    }

    reqSucceeded (login, resp) {
      console.log ("REQUEST SUCCESSFUL");
      const respData = resp.data;
      const user = {
        access_token: respData.access_token,
        expires_in: respData.expires_in,
        refresh_token: respData.refresh_token,
        token_id: respData.token_id,
        token_type: respData.token_type,
        auth_server: "SeaCat auth"
      };
      console.log(user);

      this.AuthService.login (user);
      this.props.history.push('/imgviewer')
    }

    reqFailed (login, error) {
      console.log ("REQUEST FAILED");
      console.log(error.response.data);

      const responseText = error.response.data;
      const responseSuccess = false;

      this.setState ({responseText, responseSuccess});
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


    handleRegister () {
      console.log ("REGISTER")
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
                  	Sign in with
                  </CardHeader>
                  <CardBody className="justify-content-center">
                    <a href = {this.teskalabsAuthProvider}>
                      <Button
                        color="primary"
                      >
                        Teskalabs
                      </Button>
                    </a>
                  </CardBody>
                  <CardFooter>
                    or you can
                    {/* <Button
                      color="link"
                      onClick={this.handleRegister.bind (this)}
                    >sign up</Button> */}
                    <Link to={`/register`}> register</Link>
                  </CardFooter>
                </Card>
              </CardGroup>
            </Col>
          </Row>
			  </Container>
      );
    }

  }


  export default AuthContainer;
