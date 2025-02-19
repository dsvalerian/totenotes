import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addItem} from "../api/shopping-items.ts";

const useAddShoppingItem = (listId: number, itemName: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => addItem(listId, itemName),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["shopping-items", listId],
      });
    }
  });
};

export default useAddShoppingItem;