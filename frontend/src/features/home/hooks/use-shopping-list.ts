import {useQuery} from "@tanstack/react-query";
import {getListQuery} from "../api/lists-queries.ts";

const useShoppingList = (listId: number) => {
  return useQuery({
    queryKey: ["shopping-lists", listId],
    queryFn: () => getListQuery(listId)
  });
};

export default useShoppingList;