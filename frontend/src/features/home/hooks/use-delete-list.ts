import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteListQuery} from "../api/list-queries.ts";

const useDeleteList = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteListQuery(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["shopping-lists"]
      });
    }
  });
};

export default useDeleteList;