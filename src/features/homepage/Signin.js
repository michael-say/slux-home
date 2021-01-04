import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createAccountAsync,
  loginAsync,
  selectEmail,
  selectPassword,
  setEmail,
  setPassword,
  selectError,
} from './homeSlice';
import styles from './Home.module.css';
import { Button, Card, TextField, CardContent, Typography } from '@material-ui/core';

export function Signin() {
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  const error = useSelector(selectError);
  let emailInput;
  
  if (error != null) {
    emailInput = <TextField error helperText={error} fullWidth required id="email" label="E-mail" variant="outlined" value={email} onChange={e => dispatch(setEmail(e.target.value))} />
  } else {
    emailInput = <TextField fullWidth required id="email" label="E-mail" variant="outlined" value={email} onChange={e => dispatch(setEmail(e.target.value))} />
  }

  return (
    <Card className={styles.panel}>
      <CardContent>
      <Typography variant="h4" gutterBottom align="center">
        Login or Register
      </Typography>        
        <form noValidate autoComplete="off">
          <div className={styles.line}>            
            {emailInput}
          </div>
          <div className={styles.line}>
            <TextField fullWidth required id="password" label="Password" variant="outlined" value={password} onChange={e => dispatch(setPassword(e.target.value))} />
          </div>
          <div className={styles.line}>
            <Button fullWidth variant="contained" color="primary" onClick={() => dispatch(loginAsync(email, password))}>Log in</Button>
          </div>
          <div className={styles.line}> or </div>
          <div className={styles.line}>
            <Button fullWidth variant="contained" color="secondary" onClick={() => dispatch(createAccountAsync(email, password))}>Create Account</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
