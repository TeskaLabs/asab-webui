import React, { Component } from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import queryString from 'query-string'
import axios from 'axios'
import Service from '../../../../abc/Service'

export default class AbcAuthMethod extends Service {

  constructor(app, name, url) {
    super(app, name);
    this.AuthService =  app.locateService("AuthService");
    this.MethodName = "method name not implemented in specific Auth Method"
    this.MethodUrlId = "method url id not implemented in specific Auth Method"
  }

  getName() {
    return this.MethodName;
  }

  getUrlId() {
    return this.MethodUrlId
  }

  saveUser(user) {
    // TODO: implement saving additional user data in redux
    console.log("SAVING USER DATA")
    // this.App.Store.dispatch(loginAction(user));

  }

  logout() {
      const userCredentials = this.AuthService.getUserCredentials();

      if (userCredentials.refresh_token){
        this.revokeRequest(
          userCredentials.token_type,
          userCredentials.auth_server_url,
          userCredentials.access_token,
          userCredentials.refresh_token
        );
      }
      this.revokeRequest(
        userCredentials.token_type,
        userCredentials.auth_server_url,
        userCredentials.access_token,
        userCredentials.access_token
      );
      this.removeUserFromStore()

  }

  removeUserFromStore() {
    this.App.Store.dispatch(logoutAction());
  }


  async revokeRequest(tokenType, authServerUrl, accessToken,tokenToRevoke) {

    console.log("REVOKING REQUEST")
    const url = "/invalidate";
    const requestBody = {
        "token":tokenToRevoke,
    };
    const bodyString = queryString.stringify(requestBody);
    console.log("bodyString", bodyString);

    const config = {
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-OAuthServerId': authServerUrl,
            'Authorization': `${tokenType} ${accessToken}`,
        }
    }

    const respData = await axios.post(url, bodyString, config);
    console.log(respData.status == 200 ? "TOKEN INVALIDATED" : `LOGOUT FAILED: ${respData.status}`);

  }
}


function loginAction(payload) {
    return {
        type:"LOGIN",
        payload:payload,
    }
}


function logoutAction() {
    return {
        type:"LOGOUT",
    }
}
