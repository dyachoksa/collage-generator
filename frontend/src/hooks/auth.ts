import { useDispatch, useSelector } from "react-redux";

import { LoginData, RegisterData } from "~/models/forms";
import { RootState } from "~/features";
import { login, logout, register, checkAuth } from "~/features/auth";

export function useAuth() {
  const dispatch = useDispatch();

  const { isAuthenticated, isInitialLoad, currentUser, error } = useSelector(
    (state: RootState) => state.auth
  );

  return {
    isAuthenticated,
    isInitialLoad,
    currentUser,
    error,

    checkAuth() {
      dispatch(checkAuth());
    },
    register(data: RegisterData) {
      dispatch(register(data));
    },
    login(data: LoginData) {
      dispatch(login(data));
    },
    logout() {
      dispatch(logout());
    }
  };
}
