import {useQuery} from "@tanstack/react-query";
import List from "../types/list.ts";

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

const useList = (listId: number | null) => {
  return useQuery({
    queryKey: ["shopping-lists", listId],
    queryFn: () => getListQuery(listId!),
    enabled: !!listId
  });
};

export default useList;