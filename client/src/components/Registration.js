import React from "react";

const Registration = props => {
  return (
    <form action="/register" method="post">
      <h1>Register</h1>
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
  );
};

export default Registration;
