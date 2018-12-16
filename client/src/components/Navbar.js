import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ loggedIn }) =>
  loggedIn ? (
    <form action="/api/logout">
      <input type="submit" value="Log Out"></input>
    </form>
  ) : (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login/">login</Link>
        </li>
        <li>
          <Link to="/register/">register</Link>
        </li>
      </ul>
    </nav>
  );

export default Navbar;
