import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createAccountAsync,
  loginAsync,
  selectEmail,
  selectPassword,
  setEmail,
  setPassword,
} from './homeSlice';
import styles from './Home.module.css';
import { Button, Card, TextField } from '@material-ui/core';

export function Signin() {
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);

  return (
    <Card className={styles.panel}>
      <form noValidate autoComplete="off">
      <div>
          <TextField id="outlined-basic" label="Email *" variant="outlined" value={email} onChange={e => dispatch(setEmail(e.target.value))} />
        </div>
        <div>
          <TextField id="outlined-basic" label="Password *" variant="outlined" value={email} onChange={e => dispatch(setPassword(e.target.value))} />
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={() => loginAsync(email, password)}>Log in</Button>
        </div>
      <Button variant="contained" color="secondary" onClick={() => createAccountAsync(email, password)}>Create Account</Button>
      </form>
    </Card>
  );
}
