import React from "react";
import { Navbar, Container } from "react-bootstrap";
// header logged in
// header logged out

class Footer extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <>
        <Navbar expand="lg" variant="light" bg="light" fixed="bottom">
          <Container>
            <Navbar.Brand href="#">Navbar</Navbar.Brand>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default Footer;
