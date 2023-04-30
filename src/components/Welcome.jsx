import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
// import loader from "../";

const Welcome = ({ currentUser }) => {
  //     const [userName, setUserName] = useState("");
  //   useEffect(async () => {
  //     setUserName(
  //       await JSON.parse(
  //         localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  //       ).username
  //     );
  //   }, []);
  return (
    <>
      <Container>
        <img src={Robot} alt="" />
        <h1>
          Welcome, <span>{currentUser?.userName}</span>
        </h1>
        <p>Please select a chat to Start messaging.</p>
      </Container>
    </>
  );
};

export default Welcome;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
  p {
    font-size: 20px;
  }
`;
