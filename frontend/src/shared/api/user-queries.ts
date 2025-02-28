import User from "../types/user.ts";
import UnauthorizedError from "../types/unauthorized-error.ts";

export const getUserQuery = async (): Promise<User> => {
  const response = await fetch("/api/auth/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  });

  if (!response.ok) {
    throw new UnauthorizedError((await response.json()).message || "Unauthorized");
  }

  return await response.json();
};