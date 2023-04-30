import axios from "axios";

export const userRegister = (data) => {
  return async (dispatch) => {
    // const config = {
    //   headers: {
    //     // "Content-Type": "application/json",
    //     "Content-Type": "application/formdata",
    //   },
    // };
    try {
      const request = await axios.post(
        "http://localhost:8000/api/messanger/user-register",
        data
        // config
      );

      console.log("data", data);
      console.log("request", request);
    } catch (error) {
      console.log("thunk error", error.response.data);
    }
  };
};
export const userLogin = (data) => {
  return async (dispatch) => {
    try {
      const request = await axios.post(
        "http://localhost:8000/api/messanger/user-login",
        data
      );
      console.log("request", request.data.message);
      console.log("data", data);
      localStorage.setItem("user", request.data.user);
    } catch (error) {
      console.log("thunk error", error.response.data);
    }
  };
};
