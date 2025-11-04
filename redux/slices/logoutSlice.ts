import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logoutState: false,
};

const logoutStateSlice = createSlice({
  name: "projectSlice",
  initialState,
  reducers: {
    toggleLogoutState: (state, action) => {
      state.logoutState = action.payload;
    },
  },
});

export const { toggleLogoutState } = logoutStateSlice.actions;
export default logoutStateSlice.reducer;
