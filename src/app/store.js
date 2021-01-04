import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import homeReducer from '../features/homepage/homeSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    home: homeReducer,
  },
});
