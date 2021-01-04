import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectNewWorkspaceError,
  setNewWorkspaceName,
  selectNewWorkspaceName,
  createWorkspaceAsync,
} from './workspacesSlice';
import styles from './Workspaces.module.css';
import { Typography, Box, TextField, Button } from '@material-ui/core';

export function NewWorkspacePanel(props) {
    const { children, value, index, ...other } = props;
  
    const dispatch = useDispatch();
    const error = useSelector(selectNewWorkspaceError);
    const name = useSelector(selectNewWorkspaceName);

    let nameInput;
  
    if (error != null) {
      nameInput = <TextField className={styles.textfield} error helperText={error} required id="name" label="Workspace Title" variant="outlined" value={name} onChange={e => dispatch(setNewWorkspaceName(e.target.value))} />
    } else {
      nameInput = <TextField className={styles.textfield} required id="name" label="Workspace Title" variant="outlined" value={name} onChange={e => dispatch(setNewWorkspaceName(e.target.value))} />
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
          <Box p={3}>
            <Typography>Create New Workspace</Typography>
            <form noValidate autoComplete="off">
              <div className={styles.line}>
                  {nameInput}
              </div>
              <div className={styles.line}>
                <Button fullWidth variant="contained" color="secondary" onClick={() => dispatch(createWorkspaceAsync(name))}>Submit</Button>
              </div>
            </form>
          </Box>
      </div>
    );
  }
  
  NewWorkspacePanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  