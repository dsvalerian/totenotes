import {createContext} from "react";
import User from "../types/user.ts";

interface AuthContextType {
  user: User | null,
  login: (user: User) => void,
  logout: () => void,
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;