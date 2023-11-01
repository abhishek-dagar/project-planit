import { createSlice } from "@reduxjs/toolkit";

export const membersSlice = createSlice({
  name: "Members",
  initialState: {
    members: [],
  },
  reducers: {
    setMembers: (state, action) => {
      state.members = action.payload;
    },
  },
});

export const { setMembers } = membersSlice.actions;

export default membersSlice.reducer;
