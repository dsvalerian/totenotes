import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";

const logoutUserQuery = async () => {
  return await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });
};

const useLogoutUser = (successNavigate?: string) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUserQuery,
    onSuccess: response => {
      if (response.ok) {
        if (successNavigate) {
          navigate(successNavigate);
        }
      }
      else {
        alert("Could not logout user");
      }
    }
  });
};

export default useLogoutUser;