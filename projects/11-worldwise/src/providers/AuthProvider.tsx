import { createContext, Reducer, useContext, useReducer } from "react";

type User = { name: string; avatar: string; email: string; password: string };
type LoginCredentials = Omit<User, "name" | "avatar">;
type AuthReducerAction = { type: "login"; payload: User } | { type: "logout" };
type AuthReducerState = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};
type AuthContextValue = AuthReducerState & {
  login(credentials: LoginCredentials): Promise<void>;
  logout(): Promise<void>;
};

const USER: User = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthContext = createContext({} as AuthContextValue);

const initialAuthState: AuthReducerState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
};

const reducer: Reducer<AuthReducerState, AuthReducerAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "logout":
      return { ...initialAuthState };
    default:
      return state;
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  const login = async (credentials: LoginCredentials) => {
    // await new Promise((resolve) => setTimeout(resolve, 300));

    const { email, password } = credentials;
    if (USER.email !== email || USER.password !== password) {
      throw new Error("Invalid user credentials");
    }

    dispatch({ type: "login", payload: USER });
  };

  const logout = async () => {
    dispatch({ type: "logout" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
