import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../store/actions/authAction";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/ApiRoutes";
import axios from "axios";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const dispatch = useDispatch();

  // const loginHandle = (e) => {
  //   e.preventDefault();
  //   const data = {
  //     email: email,
  //     password: password,
  //   };

  //   dispatch(userLogin(data));
  // };

  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-current-user")) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { email, password } = values;
    if (email === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      if (validateForm()) {
        const { email, password } = values;
        const { data } = await axios.post(loginRoute, {
          email,
          password,
        });
        if (data.success === false) {
          toast.error(data.message, toastOptions);
        }
        if (data.success === true) {
          localStorage.setItem(
            "chat-app-current-user",
            JSON.stringify(data.user)
          );

          navigate("/");
        }
      }
    } catch (error) {
      toast.error(error, toastOptions);
      console.log("login error", error);
    }
  };

  // const handleLogin = async (event) => {
  //   event.preventDefault();
  //   if (validateForm()) {
  //     const { email, password } = values;
  //     await axios
  //       .post(loginRoute, {
  //         email,
  //         password,
  //       })
  //       .then((data) => {
  //         if (data.success === false) {
  //           toast.error(data.message, toastOptions);
  //         }
  //         if (data.success === true) {
  //           localStorage.setItem(
  //             "chat-app-current-user",
  //             JSON.stringify(data.user)
  //           );

  //           navigate("/");
  //         }
  //       })
  //       .catch((error) => {
  //         toast.error(error.response.data.message, toastOptions);
  //         console.log("login error", error);
  //       });
  //   }
  // };

  return (
    <>
      <FormContainer>
        <div className="register">
          <div className="card">
            <div className="card-header">
              <h3>Log In</h3>
            </div>
            <div className="card-body">
              <form onSubmit={(event) => handleLogin(event)}>
                <div className="form-group">
                  <label htmlFor="username">Email</label>
                  <input
                    type="email"
                    placeholder="Your email..."
                    id="email"
                    name="email"
                    className="form-control"
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
                    name="password"
                    // onChange={(e) => setPassword(e.target.value)}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="form-group">
                  <input type="submit" value="login" className="btn" />
                </div>
                <div className="form-group">
                  <p>
                    <span>Not Registered?</span> &nbsp;
                    <span>
                      <Link to="/register">Signup</Link>
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </FormContainer>
    </>
  );
};

export default Login;

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
