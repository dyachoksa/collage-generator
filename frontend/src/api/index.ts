import { AxiosResponse } from "axios";

export { authApi } from "./auth";
export { collagesApi } from "./collages";
export { usersApi } from "./users";

export type ApiEndpoint<T> = (data?) => Promise<AxiosResponse<T>>;
