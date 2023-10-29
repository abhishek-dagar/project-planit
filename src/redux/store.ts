import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import projectSlice from "./features/projectSlice";
import teamsSlice from "./features/teamsSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    projects: projectSlice,
    teams: teamsSlice,
  },
});
export default store;
