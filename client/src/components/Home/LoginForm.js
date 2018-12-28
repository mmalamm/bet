import React, { Component } from "react";

const forms = {
  login: (
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
  ),
  register: (
    <form action="/auth/register" method="post">
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
  )
};

class LoginForm extends Component {
  state = {
    formType: "login"
  };
  toggleFormType = () => {
    this.setState(oldState => ({
      formType: oldState.formType === "login" ? "register" : "login"
    }));
  };
  render() {
    const { formType } = this.state;
    return (
      <div>
        {forms[formType]}
        {formType === "login" ? (
          <p>
            Don't have an account?{" "}
            <span onClick={this.toggleFormType}>Register</span>
          </p>
        ) : (
          <p>
            Already Registered? <span onClick={this.toggleFormType}>Login</span>
          </p>
        )}
      </div>
    );
  }
}

export default LoginForm;
