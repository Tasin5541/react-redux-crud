import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  toggled: boolean;
};
const initialState: InitialState = {
  toggled: false,
};

const sidebarSlice = createSlice({
  name: "sidebarToggle",
  initialState,
  reducers: {
    handleToggleSidebar: (state) => {
      state.toggled = !state.toggled;
    },
  },
});

export default sidebarSlice.reducer;
export const { handleToggleSidebar } = sidebarSlice.actions;
