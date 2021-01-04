import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import homeReducer from '../features/homepage/homeSlice';
import workspacesReducer from '../features/workspaces/workspacesSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    home: homeReducer,
    workspaces: workspacesReducer,
  },
});
