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
    },
    logout(state) {
      state.isAuthenticated = false;
      state.access_token = "";
      state.refresh_token = "";
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;