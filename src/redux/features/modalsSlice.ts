import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "Modal",
  initialState: {
    teamModal: null,
  },
  reducers: {
    setTeamModal: (state, action) => {
      state.teamModal = action.payload;
    },
  },
});

export const { setTeamModal } = modalSlice.actions;

export default modalSlice.reducer;