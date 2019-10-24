import React, { Component } from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import queryString from 'query-string'
import axios from 'axios'
import Service from '../../../abc/Service'

export default class AbcAuthMethod extends Service {

  constructor(app, name) {
    super(app, name);
    this.AuthService =  app.locateService("AuthService");
  }

  saveUser(user) {
    this.App.Store.dispatch(loginAction(user));
  }

  forgetUser() {
      const user = this.App.Store.getState().AuthService;

      this.revokeRequest(user.token_type, user.auth_server, user.access_token,  user.refresh_token);
      this.revokeRequest(user.token_type, user.auth_server, user.access_token,  user.access_token);
      this.App.Store.dispatch(logoutAction());
  }


  async revokeRequest (tokenType, authServer, accessToken,tokenToRevoke) {

      const url = "/invalidate";
      const requestBody = {
          "token":tokenToRevoke,
      }
      const bodyString = queryString.stringify(requestBody)

      const config = {
          headers:{
              'Content-Type': 'application/x-www-form-urlencoded',
              'X-OAuthServerId': authServer,
              'Authorization': `${tokenType} ${accessToken}`,
          }
      }

      const respData = await axios.post(url, bodyString, config);
      console.log (respData.status == 200 ? "TOKEN INVALIDATED" : `LOGOUT FAILED: ${respData.status}`);

  }


    // render() {

    //   return (
    //     <Container>
	// 			  <Row className="justify-content-center">
    //         <Col md="6">
    //             <Card className="p-6">
    //               {/* <CardHeader>
    //               	Sign in with
    //               </CardHeader> */}
    //               <CardBody className="justify-content-center">
    //                 Signing in via GitHub
    //               </CardBody>
    //               {/* <CardFooter>

    //               </CardFooter> */}
    //             </Card>
    //         </Col>
    //       </Row>
	// 		  </Container>
    //   );
    // }

}


function loginAction (payload) {
    return {
        type:"LOGIN",
        payload:payload,
    }
}


function logoutAction () {
    return {
        type:"LOGOUT",
    }
}
