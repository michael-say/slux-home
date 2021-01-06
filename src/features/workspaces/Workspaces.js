import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectWIndex,
  selectWorkspaces,
  selectCommunicationError,
  setWIndex
} from './workspacesSlice';
import styles from './Workspaces.module.css';
import { Tabs, Tab, AppBar, Snackbar } from '@material-ui/core';
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
  const commErr = useSelector(selectCommunicationError);
  const value = useSelector(selectWIndex);

  console.log(commErr);

  const tabs = []
  const tabPanels = []
  var i = 0;

  for (const w of workspaces) {
    if (w.id === "0") {
      tabs.push(<Tab key={"tab" + i} label="New Workspace" {...a11yProps(i)} />);
      tabPanels.push(<NewWorkspacePanel key={"wp" + i} value={value} index={i} id={"wp"+i} />);
    } else {
      tabs.push(<Tab key={"tab" + i} label={w.name} {...a11yProps(i)} />);
      tabPanels.push(<WorkspacePanel key={"wp" + i} value={value} index={i} id={"wp"+i} />);
    }
    i++;
  }
  
  return (
    <div className={styles.fullheight}>
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
      {commErr && (
          <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={true}
          autoHideDuration={6000}
          message={commErr}
        />
          )}
    </div>
  );
}
