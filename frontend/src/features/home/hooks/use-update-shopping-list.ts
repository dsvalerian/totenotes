import {ShoppingListModel} from "../api/items-queries.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateListQuery} from "../api/lists-queries.ts";

const useUpdateShoppingList = (shoppingList: ShoppingListModel) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateListQuery(shoppingList),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["shopping-lists"]
      });
    }
  });
};

export default useUpdateShoppingList;