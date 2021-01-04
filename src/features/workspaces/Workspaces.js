import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectWIndex,
  selectWorkspaces,
  setWIndex
} from './workspacesSlice';
import styles from './Workspaces.module.css';
import { Button, Card, TextField, CardContent, Typography, Paper, Tabs, Tab, AppBar, Box } from '@material-ui/core';
import { WorkspacePanel } from './WorkspacePanel';
import { NewWorkspacePanel } from './NewWorkspacePanel';

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export function Workspaces() {
  const dispatch = useDispatch();
  const workspaces = useSelector(selectWorkspaces);
  const value = useSelector(selectWIndex);

  const tabs = []
  const tabPanels = []
  var i = 0;

  for (const w of workspaces) {
    if (w.id == "0") {
      tabs.push(<Tab label="New Workspace" {...a11yProps(i)} />);
      tabPanels.push(<NewWorkspacePanel value={value} index={i} />);
    } else {
      tabs.push(<Tab label={w.name} {...a11yProps(i)} />);
      tabPanels.push(<WorkspacePanel value={value} index={i} />);
    }
    i++;
  }
  
  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={(event, newValue) => {
            dispatch(setWIndex(newValue));
          }}
          indicatorColor="primary"
          textColor="primary"
          aria-label="full width tabs example"
        >
          {tabs}
        </Tabs>
      </AppBar>
      {tabPanels}
    </div>
  );
}
