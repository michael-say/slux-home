import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Workspaces.module.css';
import { Typography, Paper, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { selectWorkspace, loadCurrentWorkspaceMembersAsync, setWorkspaceAddMember } from './workspacesSlice';

export function WorkspaceMembersPanel(props) {
    const { index } = props;
    const workspace = useSelector(selectWorkspace);  
    const members = workspace.members;
    const dispatch = useDispatch();
    let memberItems = [];
    const handleAddMember = () => {
      dispatch(setWorkspaceAddMember({wid: workspace.id, addMember: true}));
    };

    if (!members) {
      dispatch(loadCurrentWorkspaceMembersAsync(workspace.id));
    } else {
      for (const member of members) {
        memberItems.push(<ListItem>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={member.name} />
        </ListItem>);
      }
    }
  
    return (
      <Paper 
        id={`members-pnl-${index}`} 
        aria-labelledby={`members-tab-${index}`}
        className={styles.memberspnl}>
          <Typography variant="h5" autoCapitalize="true">Members</Typography>
          {!(workspace.members) && (
            <div>loading...</div>
          )}
          {(workspace.members) && (
            <List component="nav" aria-label="main mailbox folders">
              {memberItems}
              <ListItem button onClick={handleAddMember}>
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Invite Member" />
              </ListItem>
            </List>
          )}
      </Paper>
    );
  }
  
  WorkspaceMembersPanel.propTypes = {
    index: PropTypes.any.isRequired,
  };
  
  