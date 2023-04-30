import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userRegister } from "../store/actions/authAction";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  registerRoute,
  getAvatarRoute,
  setAvatarRoute,
} from "../utils/ApiRoutes";
import axios from "axios";
import loader from "../assets/loader.gif";
import { Buffer } from "buffer";

const SetAvatar = () => {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  console.log("selectedAvatar", selectedAvatar);
  console.log("avatars[selectedAvatar]", avatars[selectedAvatar]);

  //check user exist in localtorage or not, if not exist then send them for login
  useEffect(() => {
    if (!localStorage.getItem("chat-app-current-user")) {
      navigate("/login");
    }
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem("chat-app-current-user")
      );
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        avatarImage: selectedAvatar,
      });

      console.log("data", data);

      if (data.isSet) {
        user.isAavatarImageSet = true;
        user.avatarImage = data.avatarImage;
        localStorage.setItem("chat-app-current-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar");
      }
    }
  };

  useEffect(() => {
    async function fetchAvatars() {
      const selectedImages = [];

      const image = await axios.get(getAvatarRoute);
      // console.log("image", image.data);

      while (selectedImages.length < 4) {
        const randomIndex = Math.floor(Math.random() * image.data.length);
        const images = image.data[randomIndex];
        if (!selectedImages.includes(images)) {
          selectedImages.push(images);
        }
      }

      setAvatars(selectedImages);
      setIsLoading(false);
    }

    fetchAvatars();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === avatar.avatarImage ? "selected" : ""
                  }`}
                  key={avatar._id}
                >
                  <img
                    className="avatar__image"
                    src={avatar.avatarImage}
                    alt="avatar"
                    key={avatar._id}
                    onClick={() => setSelectedAvatar(avatar.avatarImage)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
};

export default SetAvatar;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;

      .avatar__image {
        height: 100px;
        width: 100px;
        transition: 0.5s ease-in-out;
        border-radius: 50px;
        object-fit: contain;
        background-color: #d7d7d7;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
