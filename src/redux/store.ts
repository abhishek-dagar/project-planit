import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import projectSlice from "./features/projectSlice";
import teamsSlice from "./features/teamsSlice";
import membersSlice from "./features/memberSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    projects: projectSlice,
    teams: teamsSlice,
    members: membersSlice,
  },
});
export default store;
