import { UserResponse } from "~/models/http";

import { baseApi } from "./base";

const profile = async () => baseApi.get<UserResponse>("users/me");

export const usersApi = { profile };
