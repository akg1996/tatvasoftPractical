import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { message } from "antd";
import validator from "validator";
import axios from "../config/axios";
import 'antd/dist/antd.css';
// header logged in
// header logged out

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { email, password } = this.state;
    if (email == "" || password == "") {
      message.error("Please fill all the fields");
    } else if(!validator.isEmail(email)) {
      message.error("Invalid email");
    }
    else {
      let data = {email, password}
      axios.post('/login', data).then((res) => {
        console.log("response", res)
        if(res.data.success) {
          localStorage.setItem("authToken", res.data.token)
          localStorage.setItem("userdata", JSON.stringify(res.data.userData))
          this.props.setLoggedIn(true)
        }
        else {
          message.error(res.data.message)
        }
      }).catch((err) => {
        console.log("err", err)
      })
    }
  };

  render() {
    return (
      <>
        <Container style={{ width: "500px" }}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control name="email" type="email" placeholder="Enter email" onChange={this.onChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" type="password" placeholder="Password" onChange={this.onChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </>
    );
  }
}

export default Login;
