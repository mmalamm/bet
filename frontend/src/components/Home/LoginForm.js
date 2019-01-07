import React, { Component, Fragment } from "react";

class LoginForm extends Component {
  state = {
    formType: this.props.c || "login"
  };
  toggleFormType = () => {
    this.setState(oldState => ({
      formType: oldState.formType === "login" ? "register" : "login"
    }));
  };
  render() {
    const { formType } = this.state;
    const isLoginForm = formType === "login";
    return (
      <Fragment>
        {
          <form
            action={isLoginForm ? "/auth/local" : "/auth/register"}
            method="post"
          >
            <h1>{isLoginForm ? "Login" : "Register"}</h1>
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
        }
        <p>
          {isLoginForm ? "Don't have an account? " : "Already Registered? "}
          <span onClick={this.toggleFormType}>
            {isLoginForm ? "Register" : "Log In"}
          </span>
        </p>
      </Fragment>
    );
  }
}

export default LoginForm;
