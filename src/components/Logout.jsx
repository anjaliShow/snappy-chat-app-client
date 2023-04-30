import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Logout = () => {
  const navigate = useNavigate();

  //Logout
  const handleLogout = () => {
    localStorage.removeItem("chat-app-current-user");
    navigate("/login");
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default Logout;

const Button = styled.button`
  display: flex;
  color: #ebe7ff;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  margin-top: 40px;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
