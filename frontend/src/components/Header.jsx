import React from "react";
import {Navbar, Container} from "react-bootstrap"
// header logged in
// header logged out

class Header extends React.Component {
  constructor(props) {
    super(props);
    
  }
  logout = (e) => {
    e.preventDefault()
    this.props.setLoggedIn(false)
    localStorage.removeItem("authToken")
    localStorage.removeItem("userdata")
  }
  render() {
    return (
      <>
        <Navbar variant="light" bg="light">
          <Container>
            <Navbar.Brand href="#home">Tatvasoft Practical</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              {
                this.props.loggedIn ? (
                  <p onClick={this.logout} style={{cursor: "pointer"}}>Logout</p>
                ) :
                ""
              }
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default Header;
