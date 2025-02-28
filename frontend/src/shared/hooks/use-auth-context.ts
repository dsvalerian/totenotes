import AuthContext from "../contexts/auth-context.ts";
import {useContext} from "react";

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useUserContext must be used within the appropriate provider");
  }

  return context;
};

export default useAuthContext;