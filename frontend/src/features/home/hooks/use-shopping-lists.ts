import {useQuery} from "@tanstack/react-query";
import {fetchLists} from "../api/shopping-lists.ts";

const useShoppingLists = () => {
  return useQuery({
    queryKey: ["shopping-lists"],
    queryFn: fetchLists
  });
};

export default useShoppingLists;