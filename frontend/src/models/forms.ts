export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  first_name?: string;
  last_name?: string;
}

export interface CollageBasicData {
  title?: string;
  description?: string;
}
