import React, { useEffect, useRef, useState } from "react";
import { BiSearch, BsThreeDots, FaEdit, SiAxios } from "react-icons/all";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { getAllUser, host } from "../utils/ApiRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

const Chat = () => {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [currenChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const setUser = async () => {
      if (!localStorage.getItem("chat-app-current-user")) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(localStorage.getItem("chat-app-current-user"))
        );
        setIsLoaded(!isLoaded);
      }
    };
    setUser();
  }, []);
  console.log("currentUser", currentUser);

  useEffect(() => {
    const getData = async () => {
      if (currentUser) {
        if (currentUser.isAavatarImageSet === false) {
          navigate("/set-avatar");
        } else {
          const req = `${
            currentUser?._id ? `${getAllUser}/${currentUser?._id}` : "" //we do this bcoz in 1st attempt it do'nt get an id so get error in  backend
          }`;
          // const data = await axios.get(`${getAllUser}/${currentUser?._id}`);
          const data = await axios.get(req);
          setContacts(data.data);
          navigate("/");
        }
      }
    };
    getData();
  }, [currentUser._id]);
  console.log("contacts", contacts);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  return (
    <>
      <Container>
        <div className="container">
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
          {isLoaded && currenChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer
              currenChat={currenChat}
              currentUser={currentUser}
              socket={socket}
            />
          )}
        </div>
      </Container>
    </>
  );
};

export default Chat;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    /* height: 85vh;
    width: 85vw; */
    height: 100vh;
    width: 100vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
