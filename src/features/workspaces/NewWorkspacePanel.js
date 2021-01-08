import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectNewWorkspaceError,
  setNewWorkspaceName,
  selectNewWorkspaceName,
  createWorkspaceAsync,
} from './workspacesSlice';
import styles from './Workspaces.module.css';
import { Typography, Box, TextField, Button, Paper } from '@material-ui/core';

export function NewWorkspacePanel(props) {
    const { children, value, index, ...other } = props;
  
    const dispatch = useDispatch();
    const error = useSelector(selectNewWorkspaceError);
    const name = useSelector(selectNewWorkspaceName);
    const createWorkspace = () => dispatch(createWorkspaceAsync(name));
  
    let nameInput;
  
    if (error != null) {
      nameInput = <TextField 
        fullWidth 
        className={styles.textfield} 
        error 
        helperText={error} 
        required 
        id="name" 
        label="Workspace Title" 
        variant="outlined" 
        value={name} 
        onChange={e => dispatch(setNewWorkspaceName(e.target.value))} 
        onKeyDown={e => {if (e.keyCode == 13) {e.preventDefault(); dispatch(createWorkspaceAsync(name))}}}
      />
    } else {
      nameInput = <TextField 
        fullWidth 
        className={styles.textfield} 
        required 
        id="name" 
        label="Workspace Title" 
        variant="outlined" 
        value={name} 
        onChange={e => dispatch(setNewWorkspaceName(e.target.value))} 
        onKeyDown={e => {if (e.keyCode == 13) {e.preventDefault(); dispatch(createWorkspaceAsync(name))}}}
      />
    }

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        className={styles.panel}
        {...other}
      >
          <Paper>
          <Box p={3} >
            <Typography>Create New Workspace</Typography>
            <form noValidate autoComplete="off">
              <div className={styles.line}>
                  {nameInput}
              </div>
              <div className={styles.line}>
                <Button fullWidth variant="contained" color="secondary" onClick={createWorkspace}>Submit</Button>
              </div>
            </form>
          </Box>
          </Paper>
      </div>
    );
  }
  
  NewWorkspacePanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  