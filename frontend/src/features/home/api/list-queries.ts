import List from "../types/list.ts";

export const getAllListsQuery = async (): Promise<List[]> => {
  const response = await fetch("/api/lists", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw {message: error.error};
  }

  return await response.json();
};

export const createListQuery = async (name: string): Promise<List> => {
  const response = await fetch("/api/lists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({name: name})
  });

  if (!response.ok) {
    const error = await response.json();
    throw {message: error.error};
  }

  return await response.json();
};

export const updateListQuery = async (list: List): Promise<List> => {
  const response = await fetch("/api/lists", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(list)
  });

  if (!response.ok) {
    const error = await response.json();
    throw {message: error.error};
  }

  return await response.json();
};

export const deleteListQuery = async (id: number): Promise<null> => {
  const response = await fetch(`/api/lists/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw {message: error.error};
  }

  return await response.json();
};