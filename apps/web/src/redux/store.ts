import { configureStore } from "@reduxjs/toolkit";
import workspaceSlice from "./features/workspaceSlice";

const store = configureStore({
  reducer: {
    workspace: workspaceSlice,
  },
});
export default store;
