import {ShoppingItemModel, updateItemQuery} from "../api/items-queries.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const useUpdateShoppingItem = (listId: number, shoppingItem: ShoppingItemModel) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateItemQuery(shoppingItem),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["shopping-lists", listId],
      });
    }
  });
};

export default useUpdateShoppingItem;