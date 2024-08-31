import { createSlice } from "@reduxjs/toolkit";

export const workspaceSlice = createSlice({
  name: "Workspace",
  initialState: {
    user: undefined,
  },
  reducers: {
    setWorkspace: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setWorkspace } = workspaceSlice.actions;

export default workspaceSlice.reducer;
