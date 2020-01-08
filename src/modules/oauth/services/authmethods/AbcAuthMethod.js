import React, { Component } from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import queryString from 'query-string'
import axios from 'axios'
import Service from '../../../../abc/Service'

export default class AbcAuthMethod extends Service {

  constructor(app, name) {
    super(app, name);
    this.AuthService =  app.locateService("AuthService");
  }

  getName() {
    return this.MethodName;
  }

  saveUser(user) {
    this.App.Store.dispatch(loginAction(user));
  }

  logout() {
      const user = this.App.Store.getState().AuthService;

      this.revokeRequest(user.token_type, user.auth_server, user.access_token,  user.refresh_token);
      this.revokeRequest(user.token_type, user.auth_server, user.access_token,  user.access_token);
      this.App.Store.dispatch(logoutAction());
  }


  async revokeRequest(tokenType, authServer, accessToken,tokenToRevoke) {

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
            'X-OAuthServerId': authServer,
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
