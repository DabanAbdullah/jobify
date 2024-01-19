import { FormRow, Logo } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Link } from "react-router-dom";
import React, { useState } from "react";

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    location: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [passwordError, setPasswordError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(formData.confirmpassword);
    // Client-side validation
    if (formData.password !== formData.confirmpassword) {
      setPasswordError("Passwords do not match");

      return;
    }
    // Reset password error if validation passes
    setPasswordError("");

    // Continue with your registration logic here
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h4>Register</h4>

        <FormRow
          type="text"
          placeholder="First Name"
          LabelText="First Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        ></FormRow>

        <FormRow
          type="text"
          placeholder="Last Name"
          LabelText="Last Name"
          name="lastname"
          value={formData.lastname}
          onChange={handleInputChange}
        ></FormRow>

        <FormRow
          type="text"
          placeholder="Location"
          LabelText="Location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        ></FormRow>

        <FormRow
          type="email"
          placeholder="someone@example.com"
          LabelText="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        ></FormRow>

        <FormRow
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          LabelText="Password"
          placeholder="type your Password"
        />

        <FormRow
          type="password"
          name="confirmpassword"
          value={formData.confirmpassword}
          onChange={handleInputChange}
          LabelText="Confirm Password"
          placeholder="Confirm your Password"
        />

        {passwordError && <p className="error-message">{passwordError}</p>}

        <button type="submit" className="btn btn-block">
          submit
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
