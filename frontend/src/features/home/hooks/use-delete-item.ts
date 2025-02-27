import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteItemQuery} from "../api/items-queries.ts";

const useDeleteItem = (listId: number, id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteItemQuery(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["shopping-lists", listId],
      });
    }
  });
};

export default useDeleteItem;