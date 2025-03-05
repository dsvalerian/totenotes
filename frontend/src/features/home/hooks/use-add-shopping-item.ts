import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createItemQuery} from "../api/item-queries.ts";

const useAddShoppingItem = (listId: number, itemName: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createItemQuery(listId, itemName),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["shopping-lists", listId],
      });
    }
  });
};

export default useAddShoppingItem;