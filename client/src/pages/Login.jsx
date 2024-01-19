import { FormRow, Logo } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Link } from "react-router-dom";
import React, { useState } from "react";

export const Login = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Login</h4>

        <FormRow
          type="text"
          placeholder="Email or Username"
          LabelText="Email"
          name="email"
        />

        <FormRow
          type="password"
          placeholder="type your password here"
          LabelText="Password"
          name="password"
        />

        <button type="submit" className="btn btn-block">
          Login
        </button>
        <button type="submit" className="btn btn-block">
          Explorer the App
        </button>
        <p>
          Dont have an account yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Login;
