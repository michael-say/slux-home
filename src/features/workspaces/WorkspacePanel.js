import React from 'react';
import PropTypes from 'prop-types';
import styles from './Workspaces.module.css';
import { WorkspaceChannelsPanel } from './WorkspaceChannelsPanel';
import { WorkspaceMembersPanel } from './WorkspaceMembersPanel';
import { WorkspaceChannel } from './WorkspaceChannel';
import { WorkspaceThread } from './WorkspaceThread';

export function WorkspacePanel(props) {
    const { children, value, index, ...other } = props;
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
      </div>
    );
  }
  
  WorkspacePanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  