import React from 'react';
import PropTypes from 'prop-types';
import styles from './Workspaces.module.css';
import { WorkspaceChannelsPanel } from './WorkspaceChannelsPanel';
import { WorkspaceMembersPanel } from './WorkspaceMembersPanel';
import { WorkspaceChannel } from './WorkspaceChannel';
import { WorkspaceThread } from './WorkspaceThread';
import { setWorkspaceAddMember, selectWorkspace, setWorkspaceAddChannel, addChannnelAsync, setNewChannelName, setNewMemberEmail, addMemberAsync } from './workspacesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@material-ui/core';

export function WorkspacePanel(props) {
    const { children, value, index, ...other } = props;
    const workspace = useSelector(selectWorkspace);  
    const addingMember = workspace.addMember;
    const addingChannel = workspace.addChannel;
    const newChannelName = workspace.newChannelName;
    const newMemberEmail = workspace.newMemberEmail;
    const dispatch = useDispatch();

    const handleCloseAddMember = () => {
      dispatch(setWorkspaceAddMember({wid: workspace.id, addMember: false}));
    };
    const handleCloseAddChannel = () => {
      dispatch(setWorkspaceAddChannel({wid: workspace.id, addChannel: false}));
    };
    const handleAddChannel = () => {
      dispatch(setWorkspaceAddChannel({wid: workspace.id, addChannel: false}));
      dispatch(addChannnelAsync(workspace.id, newChannelName));
    }
    const handleAddMember = () => {
      dispatch(setWorkspaceAddMember({wid: workspace.id, addChannel: false}));
      dispatch(addMemberAsync(workspace.id, newMemberEmail));
    }

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        className={styles.tabpanel}
        {...other}
      >
        {value === index && (
          <div className={styles.fullheight}>
            <div className={styles.column + " " + styles.left} >
              <WorkspaceChannelsPanel index={index} />
              <WorkspaceMembersPanel index={index} />
            </div>
            <div className={styles.column + " " + styles.center}>
              <WorkspaceChannel index={index} />
            </div>
            <div className={styles.column + " " + styles.right}>
              <WorkspaceThread index={index} />
            </div>
          </div>
          )}

      <Dialog open={addingMember} onClose={handleCloseAddMember} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Invite Member</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Specify E-mail of the member to invite
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            value={newMemberEmail}
            onChange={e => dispatch(setNewMemberEmail({wid: workspace.id, newMemberEmail: e.target.value}))}
            onKeyDown={e => {if (e.keyCode == 13) {e.preventDefault(); handleAddMember()}}}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddMember} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddMember} color="primary">
            Invite
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addingChannel} onClose={handleCloseAddChannel} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create New Channel</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Specify name of the new channel
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            value={newChannelName}
            onChange={e => dispatch(setNewChannelName({wid: workspace.id, newChannelName: e.target.value}))}
            onKeyDown={e => {if (e.keyCode == 13) {e.preventDefault(); handleAddChannel()}}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddChannel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddChannel} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>


      </div>
    );
  }
  
  WorkspacePanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  