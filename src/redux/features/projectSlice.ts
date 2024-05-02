import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
  name: "Project",
  initialState: {
    projects: undefined,
  },
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
  },
});

export const { setProjects } = projectSlice.actions;

export default projectSlice.reducer;
