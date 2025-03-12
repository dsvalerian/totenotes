import {useMutation, useQueryClient} from "@tanstack/react-query";

export interface Item {
  id: number,
  name: string,
  list_id: number,
  created_at: Date,
  updated_at: Date
}

type ItemUpdate = Pick<Item, "name">;
export type ItemCreate = Pick<Item, "name">;

const deleteItemQuery = async (listId: number, itemId: number) => {
  const response = await fetch(`/api/lists/${listId}/${itemId}`, {
    method: "DELETE",
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

const updateItemQuery = async (listId: number, itemId: number, item: ItemUpdate): Promise<Item> => {
  const response = await fetch(`/api/lists/${listId}/${itemId}`, {
    method: "PUT",
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

// Using "lists" as key because we refresh the cache for a single list (ie all the items), since we're not caching
// individual items (for now, i guess)
const QUERY_CACHE_KEY = "lists";

// Custom hook for deleting/updating a single item in a list
const useItem = (listId: number, itemId: number) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteItemQuery(listId, itemId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_CACHE_KEY, listId],
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: (item: ItemUpdate) => updateItemQuery(listId, itemId, item),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_CACHE_KEY, listId],
      });
    }
  });

  return {
    deleteItem: deleteMutation,
    updateItem: updateMutation,
  };
};

export default useItem;