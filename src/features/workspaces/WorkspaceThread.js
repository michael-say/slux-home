import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper } from '@material-ui/core';
import styles from './Workspaces.module.css';

export function WorkspaceThread(props) {
    const { index } = props;
  
    return (
      <Paper 
        id={`thread-pnl-${index}`} 
        aria-labelledby={`thread-tab-${index}`}
        className={styles.threadpnl}>
          <Typography variant="h5" autoCapitalize="true">Current Thread</Typography>
      </Paper>
    );
  }
  
  WorkspaceThread.propTypes = {
    index: PropTypes.any.isRequired,
  };
  
  