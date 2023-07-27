import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContext } from "../context/toast/ToastContext";

const SignUp = ({ toast }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});
  const [isloading, setIsLoading] = useState(false);
  const [visitedField, setVisitedField] = useState({});
  const navigate = useNavigate();

  const { notify } = useContext(ToastContext);

  useEffect(() => {
    const validateTimout = setTimeout(() => {
      validateForm();
    }, 1000);

    return () => {
      clearInterval(validateTimout);
    };
  }, [formData]);

  const validateForm = () => {
    const errorObj = {};

    if (formData.name) {
      if (formData.name.length < 3) {
        errorObj.name = "Name must be greater than 3 characters";
      }
    } else {
      delete formData.name;
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
      delete formData.email;
    }

    if (formData.password) {
      if (formData.password.length < 6) {
        errorObj.password = "Password must be greater than 6 characters";
      }
    } else {
      delete formData.password;
    }

    setErrors(errorObj);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/user/register",
          {
            method: "POST",
            type: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();

        if (data.success) {
          notify(data.msg, "success");

          setTimeout(() => {
            setIsLoading(false);
            navigate("/verifyEmail");
          }, 1000);
        } else {
          setIsLoading(false);
          notify(data.msg, "error");
        }
      } catch (error) {
        setIsLoading(false);
        notify("Something went wrong", "error");
      }
    } else {
      setIsLoading(false);
    }
  };

  const handleOnChange = (e) => {
    const inputObj = {};

    inputObj[e.target.name] = e.target.value;

    setFormData((prevState) => ({ ...prevState, ...inputObj }));
  };

  const handleOnVisit = (e) => {
    setVisitedField((prevState) => ({ ...prevState, [e.target.name]: 1 }));
  };

  return (
    <div className="form__container">
      <div className="form__container-header">
        <h2>Register Yourself 📝</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className={errors.name ? "input-error" : ""}
            type="text"
            name="name"
            placeholder="enter your name"
            onChange={handleOnChange}
            onClick={handleOnVisit}
            required
          />
        </div>
        {errors.name && <span className="field-error-msg">{errors.name}</span>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="enter your email"
            onChange={handleOnChange}
            onClick={handleOnVisit}
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
            placeholder="enter your password"
            onChange={handleOnChange}
            onClick={handleOnVisit}
            required
          />
        </div>
        {errors.password && (
          <span className="field-error-msg">{errors.password}</span>
        )}

        <div className="form-group">
          <button className="button" type="submit">
            {isloading ? "submitting..." : "Sign Up"}
          </button>
        </div>
      </form>
      <div>
        <p>
          Already have an account?
          <Link to={"/login"}>Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
