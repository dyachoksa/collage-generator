import { Collage, User } from "./entities";

export interface UserResponse {
  success: boolean;
  result: User;
}

export interface AuthResponse extends UserResponse {
  token: string;
}

export interface CollagesResponse {
  success: boolean;
  result: Collage[];
}

export interface CollageResponse {
  success: boolean;
  result: Collage;
}
