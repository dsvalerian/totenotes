import {useQuery} from "@tanstack/react-query";
import {getAllListsQuery} from "../api/lists-queries.ts";

const useShoppingLists = () => {
  return useQuery({
    queryKey: ["shopping-lists"],
    queryFn: getAllListsQuery
  });
};

export default useShoppingLists;