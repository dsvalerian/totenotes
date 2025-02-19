import {ShoppingListModel, updateList} from "../api/shopping-items.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const useUpdateShoppingList = (shoppingList: ShoppingListModel) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateList(shoppingList),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["shopping-lists"]
      });
    }
  });
};

export default useUpdateShoppingList;