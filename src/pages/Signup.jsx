import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userRegister } from '../store/actions/authAction';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerRoute } from '../utils/ApiRoutes';
import axios from 'axios';
import Logo from '../assets/logo.svg';

const Signup = () => {
  const navigate = useNavigate();
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };
  const [values, setValues] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (localStorage.getItem('chat-app-current-user')) {
      navigate('/');
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // const handleValidation = () => {
  //   const { password, confirmPassword, userName, email } = values;
  //   if (password !== confirmPassword) {
  //     toast.error(
  //       "Password and confirm password should be same.",
  //       toastOptions
  //     );
  //     return false;
  //   } else if (userName.length < 3) {
  //     toast.error(
  //       "Username should be greater than 3 characters.",
  //       toastOptions
  //     );
  //     return false;
  //   } else if (password.length < 4) {
  //     toast.error(
  //       "Password should be equal or greater than 8 characters.",
  //       toastOptions
  //     );
  //     return false;
  //   } else if (email === "") {
  //     toast.error("Email is required.", toastOptions);
  //     return false;
  //   }

  //   return true;
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (handleValidation()) {
    const { email, userName, password } = values;
    const { data } = await axios.post(registerRoute, {
      userName,
      email,
      password,
    });
    console.log('data', data);

    if (data.success === false) {
      toast.error(data.message, toastOptions);
    }
    if (data.success === true) {
      toast.success(data.message, toastOptions);
      localStorage.setItem(
        'chat-app-current-user',
        // JSON.stringify(data.newUser.email)
        JSON.stringify(data.newUser)
      );
      navigate('/set-avatar');
    }
    // }
  };

  return (
    <>
      <>
        <FormContainer>
          <form action="" onSubmit={(event) => handleSubmit(event)}>
            <div className="brand">
              <img src={Logo} alt="logo" />
              <h1>snappy</h1>
            </div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={(e) => handleChange(e)}
            />
            <button type="submit">Create User</button>
            <span>
              Already have an account ? <Link to="/login">Login.</Link>
            </span>
          </form>
        </FormContainer>
        <ToastContainer />
      </>
      <ToastContainer />
    </>
  );
};

export default Signup;

const FormContainer = styled.div`
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    width: 100%;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
