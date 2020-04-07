import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "~/models/entities";
import { LoginData, RegisterData } from "~/models/forms";
import { AppThunk } from "~/store";
import { ApiEndpoint, authApi, usersApi } from "~/api";
import { AuthResponse } from "~/models/http";

type AuthState = {
  isAuthenticated: boolean;
  isInitialLoad: boolean;
  currentUser?: User;
  error?: string;
};

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialLoad: true,
  currentUser: null,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authRequest(state) {
      state.error = null;
    },
    authSuccess(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
      state.isInitialLoad = false;
    },
    authError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isInitialLoad = false;
    },

    logoutRequest(state) {
      state.error = null;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.currentUser = null;
    },

    updateCurrentUser(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
    }
  }
});

export const {
  authRequest,
  authSuccess,
  authError,
  logoutRequest,
  logoutSuccess,
  updateCurrentUser
} = authSlice.actions;

const dispatchAuth = async (
  dispatch,
  endpoint: ApiEndpoint<AuthResponse>,
  data: LoginData | RegisterData
) => {
  try {
    dispatch(authRequest());

    const response = await endpoint(data);

    dispatch(authSuccess(response.data.result));
  } catch (err) {
    dispatch(authError(err.response?.data?.message || err.message || err.toString()));
  }
};

export const checkAuth = (): AppThunk => async dispatch => {
  try {
    const response = await usersApi.profile();

    dispatch(authSuccess(response.data.result));
  } catch (err) {
    if (err.response?.status != 401) {
      throw err;
    }
  }
};

export const register = (user: RegisterData): AppThunk => async dispatch =>
  dispatchAuth(dispatch, authApi.register, user);

export const login = (data: LoginData): AppThunk => async dispatch =>
  dispatchAuth(dispatch, authApi.login, data);

export const logout = (): AppThunk => async dispatch => {
  try {
    dispatch(logoutRequest());

    await authApi.logout();

    dispatch(logoutSuccess());
  } catch (err) {
    dispatch(authError(err.response?.data?.message || err.message || err.toString()));
  }
};

export default authSlice.reducer;
