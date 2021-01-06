import { createSlice } from '@reduxjs/toolkit';
import { getParse } from '../utils';

export const workspacesSlice = createSlice({
  name: 'workspaces',
  initialState: {
    newWorkspaceName: "",
    newWorkspaceError: null,
    communicationError: null,
    workspaces: [],
    windex: -1,
  },
  reducers: {
    setWorkspaces: (state, action) => {
      state.workspaces = action.payload;
      state.workspaces.push({
        id: "0",
      })
      state.windex = 0;
      state.newWorkspaceError = null;
    },
    setWIndex: (state, action) => {
      state.windex = action.payload;
    },
    addedWorkspace: (state, action) => {
      const index = state.workspaces.length-1;
      state.workspaces.splice(index, 0, {
        id: action.payload.id,
        name: action.payload.name,
      })
      state.windex = index;
      state.newWorkspaceName = "";
      state.newWorkspaceError = null;
    },
    setNewWorkspaceName: (state, action) => {
      state.newWorkspaceName = action.payload;
    },
    setNewWorkspaceError: (state, action) => {
      state.newWorkspaceError = action.payload;
    },
    setCommunicationError: (state, action) => { // errors must be a list!
      state.communicationError = action.payload;
    },
  },
});

export const { setWorkspaces, setWIndex, setNewWorkspaceName, addedWorkspace, setNewWorkspaceError, setCommunicationError } = workspacesSlice.actions;

export const selectWorkspaces = state => state.workspaces.workspaces;
export const selectWIndex = state => state.workspaces.windex;
export const selectNewWorkspaceError = state => state.workspaces.newWorkspaceError;
export const selectNewWorkspaceName = state => state.workspaces.newWorkspaceName;
export const selectWorkspace = state => state.workspaces.workspaces[state.workspaces.windex];
export const selectCommunicationError = state => state.workspaces.communicationError;

export const createWorkspaceAsync = (wname) => dispatch => {
  console.log("Creating workspace...");
  const parse = getParse();
  parse.Cloud.run("addspace", { name: wname }).then((answer) => {
    console.log("success:", answer);
    dispatch(addedWorkspace({
      id: answer,
      name: wname,
    }));
  }, (error) => {
    console.error('Error while adding workspace', error);
    dispatch(setNewWorkspaceError(JSON.stringify(error)))    
  });  
};

export const loadCurrentWorkspaceChannelsAsync = () => dispatch => {
  console.log("Loading workspace channels...");

}

export const loadCurrentWorkspaceMembersAsync = (workspaceId) => dispatch => {
  console.log("Loading members of workspace " + workspaceId);

  const parse = getParse();
  const query = new parse.Query(parse.Role)
  query.equalTo('name', "wrk_"+workspaceId)

  query.first().then((result) => {
    if (result) {
      console.log("Result: " + result);

    } else {
      const err = "Result is undefined";
      console.log(err);
      dispatch(setCommunicationError(err))
    }
  }, (error) => {
    console.error('Error while fetching role', error);
    dispatch(setCommunicationError(JSON.stringify(error)))
  });        

}

export default workspacesSlice.reducer;
