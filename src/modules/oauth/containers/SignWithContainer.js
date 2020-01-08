import React, { Component } from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import queryString from 'query-string'
import axios from 'axios'

class SignWithContainer extends React.Component {

    constructor(props) {
      super(props);
      console.log ("CONSTRUCTING SIGN WITH CONTAINER")
      this.AuthService =  this.props.app.locateService("AuthService");
    }

    async componentDidMount() {

      this.AuthService.login (user);


    }


    render() {

      return (
        <Container>
				  <Row className="justify-content-center">
            <Col md="6">
                <Card className="p-6">
                  {/* <CardHeader>
                  	Sign in with
                  </CardHeader> */}
                  <CardBody className="justify-content-center">
                    Signing in via GitHub
                  </CardBody>
                  {/* <CardFooter>

                  </CardFooter> */}
                </Card>
            </Col>
          </Row>
			  </Container>
      );
    }

  }


  export default SignWithContainer;
