import {PropsWithChildren, useEffect, useState} from "react";
import {getUserQuery} from "../api/user-queries.ts";
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
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    authenticate();
  }, []);

  return (
      <AuthContext.Provider value={{
        user: user,
        login: setUser,
        logout: () => setUser(null),
        isLoading: loading,
      }}>
        {children}
      </AuthContext.Provider>
  );
};

export default AuthContextProvider;