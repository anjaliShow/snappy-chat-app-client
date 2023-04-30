import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import axios from "axios";
import { getAllMessageRoute, sendMessageRoute } from "../utils/ApiRoutes";
import { v4 as uuidv4 } from "uuid";

const ChatContainer = ({ currenChat, currentUser, socket }) => {
  console.log("currenChat", currenChat);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const getAllMsg = async () => {
      const request = await axios.post(getAllMessageRoute, {
        from: currentUser?._id,
        to: currenChat?._id,
      });
      console.log("request all chats", request?.data);
      setMessages(request?.data);
    };
    getAllMsg();
  }, [currenChat]);
  // console.log("messages", messages);

  const handleSendMsg = async (msg) => {
    const mesg = await axios.post(sendMessageRoute, {
      from: currentUser?._id,
      to: currenChat?._id,
      message: msg,
    });
    // console.log("mesg", mesg);

    socket.current.emit("send-msg", {
      from: currentUser?._id,
      to: currenChat?._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket?.current) {
      socket?.current?.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  //this run all time when newArriaval msg get
  useEffect(() => {
    if (socket?.current) {
      socket?.current?.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <>
      <Container>
        <div className="chat-header">
          <div className="user-details">
            <div className="avatar">
              <img
                className="avatar__img"
                src={currenChat?.avatarImage}
                alt=""
              />
            </div>
            <div className="username">
              <p>{currenChat?.userName}</p>
            </div>
          </div>
          <Logout />
        </div>
        <div className="chat-messages">
          {messages?.length === 0 ? (
            <>
              <div className="no__message">
                <h1>No message</h1>
              </div>
            </>
          ) : (
            <>
              {messages?.map((message) => {
                return (
                  <div ref={scrollRef} key={uuidv4()}>
                    <div
                      // key={index}
                      className={`message ${
                        message.fromSelf ? "sended" : "recieved"
                      }`}
                    >
                      <div className="content">
                        <p>{message.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
        <ChatInput handleSendMsg={handleSendMsg} />
      </Container>
    </>
  );
};

export default ChatContainer;

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    height: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    background-color: #4f04ff21;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: 40px;
      .avatar {
        .avatar__img {
          height: 55px;
          width: 60px;
          border-radius: 40px;
          object-fit: contain;
          background-color: #d7d7d7;
        }
      }
      .username {
        p {
          color: white;
          letter-spacing: 1px;
          font-size: 22px;
          text-transform: capitalize;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .no__message {
      display: flex;
      justify-content: center;
      height: 100%;
      width: 100%;
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
