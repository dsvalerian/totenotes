import {fetchLists} from "../api/shopping-items.ts";
import {useQuery} from "@tanstack/react-query";

const useShoppingLists = () => {
  return useQuery({
    queryKey: ["shopping-lists"],
    queryFn: fetchLists
  });
};

export default useShoppingLists;