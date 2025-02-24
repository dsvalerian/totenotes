import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";

const loginUserQuery = async (email: string, password: string) => {
  return await fetch("/api/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({email: email, password: password})
  });
};

const useLoginUser = (email: string, password: string) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => loginUserQuery(email, password),
    onSuccess: response => {
      if (response.ok) {
        navigate("/home");
      }
      else {
        alert("Invalid credentials");
        navigate("/login");
      }
    }
  });
};

export default useLoginUser;