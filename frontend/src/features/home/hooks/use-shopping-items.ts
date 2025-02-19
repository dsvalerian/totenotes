import {useQuery} from "@tanstack/react-query";
import {fetchItems} from "../api/shopping-items.ts";

const useShoppingItems = (listId: number) => {
  return useQuery({
    queryKey: ["shopping-items", listId],
    queryFn: () => fetchItems(listId),
    enabled: listId >= 0,
  });
};

export default useShoppingItems;