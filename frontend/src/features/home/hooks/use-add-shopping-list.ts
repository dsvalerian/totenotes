import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createListQuery} from "../api/list-queries.ts";

const useAddShoppingList = (listName: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createListQuery(listName),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["shopping-lists"]
      });
    }
  });
};

export default useAddShoppingList;