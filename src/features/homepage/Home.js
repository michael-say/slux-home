import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSession,
} from './homeSlice';
import styles from './Home.module.css';
import { Signin } from './Signin';

export function Home() {
  const session = useSelector(selectSession);
  
  if (session == null || session.sessionId == null) {
    return <Signin />
  } 

  return (
    <div>
      Logon. Workspaces: ...
    </div>
  )
  
}
