import { createSlice } from "@reduxjs/toolkit";

export const teamsSlice = createSlice({
  name: "Teams",
  initialState: {
    teams: [],
  },
  reducers: {
    setTeams: (state, action) => {
      state.teams = action.payload;
    },
  },
});

export const { setTeams } = teamsSlice.actions;

export default teamsSlice.reducer;
