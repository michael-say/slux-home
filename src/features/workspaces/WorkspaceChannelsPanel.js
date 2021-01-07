import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Workspaces.module.css';
import { Typography, Paper, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { selectWorkspace, loadCurrentWorkspaceChannelsAsync, setWorkspaceAddChannel } from './workspacesSlice';
import AddIcon from '@material-ui/icons/Add';

export function WorkspaceChannelsPanel(props) {
    const { index } = props;
    const workspace = useSelector(selectWorkspace);  
    const channels = workspace.channels;
    const dispatch = useDispatch();
    let channelsItems = [];
    const handleAddChannel = () => {
      dispatch(setWorkspaceAddChannel({wid: workspace.id, addChannel: true}));
    };


    if (!channels) {
      dispatch(loadCurrentWorkspaceChannelsAsync(workspace.id));
    } else {
      for (const ch of channels) {
        channelsItems.push(<ListItem button>
          <ListItemText primary={"# " + ch.name} />
        </ListItem>);
      }
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
          {(channels) && (
            <List component="nav">
              {channelsItems}
              <ListItem button onClick={handleAddChannel}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add Channel" />
              </ListItem>
            </List>
          )}
      </Paper>
    );
  }
  
  WorkspaceChannelsPanel.propTypes = {
    index: PropTypes.any.isRequired,
  };
  
  