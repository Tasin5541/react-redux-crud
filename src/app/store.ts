import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./features/SideBar/sidebarSlice";
import loginReducer from "./features/Login/loginSlice";
import userReducer from "./features/UserTable/userSlice";

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    auth: loginReducer,
    user: userReducer,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
