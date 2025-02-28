import {createContext} from "react";
import User from "../types/user.ts";

interface AuthContextType {
  user: User | null,
  login: (email: string, password: string) => void,
  logout: () => void,
  signup: (email: string, password: string) => void,
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;