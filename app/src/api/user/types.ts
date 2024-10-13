export type UserLoginApiRequest = {
  email: string;
  password: string;
};

export type UserLoginApiResponseSuccess = {
  message: string;
  exp: number;
  token: string;
  user: User;
};
export type UserLoginApiResponseFailure = {};

export type UserLogoutApiRequestSuccess = {};
export type UserLogoutApiRequestFailure = {};

export type User = {
  id: string;
  name: string;
  userKind: { isAdmin: boolean; isClient: boolean };
  email: string;
  createdAt: string;
  updatedAt: string;
  loginAttempts: 0;
};
