import { createSlice } from '@reduxjs/toolkit';
import { getParse, getClient } from '../utils';

/* 
  WORKSPACE:

  id: "asdasd",
  name: "Workspace 1",
  channels: [
    {
      id: 34,
      name: "root",
      newPostMessage: "",
      posts: [
        date: "",
        author: "User1",
        message: "Some post",
      ]
    }
  ],
  members: [
    {
      id: 123,
      name: "User1"
    }
  ],
  addMember: false,
  addChannel: false,
  newChannelName: "",
  newMemberEmail: "",
  currentChannelId: null,
*/

//slux.b4a.io

export const workspacesSlice = createSlice({
  name: 'workspaces',
  initialState: {
    newWorkspaceName: "",
    newWorkspaceError: null,
    communicationError: null,
    workspaces: [], // {id, name, channels: [], members: [], addMember: false, addChannel: false, newChannelName: "", newMemberEmail: ""}
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
    setCommunicationError: (state, action) => { 
      state.communicationError = action.payload;
    },
    setWorkspaceMembers: (state, action) => { // {wid, members}
      for (let i = 0; i < state.workspaces.length; i++) {
        if (state.workspaces[i].id  === action.payload.wid) {
          state.workspaces[i].members = action.payload.members;
        }
      }
    },
    setWorkspaceAddMember: (state, action) => { // {wid, true/false}
    for (let i = 0; i < state.workspaces.length; i++) {
        if (state.workspaces[i].id  === action.payload.wid) {
          state.workspaces[i].addMember = action.payload.addMember;
          state.workspaces[i].newMemberEmail = "";
        }
      }
    },
    setWorkspaceAddChannel: (state, action) => { // {wid, true/false}
    for (let i = 0; i < state.workspaces.length; i++) {
        if (state.workspaces[i].id  === action.payload.wid) {
          state.workspaces[i].addChannel = action.payload.addChannel;
          state.workspaces[i].newChannelName = "";
        }
      }
    },
    setWorkspaceChannels: (state, action) => { // {wid, channels}
      for (let i = 0; i < state.workspaces.length; i++) {
        if (state.workspaces[i].id  === action.payload.wid) {
          state.workspaces[i].channels = action.payload.channels;
        }
      }
    },
    setNewChannelName: (state, action) => { // {wid, newChannelName}
      for (let i = 0; i < state.workspaces.length; i++) {
        if (state.workspaces[i].id  === action.payload.wid) {
          state.workspaces[i].newChannelName = action.payload.newChannelName;
        }
      }
    },
    setNewMemberEmail: (state, action) => { // {wid, newMemberEmail}
      for (let i = 0; i < state.workspaces.length; i++) {
        if (state.workspaces[i].id  === action.payload.wid) {
          state.workspaces[i].newMemberEmail = action.payload.newMemberEmail;
        }
      } 
    },
    selectWorkspaceChannel: (state, action) => { // {wid, chid}
      for (let i = 0; i < state.workspaces.length; i++) {
        if (state.workspaces[i].id  === action.payload.wid) {
          state.workspaces[i].currentChannelId = action.payload.chid;
          break;
        }
      }      
    },
    postAdded: (state, action) => { // {wid, chid, email, message}
      for (let i = 0; i < state.workspaces.length; i++) {
        if (state.workspaces[i].id  === action.payload.wid) {
          for (let j=0; j<state.workspaces[i].channels.length; j++ ) {
            if (state.workspaces[i].channels[j].id === action.payload.chid || (action.payload.chid === "" && state.workspaces[i].channels[j].name==="root")) {
              if (!state.workspaces[i].channels[j].posts) {
                state.workspaces[i].channels[j].posts = [];
              }
              state.workspaces[i].channels[j].posts.push({
                date: new Date(),
                message: action.payload.message,
                author: action.payload.email,
              });
            }
          }
        }
      }      
    },
    setChannelPosts: (state, action) => { // {wid, chid, posts[]}
      for (let i = 0; i < state.workspaces.length; i++) {
        if (state.workspaces[i].id  === action.payload.wid) {
          for (let j=0; j<state.workspaces[i].channels.length; j++ ) {
            if (state.workspaces[i].channels[j].id === action.payload.chid) {
              state.workspaces[i].channels[j].posts = action.payload.posts;
            }
          }
        }
      }
    },
    setNewPostMessage: (state, action) => { // {wid, chid, message}
      for (let i = 0; i < state.workspaces.length; i++) {
        if (state.workspaces[i].id  === action.payload.wid) {
          for (let j=0; j<state.workspaces[i].channels.length; j++ ) {
            if (state.workspaces[i].channels[j].id === action.payload.chid) {
              state.workspaces[i].channels[j].newPostMessage = action.payload.message;
            }
          }
        }
      }      
  }
}});

export const { setWorkspaces, setWIndex, setNewWorkspaceName, addedWorkspace, setNewWorkspaceError, setCommunicationError, 
  setWorkspaceMembers, setWorkspaceChannels, setWorkspaceAddMember, setWorkspaceAddChannel, setNewChannelName, setNewMemberEmail, 
  postAdded, selectWorkspaceChannel, setNewPostMessage, setChannelPosts} = workspacesSlice.actions;

export const selectWorkspaces = state => state.workspaces.workspaces;
export const selectWIndex = state => state.workspaces.windex;
export const selectNewWorkspaceError = state => state.workspaces.newWorkspaceError;
export const selectNewWorkspaceName = state => state.workspaces.newWorkspaceName;
export const selectWorkspace = state => state.workspaces.workspaces[state.workspaces.windex];
export const selectCurrentChannelId = state => state.workspaces.workspaces[state.workspaces.windex].currentChannelId;
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

export const loadChannelPostsAsync = (wid, chid) => dispatch => {
  console.log("Loading posts of channel "+chid);
  const parse = getParse();

  const Channel = parse.Object.extend('Channel');
  var channel = new Channel();
  channel.set('id', chid);
  

  const Posts = parse.Object.extend('Posts');
  const query = new parse.Query(Posts);
  query.include("Author");
  query.equalTo("Channel", channel);

  query.find().then((results) => {
    console.log("Successfully retrieved " + results.length + " posts");
    let posts = []
    
    for (let i = 0; i < results.length; i++) {
      const chn = results[i];
      posts.push({
        date: chn.get('Date'),
        author: chn.get('Author').get('name'),
        message: chn.get('Message'),
      });
    }

    dispatch(setChannelPosts({wid: wid, chid: chid, posts: posts}));
    
  }, (error) => {
    console.error('Error while fetching posts`', error);
    dispatch(setCommunicationError(JSON.stringify(error)))
  });        
  
};

export const addChannnelAsync = (wid, name) => dispatch => {
  console.log("Creating channel...");
  const parse = getParse();
  parse.Cloud.run("addchannel", { name: name, wid: wid }).then((answer) => {
    console.log("success:", answer);
    dispatch(loadCurrentWorkspaceChannelsAsync(wid));
  }, (error) => {
    console.error('Error while adding channel', error);
    dispatch(setCommunicationError(JSON.stringify(error)))
  });  
};

export const addMemberAsync = (wid, email) => dispatch => {
  console.log("Adding member...");
  const parse = getParse();
  parse.Cloud.run("addmember", { email: email, wid: wid }).then((answer) => {
    console.log("success:", answer);
    dispatch(loadCurrentWorkspaceMembersAsync(wid));
  }, (error) => {
    console.error('Error while adding member', error);
    dispatch(setCommunicationError(JSON.stringify(error)))
  });  
};

export const postAsync = (wid, chid, message, email) => dispatch => {
  console.log("Adding post...");
  const parse = getParse();
  parse.Cloud.run("post", { message: message, wid: wid, channelId: chid }).then((answer) => {
    console.log("success:", answer);
    dispatch(postAdded({wid: wid, chid: chid, email: email, message: message}));
  }, (error) => {
    console.error('Error while adding post', error);
    dispatch(setCommunicationError(JSON.stringify(error)))
  });  
};


export const loadCurrentWorkspaceChannelsAsync = (wid) => dispatch => {
  console.log("Loading workspace channels...", wid);

  const parse = getParse();
  const channel = parse.Object.extend('Channel');
  const Workspace = parse.Object.extend('workspace');
  var workspace = new Workspace();
  workspace.set('id', wid);
  const query = new parse.Query(channel);
  query.equalTo("workspace", workspace);
  query.find().then((results) => {
    console.log("Successfully retrieved " + results.length + " channels");
    // Do something with the returned Parse.Object values
    let channels = []
    let selectedChannelId = null;
    for (let i = 0; i < results.length; i++) {
      const chn = results[i];
      console.log(chn.id + ' - ' + chn.get('name'));
      channels.push({
        id: chn.id,
        name: chn.get('name'),
      });
      if (chn.get('name')==="root") {
        selectedChannelId = chn.id;
      }
    }

    dispatch(setWorkspaceChannels({
      wid: wid,
      channels: channels,
    }))
    
    dispatch(selectWorkspaceChannel({
      wid: wid,
      chid: selectedChannelId,
    }));

  }, (error) => {
    console.error('Error while fetching channels', error);
    dispatch(setCommunicationError(JSON.stringify(error)))
  });        
}

export const loadCurrentWorkspaceMembersAsync = (workspaceId) => dispatch => {
  console.log("Loading members of workspace " + workspaceId);

  const parse = getParse();
  const query = new parse.Query(parse.Role)
  query.equalTo('name', "wrk_"+workspaceId)

  query.first().then((result) => {
    if (result) {
      console.log("Result.getUsers(): " + result.getUsers());
        result.getUsers().query().find().then((users) => {
          console.log("users: " + users.length);
          let members = []
          for (let i = 0; i < users.length; i++) {
            const usr = users[i];
            console.log(usr.id + ' - ' + usr.get('name'));
            members.push({
              id: usr.id,
              name: usr.get('name'),
            });
          }
          dispatch(setWorkspaceMembers({
            wid: workspaceId,
            members: members,
          }))      
        }, (error) => {
          console.error('Error fetching role users', error);
          dispatch(setCommunicationError(JSON.stringify(error)))
        }
      );
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
