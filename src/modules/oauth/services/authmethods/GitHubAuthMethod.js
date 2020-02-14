import React, { Component } from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import queryString from 'query-string'
import axios from 'axios'
import AbcAuthMethod from './AbcAuthMethod';

var PUBLIC_URL = self.origin;

export default class GitHubAuthMethod extends AbcAuthMethod {

    constructor(app, order) {
      const  serviceName = "GitHubAuthMethod"
      super(app, serviceName);
      this.AuthService = app.locateService("AuthService");
      this.Order = order;
      this.MethodName = "GitHub"
      this.MethodUrlId = "github.com"
    }

    async login(code) {
      console.log("GITHUB AUTH METHOD LOGIN")
      const respData = await this.requestToken(code);
      const tokenData = this.parseTokenData(respData);
      const identity = await this.requestIdentity(tokenData.token_type, tokenData.access_token);
      const userCredentials = this.parseIdentityData(identity, tokenData);


      // console.log(user);
      this.saveUser(userCredentials, identity);
      this.AuthService.setActiveAuthMethod(this);
    }

    parseIdentityData (identity, userCredentials) {
      userCredentials["username"] = identity.login
      return userCredentials
    }

    saveUser(userCredentials, identity){
      super.saveUser(identity);
      this.saveCredentialsToLocalStorage(userCredentials);
    }

    async saveCredentialsToLocalStorage(userCredentials) {
      localStorage.setItem("access_token", userCredentials.access_token);
      localStorage.setItem("token_type", userCredentials.token_type);
      localStorage.setItem("username", userCredentials.username);
      localStorage.setItem("auth_server", this.getName());
      localStorage.setItem("auth_server_url", this.getUrlId());
      console.log("saveCredentialsToLocalStorage DONE");
    }


    getButtonInfo() {
      const domain = "https://github.com/login/oauth/authorize";
      const params = {
        client_id: "20bf68701659753e6960",
        //scope: "openid profile",
        //state:"EqlqtwjhZZ6Vd41Z",
        redirect_uri: PUBLIC_URL + "/auth",
        //redirect_uri: "http://localhost:3000/auth/github",
      };
      const link = `${domain}?${queryString.stringify(params)}`;
      return {"link":link,"order":this.Order};
    }

    async requestToken(code) {
      console.log("REQUESTING TOKEN")


      if (code) {
        const url = "/token";

        const requestBody = {
          client_id: __CONFIG__.GITHUB_CLIENT_ID,
          client_secret: __CONFIG__.GITHUB_CLIENT_SECRET,
          code: code,
          redirect_uri: PUBLIC_URL + "/auth/github",
          state: "12354377234253745634"
        };

        const config = {
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-OAuthServerId': this.MethodUrlId,
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
      const parsedRespData = queryString.parse(respData.content);
      // console.log('parsedRespData',parsedRespData)
      const userCredentials = {
        access_token: parsedRespData.access_token,
        scope:parsedRespData.scope,
        token_type: parsedRespData.token_type,
        auth_server_url: this.getUrlId(),
        auth_server: this.getName()
      };
      // console.log(userCredentials);
      return userCredentials
    }


    async requestIdentity(tokenType, accessToken) {
      console.log("REQUEST IDENTITY");

      const url = '/identity';
      const config = {
        headers:{
          'X-OAuthServerId': this.MethodUrlId,
          "Authorization":`${tokenType} ${accessToken}`,
        }
      };
      const resp = await axios.get(url, config).catch((error)=>{
        console.log("error", error)
      });

      if (resp == undefined) {
        return null
      }
      const identity = resp.data.content;
      return identity;
    }

  }

