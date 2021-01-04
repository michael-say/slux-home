import { createSlice } from '@reduxjs/toolkit';
import { getParse } from '../utils';

var EMPTY_SESSION = {
  sessionId: null,
  userId: null,
}

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    email: "",
    password: "",
    error: null,
    session: EMPTY_SESSION,
  },
  reducers: {
    logon: (state, action) => {
      state.session = action.payload;
      state.error = null;
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
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { logon, logout, setEmail, setPassword, setError } = homeSlice.actions;

export const loginAsync = (email, password) => dispatch => {
  console.log("logging in");
  const parse = getParse();
  parse.User.logIn(email, password).then((user) => {
    var token = user.getSessionToken()
    console.log('Logged in user', user);
    console.log('Session id', token);
    dispatch(logon({
      sessionId: token,
      userId: user.id,
    }));
  }).catch(error => {
    console.error('Error while logging in user', error);
    dispatch(setError(JSON.stringify(error)))
  })
};

export const createAccountAsync = (email, password) => dispatch => {
  console.log("Creating account");
  const parse = getParse();
  const user = new parse.User()
  user.set('username', email);
  user.set('email', email);
  user.set('name', email);
  user.set('password', password);  

  user.signUp().then((user) => {
    console.log('User created!', user);
    dispatch(loginAsync(email, password));
  }).catch(error => {
    console.error('Error while creating user', error);
    dispatch(setError(JSON.stringify(error)))
  }); 
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectSession = state => state.home.session;
export const selectEmail = state => state.home.email;
export const selectPassword = state => state.home.password;
export const selectError = state => state.home.error;

export default homeSlice.reducer;
