import React, { Component } from 'react'
import { Button, ButtonGroup, ButtonToolbar,Card, CardBody, CardHeader, CardFooter, CardGroup, Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import OauthPopup from 'react-oauth-popup';
import queryString from 'query-string'


class AuthContainer extends React.Component {

    constructor(props) {
      super(props);
      this.AuthService =  this.props.app.locateService("AuthService");


      this.state = {};

      const TLdomain = "https://via.teskalabs.com/seacat-auth";
      const TLendpoint = "/authorization_endpoint/authentication_request"
      const TLparams = {
        response_type:"code",
        client_id: "???",
        scope: "openid profile",
        state:"EqlqtwjhZZ6Vd41Z",
        redirect_uri: "http://localhost:3000/auth/teskalabs",
      };
      this.TeskalabsURL = `${TLdomain}${TLendpoint}?${queryString.stringify(TLparams)}`

      // console.log("================================")
      // //console.log (queryString.stringify(t))
      // console.log(this.TeskalabsURL)
      // console.log("================================")



      const GHdomain = "https://github.com/login/oauth/authorize";
      const GHparams = {
        client_id: "20bf68701659753e6960",
        //scope: "openid profile",
        //state:"EqlqtwjhZZ6Vd41Z",
        redirect_uri: "http://localhost:3000/auth/github",
      };
      this.GitHubURL = `${GHdomain}?${queryString.stringify(GHparams)}`

    }

    onTeskalabs(code) {
      console.log ("code:",code);
      this.props.history.push(`/auth/teskalabs?code=${code}`);
    }

    onGitHub(code) {
      console.log ("code:",code);
      this.props.history.push(`/auth/github?code=${code}`);
    }

    render() {

      const links = this.AuthService.getAuthLinks();
      console.log (links)

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
                    {/* <a href = {this.teskalabsAuthProvider}> */}
                    {/* <ButtonToolbar> */}
                    {/* <ButtonGroup> */}
                        <OauthPopup
                          url = {this.TeskalabsURL}
                          title = "Login with Teskalabs"
                          onCode = {this.onTeskalabs.bind(this)}
                        >
                          <Button className="tlbtn" size="lg" block>
                            Teskalabs
                          </Button>
                        </OauthPopup>
                        <OauthPopup
                          url = {this.GitHubURL}
                          title = "Login with GitHub"
                          onCode = {this.onGitHub.bind(this)}
                        >
                          <br/>
                          <Button className="githubbtn" size="lg"  block>
                            GitHub
                          </Button>
                        </OauthPopup>
                      {/* </ButtonGroup> */}
                    {/* </ButtonToolbar> */}
                    {/* </a> */}
                  </CardBody>
                  <CardFooter>
                    Or you can
                    <Link to={`/auth/register`}> register</Link>

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
