import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Workspaces.module.css';
import { Typography, Paper } from '@material-ui/core';
import { selectWorkspace, loadCurrentWorkspaceMembersAsync } from './workspacesSlice';

export function WorkspaceMembersPanel(props) {
    const { index } = props;
    const workspace = useSelector(selectWorkspace);  
    const members = workspace.members;
    const dispatch = useDispatch();

    if (!members) {
      dispatch(loadCurrentWorkspaceMembersAsync(workspace.id));
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
      </Paper>
    );
  }
  
  WorkspaceMembersPanel.propTypes = {
    index: PropTypes.any.isRequired,
  };
  
  