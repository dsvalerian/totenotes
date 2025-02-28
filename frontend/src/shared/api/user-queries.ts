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

export const loginUserQuery = async (email: string, password: string): Promise<User> => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({email: email, password: password})
  });

  if (!response.ok) {
    throw new Error((await response.json()).error || "Failed to login");
  }

  return await response.json();
};

export const logoutUserQuery = async () => {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error((await response.json()).error || "Failed to logout");
  }

  return await response.json();
};

export const createNewUserQuery = async (email: string, password: string): Promise<User> => {
  const response = await fetch("/api/auth/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({email: email, password: password})
  });

  if (!response.ok) {
    throw new Error((await response.json()).error || "Failed to create new user");
  }

  return await response.json();
};