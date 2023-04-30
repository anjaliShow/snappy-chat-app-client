import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userRegister } from "../store/actions/authAction";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/ApiRoutes";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem("chat-app-current-user")) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, userName, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (userName.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 4) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, userName, password } = values;
      const { data } = await axios.post(registerRoute, {
        userName,
        email,
        password,
      });
      console.log("data", data);

      if (data.success === false) {
        toast.error(data.message, toastOptions);
      }
      if (data.success === true) {
        toast.success(data.message, toastOptions);
        localStorage.setItem(
          "chat-app-current-user",
          // JSON.stringify(data.newUser.email)
          JSON.stringify(data.newUser)
        );
        navigate("/set-avatar");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <div className="register">
          <div className="card">
            <div className="card-header">
              <h3>Sign Up</h3>
            </div>
            <div className="card-body">
              <form
                // onSubmit={register}
                onSubmit={(e) => handleSubmit(e)}
              >
                <div className="form-group">
                  <label htmlFor="username">Name</label>
                  <input
                    type="text"
                    placeholder="Your name..."
                    id="userName"
                    className="form-control"
                    // onChange={inputHandle}
                    name="userName"
                    // value={state.userName}
                    // onChange={(e) => setUserName(e.target.value)}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Email</label>
                  <input
                    type="email"
                    placeholder="Your email..."
                    id="email"
                    className="form-control"
                    // onChange={inputHandle}
                    name="email"
                    // value={state.email}
                    // onChange={(e) => setEmail(e.target.value)}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Password</label>
                  <input
                    type="password"
                    placeholder="Your password..."
                    id="password"
                    className="form-control"
                    // onChange={inputHandle}
                    name="password"
                    // value={state.password}
                    // onChange={(e) => setPassword(e.target.value)}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    id="confirm password"
                    className="form-control"
                    name="confirmPassword"
                    // onChange={inputHandle}
                    // value={state.confirmPassword}
                    // onChange={(e) => setConfirmPpassword(e.target.value)}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                {/* <div className="form-group">
                <div className="file-image">
                  <div className="image">
                    {loadImage ? <img src={loadImage} /> : ""}
                  </div>
                  <div className="file">
                    <label htmlFor="image">Select Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      name="image"
                      onChange={fileHandle}
                      // onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                </div>
              </div> */}
                <div className="form-group">
                  <input type="submit" value="register" className="btn" />
                </div>
                <div className="form-group">
                  <p>
                    <span>Already Register?</span> &nbsp;
                    <span>
                      <Link to="/login">Login</Link>
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

export default Register;

const FormContainer = styled.div`
  .register {
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("/bg.jpg");
    object-fit: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100vh;
    .card {
      .card-header {
        h3 {
          text-align: left;
          color: #fff;
          font-size: 25px;
        }
      }
      .card-body {
        .form-group {
          p {
            text-align: center;
            span {
              color: #b9b9b9;
              a {
                color: #fff;
              }
            }
          }
          .file-image {
            display: flex;
            .image {
              width: 50px;
              height: 50px;
              border-radius: 50%;
              border: 1px solid #fff;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            .file {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .form-control {
                display: none;
              }
              label {
                background-color: rgba(255, 255, 255, 0.148);
                border-radius: 20px;
                padding: 8px;
                margin-bottom: 0px;
                width: 120px;
                text-align: center;
                margin-left: 20px;
                border: 1px solid #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
  .card {
    width: 375px;
    padding: 15px 20px;
    backdrop-filter: blur(2px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.278);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.587);
    box-shadow: 0 8px 32px 0 rgba(246, 246, 246, 0.37);
  }
  .form-group {
    margin: 10px 0px;
    display: flex;
    flex-direction: column;
  }
  .form-control {
    padding: 12px;
    border: none;
    outline: none;
    background-color: #0a0e1585;
    border-radius: 5px;
    color: #fff;
    &::placeholder {
      color: #c0c0c0;
      font-weight: 400;
    }
  }
  label {
    margin-bottom: 5px;
    color: #fff;
    font-weight: 500;
  }
  .btn {
    outline: none;
    color: #111;
    text-transform: uppercase;
    padding: 12px;
    text-align: center;
    background-color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 5px;
    font-weight: 600;
  }
`;
