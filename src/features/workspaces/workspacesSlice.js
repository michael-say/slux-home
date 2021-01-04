import { createSlice } from '@reduxjs/toolkit';
import { getParse } from '../utils';

export const workspacesSlice = createSlice({
  name: 'workspaces',
  initialState: {
    newWorkspaceName: "",
    newWorkspaceError: null,
    workspaces: [],
    windex: -1,
  },
  reducers: {
    setWorkspaces: (state, action) => {
      state.workspaces = action.payload;
      state.workspaces.push({
        id: "0",
      })
      state.windex = state.workspaces.length - 1;
      state.newWorkspaceError = null;
    },
    setWIndex: (state, action) => {
      state.windex = action.payload;
    },
    setNewWorkspaceName: (state, action) => {
      state.newWorkspaceName = action.payload;
    },
  },
});

export const { setWorkspaces, setWIndex, setNewWorkspaceName } = workspacesSlice.actions;

export const selectWorkspaces = state => state.workspaces.workspaces;
export const selectWIndex = state => state.workspaces.windex;
export const selectNewWorkspaceError = state => state.workspaces.newWorkspaceError;
export const selectNewWorkspaceName = state => state.workspaces.newWorkspaceName;

export const createWorkspaceAsync = (name) => dispatch => {
  console.log("Creating workspace");
  const parse = getParse();
  // TODO: a) call function b) forbid creating workspaces manually
};


export default workspacesSlice.reducer;
