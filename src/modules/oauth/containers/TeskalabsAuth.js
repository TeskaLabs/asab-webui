import React, { Component } from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import queryString from 'query-string'
import axios from 'axios'

class TeskalabsAuth extends React.Component {

    constructor(props) {
      super(props);
      this.AuthService =  this.props.app.locateService("AuthService");
    }

    componentDidMount() {
      this.requestToken();
    }

    requestToken() {
      const urlParams = queryString.parse(this.props.location.search);
      console.log("urlParams.code",urlParams.code);

      if (urlParams.code) {
        console.log ("GOT AUTHORIZATION CODE");
        const url = "/token";

        const requestBody = {
          'response_type': 'code',
          'client_id': 'kapr',
          'scope': '?',
          'grant_type': 'authorization_code',
          'redirect_uri':"http://localhost:3000/auth/teskalabs",
          'client_secret': 'secret',
          'state': "?????",
          'code': urlParams.code,

        }

        this.sendReq(
          url,
          queryString.stringify(requestBody),
          this.tokenRequestSucceeded.bind(this),
          this.tokenRequestFailed.bind(this)
        );
      }
    }

    sendReq (url, req_data, successProcess, failProcess) {
      const config = {
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-OAuthServerId': 'teskalabs.com',
        }
      }
      console.log("SENDING TOKEN REQ")
      axios.post(
        url, req_data,config
      ).then(
        resp => successProcess(req_data, resp)
      ).catch(
        error => failProcess(req_data, error)
      );
    }

    tokenRequestSucceeded (login, resp) {
      console.log ("TOKEN REQUEST SUCCESSFUL");
      //const respData = resp.data;
      const respData = JSON.parse(resp.data);
      const user = {
        access_token: respData.access_token,
        expires_in: respData.expires_in,
        refresh_token: respData.refresh_token,
        token_id: respData.token_id,
        token_type: respData.token_type,
        auth_server: "teskalabs.com"
      };

      const url = "/identity"
      const config = {
        headers:{
          'X-OAuthServerId': 'teskalabs.com',
          "Authorization":`${user.token_type} ${user.access_token}`,
        }
      }
      axios.get(
        url, config
      ).then(
        resp => this.saveUser(user, resp)
      )

      //
    }

    saveUser(user, resp){
     console.log ("SAVE USER");
     user["username"] = resp.data.identity;
     console.log("USER: ",user);
     this.AuthService.login (user);
     this.props.history.push('/')
    }

    tokenRequestFailed (login, error) {
      console.log ("REQUEST FAILED");
      console.log(error.response.data);

      const responseText = error.response.data;
      const responseSuccess = false;

      this.setState ({responseText, responseSuccess});
    }



    render() {

      return (
        <Container>
				  <Row className="justify-content-center">
            <Col md="6">
                <Card className="p-6">
                  {/* <CardHeader>
                  	Sign in with
                  </CardHeader> */}
                  <CardBody className="justify-content-center">
                    Signing in via Teskalabs
                  </CardBody>
                  {/* <CardFooter>

                  </CardFooter> */}
                </Card>
            </Col>
          </Row>
			  </Container>
      );
    }

  }


  export default TeskalabsAuth;
