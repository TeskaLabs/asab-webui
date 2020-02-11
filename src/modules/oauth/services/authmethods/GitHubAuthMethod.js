import React, { Component } from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import queryString from 'query-string'
import axios from 'axios'
import AbcAuthMethod from './AbcAuthMethod';

var public_url = self.origin;

export default class GitHubAuthMethod extends AbcAuthMethod {

    constructor(app, order) {
      const  serviceName = "GitHubAuthMethod"
      super(app, serviceName);
      this.AuthService = app.locateService("AuthService");
      this.Order = order;
    }

    getName() {
      return "GitHub"
    }

    async login(code) {
      console.log("GITHUB AUTH METHOD LOGIN")
      const respData = await this.requestToken(code);
      const user = this.parseTokenData(respData);
      const identity = await this.requestIdentity(user.token_type, user.access_token);
      user["username"] = identity;

      console.log(user);
      this.saveUser(user);
      this.AuthService.setActiveAuthMethod(this);
    }


    getButtonInfo() {
      const domain = "https://github.com/login/oauth/authorize";
      const params = {
        client_id: "20bf68701659753e6960",
        //scope: "openid profile",
        //state:"EqlqtwjhZZ6Vd41Z",
        redirect_uri: public_url + "/auth",
        //redirect_uri: "http://localhost:3000/auth/github",
      };
      const link = `${domain}?${queryString.stringify(params)}`;
      return {"link":link,"order":this.Order};
    }

    async requestToken(code) {
      console.log("REQUESTING TOKEN")


      if (code) {
        // console.log("GOT AUTHORIZATION CODE");
        // console.log("code: ",code);
        const url = "/token";

        const requestBody = {
          client_id: __CONFIG__.GITHUB_CLIENT_ID,
          client_secret: __CONFIG__.GITHUB_CLIENT_SECRET,
          code: code,
          redirect_uri: public_url + "/auth/github",
          state: "12354377234253745634"
        };

        const config = {
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-OAuthServerId': 'github.com',
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
      console.log(respData.content)
      const parsedRespData = queryString.parse(respData.content);
      // console.log('parsedRespData',parsedRespData)
      const user = {
        access_token: parsedRespData.access_token,
        scope:parsedRespData.scope,
        token_type: parsedRespData.token_type,
        auth_server: "github.com"
      };
      console.log(user);
      return user
    }


    async requestIdentity(tokenType,accessToken) {
      console.log("REQUEST IDENTITY");

      const url = '/identity';

      const config = {
        headers:{
          'X-OAuthServerId': 'github.com',
          "Authorization":`${tokenType} ${accessToken}`,
        }
      };
      const resp = await axios.get(url, config);
      // console.log(resp.data);
      const identity = resp.data.content.login;
      return identity;
    }
  }

