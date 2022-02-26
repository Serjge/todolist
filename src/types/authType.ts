export type authType = {
  id: number;
  email: string;
  login: string;
};

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: string;
};

export type AuthInitialType = {
  isLoginIn: boolean;
};
