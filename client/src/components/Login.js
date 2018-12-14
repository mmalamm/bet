import React from "react";

const Login = props => (
  <div>
    <form action="/auth/local" method="post">
      <h1>Login</h1>
      <div>
        <label>Username:</label> <input type="text" name="username" />
        <br />
      </div>
      <div>
        <label>Password:</label> <input type="password" name="password" />
      </div>
      <div>
        <input type="submit" value="Submit" />
      </div>
    </form>
  </div>
);

export default Login;
