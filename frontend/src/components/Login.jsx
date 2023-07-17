import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ toast }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigate();

  const validateFormData = () => {
    const errorObj = {};

    if (formData.password) {
      if (formData.password.length < 6) {
        errorObj.password = "Password must be greater than 6 characters";
      }
    } else {
      delete errorObj.password;
    }

    if (formData.email) {
      if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          formData.email
        )
      ) {
        errorObj.email = "Please provide a valid email";
      }
    } else {
      delete errorObj.email;
    }

    setErrors((prevState) => ({ ...errorObj }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/v1/user/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        type: "cors",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      const { success, msg } = data;

      if (success) {
        toast(msg, "success");

        localStorage.setItem("token", data.token);

        setFormData({});
        setErrors({});
        setIsLoading(false);
        navigation("/main");
      } else {
        setIsLoading(false);
        toast(msg, "error");
        if (msg === "Email Not Verified") {
          navigation("/verifyEmail");
        }
      }
    } catch (error) {
      setIsLoading(false);
      toast("something went wrong", "error");
    }
  };

  const handleOnChange = (e) => {
    const inputObj = {};
    inputObj[e.target.name] = e.target.value;

    setFormData((prevState) => ({ ...prevState, ...inputObj }));
    validateFormData();
  };

  return (
    <div className="form__container">
      <div className="form__container-header">
        <h2>Welcome Back👋</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleOnChange}
            value={formData.email || ""}
            placeholder="enter your email"
            required
          />
        </div>
        {errors.email && (
          <span className="field-error-msg">{errors.email}</span>
        )}

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleOnChange}
            value={formData.password || ""}
            placeholder="enter your password"
            required
          />
        </div>
        {errors.password && (
          <span className="field-error-msg">{errors.password}</span>
        )}

        <div className="form-group">
          <button className="button" type="submit">
            {isLoading ? "Logging In..." : "Log In"}
          </button>
        </div>
      </form>
      <div>
        <p>
          Not have an account?
          <Link to={"/signup"}>Sign Up</Link>
        </p>

        <p>Forgot password</p>
      </div>
    </div>
  );
};

export default Login;
