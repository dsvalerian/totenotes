import {useQuery} from "@tanstack/react-query";

const getUserQuery = async () => {
  return await fetch("/api/auth/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  });
};

const useGetLoggedInUser = () => {
  return useQuery({
    queryKey: ["logged-in-user"],
    queryFn: getUserQuery,
  });
};

export default useGetLoggedInUser;