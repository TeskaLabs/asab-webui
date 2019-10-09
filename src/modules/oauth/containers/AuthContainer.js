import React, { Component } from 'react'
import { Button, Card, CardBody, CardHeader, CardFooter, CardGroup, Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import OauthPopup from 'react-oauth-popup';

import requestToken from './TLAuth'


class AuthContainer extends React.Component {

    constructor(props) {
      super(props);
      this.AuthService =  this.props.app.locateService("AuthService");

      this.state = {};

      const responseType = "code";
      const clientID = "kapr";
      const scope = "openid%20profile&state=EqlqtwjhZZ6Vd41Z";
      //const redirect = "http%3A%2F%2Flocalhost:3000/auth";
      const redirect = "http%3A%2F%2Flocalhost:3000/teskalabs";
      const domain = "https://via.teskalabs.com/seacat-auth";
      this.teskalabsAuthProvider = `${domain}/authorization_endpoint/authentication_request?response_type=${responseType}&client_id=${clientID}&scope=${scope}&redirect_uri=${redirect}`;
    }

    s(code, elsething) {
      console.log("******* FUCNIKG DID IT ******");
      console.log ("code:",code);
      console.log (elsething);
      console.log(this);
      this.props.history.push(`/teskalabs?code=${code}`);

      console.log ("(***************************");
    }

    render() {
      return (
        <Container>
				  <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-6">
                  <CardHeader>
                  	Sign in with
                  </CardHeader>
                  <CardBody className="justify-content-center">
                    {/* <a href = {this.teskalabsAuthProvider}> */}
                    <OauthPopup
                      url = {this.teskalabsAuthProvider}
                      title = "Login with Teskalabs"
                      onCode = {this.s.bind(this)}
                    >
                      <Button
                        color="primary"
                      >
                        Teskalabs
                      </Button>
                    </OauthPopup>
                    {/* </a> */}
                  </CardBody>
                  <CardFooter>
                    Or you can
                    <Link to={`/register`}> register</Link>

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
