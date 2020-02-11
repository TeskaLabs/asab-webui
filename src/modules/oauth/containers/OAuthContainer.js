import React, { Component } from 'react'
import { Button, ButtonGroup, ButtonToolbar,Card, CardBody, CardHeader, CardFooter, CardGroup, Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import OauthPopup from 'react-oauth-popup';
import queryString from 'query-string'


export default class OAuthContainer extends React.Component {

    constructor(props) {
      super(props);
      this.AuthService =  this.props.app.locateService("AuthService");

      this.RedirectRoute = this.AuthService.getRedirectRoute();
      this.RegisterAllowed = this.AuthService.getRegisterAllowed();

      this.state = {
        buttons: [],
      };
    }

    async onCode(key, code){
      await this.AuthService.login(key, code);
      this.props.history.push(this.RedirectRoute);
    }

    componentDidMount() {
      if (this.AuthService.loggedIn()){
        this.props.history.push(this.RedirectRoute);
      }

      const links = this.AuthService.getButtonsInfo();
      const buttons = Object.keys(links)
      .sort((a, b) => { return a.order - b.order})
      .map((key)=> {
          return (
            <OauthPopup
              key = {links[key].order}
              url = {links[key].link}
              title = {key}
              onCode = {(code) => this.onCode(key, code)}
            >
              <Button className="loginBtn" size="lg" block>
                {key}
              </Button>
            </OauthPopup>
          )
        }
      )
      this.setState({buttons})
    }

    render() {
      const buttons = this.state.buttons;

      return (
        <Container>
				  <Row className="justify-content-center">
            <Col md="5">
              <CardGroup>
                <Card className="p-6">
                  <CardHeader>
                  	<h4>Sign in with</h4>
                  </CardHeader>
                  <CardBody className="justify-content-center">
                        {buttons}
                  </CardBody>
                  {this.RegisterAllowed ?
                    <CardFooter>
                      Or you can
                      <Link to={`/auth/register`}> register</Link>
                    </CardFooter>
                  : null}
                </Card>
              </CardGroup>
            </Col>
          </Row>
			  </Container>
      );
    }
  }

