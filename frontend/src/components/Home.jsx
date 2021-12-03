import React from "react";
import { Navbar, Container, Table } from "react-bootstrap";
import { message } from "antd";
import 'antd/dist/antd.css';
import axios from "../config/axios";
// header logged in
// header logged out

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      userDetails: [],
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = () => {
    console.log("fetchuser calling")
    axios.get("/fetch-users").then((res) => {
      console.log(res)
      if(res.data.success) {
        this.setState({
          userDetails: res.data.data
        })
      }
      else {
        message.error("Error while fetching users")
      }
    }).catch((err) => {
      console.log(err)
    })
  };

  render() {
    let {userDetails} = this.state
    return (
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>City</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {userDetails && userDetails.map((each, i) => {
              return (
                <tr key={i}>
              <td>1</td>
              <td>{each.firstName}</td>
              <td>{each.lastName}</td>
              <td>{each.email}</td>
              <td>{each.role}</td>
              <td>{each.city}</td>
              <td>{each.state}</td>
              
            </tr>
              )
            })}
          </tbody>
        </Table>
      </>
    );
  }
}

export default Home;
