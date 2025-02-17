export interface UserCredentials {
  email: string,
  password: string
}

export interface ApiResponse {
  success: boolean,
  message: string,
}

export const createNewUser = async (user: UserCredentials): Promise<ApiResponse> => {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(user),
  });

  return {...(await response.json()), success: response.ok};
};

export const loginUser = async (user: UserCredentials): Promise<ApiResponse> => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(user)
  });

  return {...(await response.json()), success: response.ok};
};