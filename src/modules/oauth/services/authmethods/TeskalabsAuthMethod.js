import React, { Component } from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import queryString from 'query-string'
import axios from 'axios'
import AbcAuthMethod from './AbcAuthMethod';

export default class TeskalabsAuthMethod extends AbcAuthMethod {

    constructor(app, order) {
      const  serviceName = "TeskalabsAuthMethod"
      super(app, serviceName);
      this.AuthService = app.locateService("AuthService");
      this.Order = order;
      this.Url = "teskalabs.com";
      this.MethodName = "Teskalabs";
    }


    async login(code) {
      console.log("TESKALABS AUTH METHOD LOGIN")
      const respData = await this.requestToken(code);
      const user = this.parseTokenData(respData);
      const identity = await this.requestIdentity(user.token_type, user.access_token);
      user["username"] = identity;

      console.log(user);
      this.saveUser(user);
      this.AuthService.setActiveAuthMethod(this);

    }


    getButtonInfo() {
      const domain = "https://via.teskalabs.com/seacat-auth";
      const endpoint = "/authorization_endpoint/authentication_request"
      const params = {
        response_type:"code",
        client_id: "???",
        scope: "openid profile",
        state:"EqlqtwjhZZ6Vd41Z",
        redirect_uri: "http://localhost:3000/auth/",
      };
      const link = `${domain}${endpoint}?${queryString.stringify(params)}`;
      console.log("link: ", link);
      return {"link":link,"order":this.Order};
    }

    async requestToken(code) {
      console.log("REQUESTING TOKEN")

      if (code) {
        console.log("GOT AUTHORIZATION CODE");
        // console.log("code: ",code);
        const url = "/token";

        const requestBody = {
          'response_type': 'code',
          'client_id': 'kapr',
          'scope': '?',
          'grant_type': 'authorization_code',
          'redirect_uri':"http://localhost:3000/auth/",
          'client_secret': 'secret',
          'state': "?????",
          'code': code,
        };

        const config = {
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-OAuthServerId': this.Url,
          }
        };

        const resp = await axios.post(url, queryString.stringify(requestBody), config)
        // console.log(resp.data)
        const respData = resp.data
        return respData
      }
    }



    parseTokenData(respData) {
      console.log("REQUEST SUCCESSFUL");
      // console.log(respData.content)
      const user = {
        access_token: respData.content.access_token,
        expires_in: respData.content.expires_in,
        refresh_token: respData.content.refresh_token,
        token_id: respData.content.token_id,
        token_type: respData.content.token_type,
        auth_server: this.Url,
      };
      console.log(user);
      return user
    }


    async requestIdentity(tokenType,accessToken) {
      console.log("REQUEST IDENTITY");

      const url = '/identity';

      const config = {
        headers:{
          'X-OAuthServerId': this.Url,
          "Authorization":`${tokenType} ${accessToken}`,
        }
      };
      const resp = await axios.get(url, config);
      // console.log(resp.data);
      const identity = resp.data.content.identity;
      return identity;
    }
  }

