import styles from "./home-page-layout.module.css";
import HomePageNav from "../home-page-nav/home-page-nav.tsx";
import ShoppingList from "../shopping-list/shopping-list.tsx";
import {addList, fetchLists, ShoppingListModel} from "../../api/queries.ts";
import {useEffect, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

const EMPTY_LIST: ShoppingListModel = {
  id: -1,
  name: ""
};

const HomePageLayout = () => {
  const queryClient = useQueryClient();

  const [selected, setSelected] = useState<ShoppingListModel>(EMPTY_LIST);
  const {status, data: lists} = useQuery<ShoppingListModel[]>({
    queryKey: ["lists"],
    queryFn: fetchLists,
  });

  useEffect(() => {
    if (status === "success") {
      setSelected(lists[0]);
    }
  }, [status, lists]);

  const addListMutation = useMutation({
    mutationFn: addList,
    onSuccess: (newList: ShoppingListModel) => {
      queryClient.setQueryData(
          ["lists"],
          (oldLists: ShoppingListModel[]) => {
            return [...oldLists, newList];
          }
      );
    }
  });

  return (
      <div className={styles["layout"]}>
        <HomePageNav
            title={"Shopping Lists"}
            user={"username@example.com"}
            lists={lists || []}
            selectedList={selected}
            onSelectedList={setSelected}
            onNewList={(name: string) => addListMutation.mutate(name)}
        />
        <div className={styles["page-content"]}>
          <h1>{selected.name}</h1>
          <ShoppingList list={selected} />
        </div>
      </div>
  );
};

export default HomePageLayout;