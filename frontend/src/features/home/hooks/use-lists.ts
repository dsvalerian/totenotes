import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {List} from "./use-list.ts";

export type ListMetadata = Omit<List, "items">;
type ListCreation = Pick<List, "name">;

// Gets all the lists belonging to the authenticated user
const getAllListsQuery = async (): Promise<ListMetadata[]> => {
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

// Creates a new list owned by the authenticated user
const createListQuery = async (list: ListCreation): Promise<ListMetadata> => {
  const response = await fetch("/api/lists", {
    method: "POST",
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

const QUERY_CACHE_KEY = "shopping-lists";

// Custom hook that returns cached/queried lists and creation function
const useLists = () => {
  const queryClient = useQueryClient();

  const getQuery = useQuery({
    queryKey: [QUERY_CACHE_KEY],
    queryFn: getAllListsQuery
  });

  const createMutation = useMutation({
    mutationFn: (list: ListCreation) => createListQuery(list),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_CACHE_KEY]
      });
    }
  });

  return {
    getLists: getQuery,
    createList: createMutation,
  };
};

export default useLists;