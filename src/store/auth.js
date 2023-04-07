import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isAuthenticated: false,
  access_token: "",
  refresh_token: ""
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state, actions) {
      state.isAuthenticated = true;
      state.access_token = actions.payload.access;
      state.refresh_token = actions.payload.refresh;
      // localStorage.setItem('access_token', actions.payload.access)
      // localStorage.setItem('refresh_token', actions.payload.refresh)
      // localStorage.setItem('isAuthenticated', true)
    },
    logout(state) {
      state.isAuthenticated = false;
      state.access_token = "";
      state.refresh_token = "";
      // localStorage.setItem('access_token', "")
      // localStorage.setItem('refresh_token', "")
      // localStorage.setItem('isAuthenticated', false)
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;