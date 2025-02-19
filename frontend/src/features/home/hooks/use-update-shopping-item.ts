import {ShoppingItemModel, updateItem} from "../api/shopping-items.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const useUpdateShoppingItem = (listId: number, shoppingItem: ShoppingItemModel) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateItem(shoppingItem),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["shopping-items", listId],
      });
    }
  });
};

export default useUpdateShoppingItem;