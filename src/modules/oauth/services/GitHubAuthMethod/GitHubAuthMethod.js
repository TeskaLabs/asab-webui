import React, { Component } from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import queryString from 'query-string'
import axios from 'axios'
import AbcAuthMethod from '../AbcAuthMethod';

export default class GitHubAuthMethod extends AbcAuthMethod {

    constructor(app) {
      const  serviceName = "GitHubAuthMethod"
      super(app, serviceName, props);
    }

    async login() {
      const respData = await this.requestToken();
      const user = this.parseTokenData(respData);
      const identity = await this.requestIdentity(user.token_type, user.access_token);
      user["username"] = identity;

      console.log(user);
      this.saveUser(user);
      this.props.history.push('/')

    }


    getLink () {
      const domain = "https://github.com/login/oauth/authorize";
      const params = {
        client_id: "20bf68701659753e6960",
        //scope: "openid profile",
        //state:"EqlqtwjhZZ6Vd41Z",
        redirect_uri: "http://localhost:3000/auth/github",
      };
      return `${domain}?${queryString.stringify(params)}`
    }

    async requestToken() {
      const urlParams = queryString.parse(this.props.location.search);


      if (urlParams.code) {
        console.log ("GOT AUTHORIZATION CODE");
        console.log("code: ",urlParams.code);
        const url = "/token";

        const requestBody = {
          'client_id': __CONFIG__.GITHUB_CLIENT_ID,
          'client_secret': __CONFIG__.GITHUB_CLIENT_SECRET,
          'code': urlParams.code,
          'redirect_uri':"http://localhost:3000/auth/github",
          'state': "12354377234253745634"
        };

        const config = {
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-OAuthServerId': 'github.com',
          }
        };

        const resp = await axios.post(url, queryString.stringify(requestBody), config)
        console.log (resp.data)
        const respData = resp.data
        return respData
      }
    }



    parseTokenData (respData) {
      console.log ("REQUEST SUCCESSFUL");
      console.log (respData)
      const parsedRespData = queryString.parse(respData);
      const user = {
        access_token: parsedRespData.access_token,
        scope:parsedRespData.scope,
        token_type: parsedRespData.token_type,
        auth_server: "github.com"
      };
      console.log(user);
      return user
    }


    async requestIdentity (tokenType,accessToken) {
      console.log ("REQUEST IDENTITY");

      const url = '/identity';

      const config = {
        headers:{
          'X-OAuthServerId': 'github.com',
          "Authorization":`${tokenType} ${accessToken}`,
        }
      };
      const resp = await axios.get(url, config);
      console.log (resp.data);
      const identity = resp.data.login;
      return identity;
    }
  }

