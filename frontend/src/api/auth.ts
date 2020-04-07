import { LoginData, RegisterData } from "~/models/forms";

import { baseApi } from "./base";
import { AuthResponse } from "~/models/http";

const login = async (data: LoginData) => baseApi.post<AuthResponse>("auth/login", data);

const register = async (data: RegisterData) =>
  baseApi.post<AuthResponse>("auth/register", data);

const logout = async () => baseApi.post("auth/logout");

export const authApi = { login, register, logout };
