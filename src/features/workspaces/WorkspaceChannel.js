import React from 'react';
import PropTypes from 'prop-types';
import styles from './Workspaces.module.css';
import { Typography, Paper } from '@material-ui/core';

export function WorkspaceChannel(props) {
    const { index } = props;
  
    return (
      <Paper 
        id={`channel-pnl-${index}`} 
        aria-labelledby={`ch-tab-${index}`}
        className={styles.channelpnl}>
          <Typography variant="h5" autoCapitalize="true">Current Channel</Typography>
      </Paper>
    );
  }
  
  WorkspaceChannel.propTypes = {
    index: PropTypes.any.isRequired,
  };
  
  