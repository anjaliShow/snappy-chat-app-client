// export const host = "http://localhost:8000";
export const host = 'https://snappy-chat-app-server.onrender.com';

export const registerRoute = `${host}/api/auth/user-register`;
export const loginRoute = `${host}/api/auth/user-login`;
export const setAvatarRoute = `${host}/api/auth/set-user-avatars`;
export const getAllUser = `${host}/api/auth/all-users`;
export const getAvatarRoute = `${host}/api/avatar/get-avatars`;
export const sendMessageRoute = `${host}/api/message/add-msg`;
export const getAllMessageRoute = `${host}/api/message/get-msg`;
