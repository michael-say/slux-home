import { createSlice } from '@reduxjs/toolkit';

var EMPTY_SESSION = {
  sessionId: null,
  userId: null,
}

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    email: "",
    password: "",
    session: EMPTY_SESSION,
  },
  reducers: {
    logon: (state, action) => {
      state.session = action.payload;
      state.password = "";
    },
    logout: state => {
      state.session = EMPTY_SESSION;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const { logon, logout, setEmail, setPassword } = homeSlice.actions;

export const loginAsync = (email, password) => dispatch => {
  setTimeout(() => {
    dispatch(logon({
      sessionId: "asd",
      userId: "asd",
    }));
  }, 1000);
};

export const createAccountAsync = (email, password) => dispatch => {
  setTimeout(() => {
    dispatch(logon({
      sessionId: "asd",
      userId: "asd",
    }));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectSession = state => state.home.session;
export const selectEmail = state => state.home.email;
export const selectPassword = state => state.home.password;

export default homeSlice.reducer;
