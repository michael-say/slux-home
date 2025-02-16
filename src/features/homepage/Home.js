import React from 'react';
import { useSelector } from 'react-redux';
import { Workspaces } from '../workspaces/Workspaces';
import {
  selectSession,
} from './homeSlice';
import { Signin } from './Signin';

export function Home() {
  const session = useSelector(selectSession);
  
  if (session == null || session.sessionId == null) {
    return <Signin />
  } 

  return <Workspaces />
  
}
