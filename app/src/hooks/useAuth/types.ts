import type {
  User,
  UserLoginApiResponseSuccess,
  UserLoginApiRequest,
} from "@/api/user";

type State = Partial<Pick<User, "email" | "name">> &
  Partial<Pick<UserLoginApiResponseSuccess, "exp">> & {
    isLoading: boolean;
    hasError: boolean;
    isLoggedIn: boolean;
  };
type Actions = {
  login: (data: UserLoginApiRequest) => Promise<void>;
  logout: () => Promise<void>;
  setError: (hasError: State["hasError"]) => void;
};

export type Store = State & { actions: Actions };
