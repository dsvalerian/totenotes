import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

import Item from "../types/item.ts";

export interface List {
  id: number,
  ownerId: number,
  name: string,
  createdAt: Date,
  updatedAt: Date,
  items: Item[]
}

type ListUpdate = Pick<List, "name">;

// Get a single list, including its items
const getListQuery = async (listId: number): Promise<List> => {
  const response = await fetch(`/api/lists/${listId}`, {
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

  return response.json();
};

// Update a single list
const updateListQuery = async (listId: number, list: ListUpdate): Promise<List> => {
  const response = await fetch(`/api/lists/${listId}`, {
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

// Delete a list
const deleteListQuery = async (listId: number): Promise<null> => {
  const response = await fetch(`/api/lists/${listId}`, {
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

const QUERY_CACHE_KEY = "shopping-lists";

// Custom hook that returns cached/queried lists and update/delete functions
const useList = (listId: number | null) => {
  const queryClient = useQueryClient();

  const getQuery = useQuery({
    queryKey: [QUERY_CACHE_KEY, listId],
    queryFn: () => getListQuery(listId!),
    enabled: !!listId
  });

  const updateMutation = useMutation({
    mutationFn: (list: ListUpdate) => {
      if (!listId) {
        return Promise.reject("No list selected");
      }

      return updateListQuery(listId, list);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_CACHE_KEY, listId]
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => {
      if (!listId) {
        return Promise.reject("No list selected");
      }

      return deleteListQuery(listId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_CACHE_KEY]
      });
    }
  });

  return {
    getList: getQuery,
    updateList: updateMutation,
    deleteList: deleteMutation,
  };
};

export default useList;