import { UserResponse } from "~/models/http";

import { baseApi } from "./base";
import { UserEditData } from "~/models/forms";

const profile = async () => baseApi.get<UserResponse>("users/me");

const update = async (data: UserEditData) =>
  baseApi.put<UserResponse>("users/me", data).then(res => res.data.result);

export const usersApi = { profile, update };
