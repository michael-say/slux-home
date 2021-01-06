import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Workspaces.module.css';
import { Typography, Paper } from '@material-ui/core';
import { selectWorkspace, loadCurrentWorkspaceChannelsAsync } from './workspacesSlice';

export function WorkspaceChannelsPanel(props) {
    const { index } = props;
    const workspace = useSelector(selectWorkspace);  
    const channels = workspace.channels;
    const dispatch = useDispatch();

    if (!channels) {
      dispatch(loadCurrentWorkspaceChannelsAsync());
    }

    return (
      <Paper 
        id={`channels-pnl-${index}`} 
        aria-labelledby={`simple-tab-${index}`}
        className={styles.channelspnl}>
          <Typography variant="h5" autoCapitalize="true">Channels</Typography>
          {!(channels) && (
            <div>loading...</div>
          )}
      </Paper>
    );
  }
  
  WorkspaceChannelsPanel.propTypes = {
    index: PropTypes.any.isRequired,
  };
  
  