import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("authToken")))
  return (
    <Router>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} userData={JSON.parse(localStorage.getItem("userdata"))}/>

        {loggedIn ? <Home /> : <Login setLoggedIn={setLoggedIn}/>}

      <Footer />
    </Router>
  );
}

export default App;
