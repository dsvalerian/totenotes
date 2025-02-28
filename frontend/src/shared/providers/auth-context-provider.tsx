import {PropsWithChildren, useEffect, useState} from "react";
import {createNewUserQuery, getUserQuery, loginUserQuery, logoutUserQuery} from "../api/user-queries.ts";
import AuthContext from "../contexts/auth-context.ts";
import User from "../types/user.ts";

const AuthContextProvider = ({children}: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      try {
        setUser(await getUserQuery());
      } catch (err) {
        console.error(err instanceof Error ? err.message : "Unauthorized");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    authenticate();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setUser(await loginUserQuery(email, password));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to login";
      console.error(message);
      alert(message);
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await logoutUserQuery();
      setUser(null);
    } catch (err) {
      // Failed to log out, so i guess don't do anything with the user state
      console.error(err instanceof Error ? err.message : "Failed to logout");
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      setUser(await createNewUserQuery(email, password));
    } catch (err) {
      console.error(err instanceof Error ? err.message : "Failed to sign up user");
      setUser(null);
    }
  };

  return (
      <AuthContext.Provider value={{
        user: user,
        login: login,
        logout: logout,
        signup: signup,
        isLoading: loading,
      }}>
        {children}
      </AuthContext.Provider>
  );
};

export default AuthContextProvider;