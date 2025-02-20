import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addList} from "../api/shopping-lists.ts";

const useAddShoppingList = (listName: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => addList(listName),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["shopping-lists"]
      });
    }
  });
};

export default useAddShoppingList;