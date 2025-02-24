import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";

const createNewUserQuery = async (email: string, password: string) => {
  return await fetch("/api/auth/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({email: email, password: password})
  });
};

const useSignupUser = (email: string, password: string) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => createNewUserQuery(email, password),
    onSuccess: response => {
      if (response.ok) {
        navigate("/login");
      }
      else {
        alert("Could not create user");
      }
    }
  });
};

export default useSignupUser;