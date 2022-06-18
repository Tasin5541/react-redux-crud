import { createSlice, PayloadAction } from "@reduxjs/toolkit";

let user: userCredentials = JSON.parse(localStorage.getItem("user"));

export type userAuth = {
  email: string;
  password: string;
};

type userCredentials = {
  token: string;
  email: string;
  userName: string;
};

const initialUserState: userCredentials = {
  token: user ? user.token : "",
  email: user ? user.email : "",
  userName: user ? user.userName : "",
};

type InitialState = {
  isLoggedIn: boolean;
  error: string;
  userAuth: userAuth;
  userCredentials: userCredentials;
};

const initialState: InitialState = {
  isLoggedIn: user ? true : false,
  error: "",
  userAuth: null,
  userCredentials: initialUserState,
};

const loginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    handleUserLogin: (state, action: PayloadAction<userAuth>) => {
      if (action.payload.email === "admin@xyz.com" && action.payload.password === "123") {
        let apiToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHh5ei5jb20iLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE1MTYyMzkwMjJ9.WtELYstTBl66bKMt7sXv8XB_q4sQCASr7S15FxQTD6w";
        let tokenPayload = JSON.parse(window.atob(apiToken.split(".")[1]));

        state.userCredentials.token = apiToken;
        state.userCredentials.email = tokenPayload.email;
        state.userCredentials.userName = tokenPayload.name;

        localStorage.setItem("user", JSON.stringify(state.userCredentials));

        state.error = "";

        state.isLoggedIn = true;
      } else {
        state.error = "Please provide correct user credentials";
      }
    },
    handleLogout: (state) => {
      localStorage.clear();
      state.isLoggedIn = false;
      state.userCredentials.token = "";
      state.userCredentials.email = "";
      state.userCredentials.userName = "";
    },
  },
});

export default loginSlice.reducer;
export const { handleUserLogin, handleLogout } = loginSlice.actions;
