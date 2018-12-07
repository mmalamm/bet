import React from "react";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Registration from "./components/Registration";

import "./App.css";

const Index = () => <h2>Home</h2>;

const AppRouter = () => (
  <Router>
    <div>
      <Navbar />

      <Route path="/" exact component={Index} />
      <Route path="/login/" component={Login} />
      <Route path="/register/" component={Registration} />
    </div>
  </Router>
);

export default AppRouter;
