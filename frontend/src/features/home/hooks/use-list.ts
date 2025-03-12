import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Item, ItemCreate} from "./use-item.ts";

export interface List {
  id: number,
  owner_id: number,
  name: string,
  created_at: string,
  updated_at: string,
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

const createItemQuery = async (listId: number, item: ItemCreate) => {
  const response = await fetch(`/api/lists/${listId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
          "Accept": "application/json"
    },
    body: JSON.stringify(item)
  });

  if (!response.ok) {
    const error = await response.json();
    throw {message: error.error};
  }

  return await response.json();
};

const QUERY_CACHE_KEY = "lists";

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
        queryKey: [QUERY_CACHE_KEY]
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!listId) {
        return Promise.reject("No list selected");
      }

      return deleteListQuery(listId);
    },
    onSuccess: async () => {
      // Invalidating queries causes a refetch on all the child caches, including the one storing this newly-deleted
      // list. This causes failing refetches until it gives up. To prevent it from attempting to refetch the deleted
      // list, we remove the query from the cache entirely before invalidating.
      queryClient.removeQueries({queryKey: [QUERY_CACHE_KEY, listId]});

      await queryClient.invalidateQueries({
        queryKey: [QUERY_CACHE_KEY],
      });
    }
  });

  const createItemMutation = useMutation({
    mutationFn: async (item: ItemCreate) => {
      if (!listId) {
        return Promise.reject("No list selected");
      }

      return createItemQuery(listId, item);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_CACHE_KEY, listId],
      });
    }
  });

  return {
    getList: getQuery,
    updateList: updateMutation,
    deleteList: deleteMutation,
    createItem: createItemMutation,
  };
};

export default useList;