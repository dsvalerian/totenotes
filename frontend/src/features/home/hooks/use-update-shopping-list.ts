import {ShoppingListModel} from "../api/item-queries.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateListQuery} from "../api/list-queries.ts";

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