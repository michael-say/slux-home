import React from 'react';
import PropTypes from 'prop-types';
import styles from './Workspaces.module.css';
import { Typography, Paper, Divider, TextField, Button } from '@material-ui/core';
import { selectCurrentChannelId, selectWorkspace, setNewPostMessage, postAsync, loadChannelPostsAsync } from './workspacesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getParse } from '../utils';

export function WorkspaceChannel(props) {
    const { index } = props;
  
    const dispatch = useDispatch();
    const currentChannelId = useSelector(selectCurrentChannelId);  
    const workspace = useSelector(selectWorkspace); 
     
    if (!currentChannelId || currentChannelId === "") {
      return (
        <Paper 
          id={`channel-pnl-${index}`} 
          aria-labelledby={`ch-tab-${index}`}
          className={styles.channelpnl}>
            <Typography variant="h5" autoCapitalize="true">Channel Not Selected</Typography>
        </Paper>
      );  
    }

    let channel;
    let posts = [];
    if (workspace.channels) {
      for (const ch of workspace.channels) {
        if (ch.id === currentChannelId) {
          channel = ch;
          break;
        }
      }
    }

    if (channel && channel.posts) {
      for (const post of channel.posts) {
        posts.push(
          <div className={styles.post}>
            {(posts.length > 0) && (
              <Divider />
            )}
            <div className={styles.datepnl}>{post.date.toString()}</div>
            <div className={styles.authorpnl}>{post.author}</div>
            <div className={styles.messagepnl}>{post.message}</div>

          </div>
        );
      }
    } else {
      dispatch(loadChannelPostsAsync(workspace.id, channel.id));
    }

    return (
      <Paper 
        id={`channel-pnl-${index}`} 
        aria-labelledby={`ch-tab-${index}`}
        className={styles.channelpnl}>
          <div className={styles.postsHdrPnl}>
            <div className={styles.chnamepnl}># {channel.name}</div>
            <div className={styles.reloadpnl}><Button variant="contained" color="primary" onClick={() => dispatch(loadChannelPostsAsync(workspace.id, channel.id))}>Reload</Button></div>
          </div>
          <div className={styles.postsPnl}>
            <div className={styles.posts}>{posts}</div>
          </div>
          <div className={styles.newPostPnl}>
            <TextField
              id="outlined-multiline-static"
              label="Post Message"
              multiline
              fullWidth
              rows={3}
              defaultValue=""
              variant="outlined"
              value={channel.newPostMessage}
              onChange={e => dispatch(setNewPostMessage({wid: workspace.id, chid: channel.id, message: e.target.value}))}
              onKeyDown={e => {if (e.keyCode == 13) {
                e.preventDefault(); 
                dispatch(postAsync(workspace.id, channel.id, channel.newPostMessage, getParse().User.current().getEmail()));
                dispatch(setNewPostMessage({wid: workspace.id, chid: channel.id, message: ""}));
              }}}
            />
          </div>
      </Paper>
    );  
  
  }
  
  WorkspaceChannel.propTypes = {
    index: PropTypes.any.isRequired,
  };
  
  