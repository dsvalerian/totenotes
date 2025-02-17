import styles from "./home-page-layout.module.css";
import HomePageNav from "../home-page-nav/home-page-nav.tsx";
import ShoppingList from "../shopping-list/shopping-list.tsx";
import {addList, fetchLists, ShoppingListModel} from "../../api/queries.ts";
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";

const EMPTY_LIST: ShoppingListModel = {
  id: -1,
  name: "",
  items: []
};

const HomePageLayout = () => {
  const [selected, setSelected] = useState<ShoppingListModel>(EMPTY_LIST);

  const newListMutation = useMutation({
    mutationFn: async (name: string) => setSelected(await addList(name))
  });

  const {status, data: lists} = useQuery({
    queryKey: ['lists'],
    queryFn: fetchLists,
  });

  useEffect(() => {
    if (status === "success") {
      setSelected(lists[0]);
    }
  }, [status, lists]);

  return (
      <div className={styles['layout']}>
        <HomePageNav
            title={'Shopping Lists'}
            user={'username@example.com'}
            lists={lists || []}
            selectedList={selected}
            onSelectedList={setSelected}
            onNewList={(name: string) => newListMutation.mutate(name)}
        />
        <div className={styles['page-content']}>
          <h1>{selected.name}</h1>
          <ShoppingList items={selected.items} />
        </div>
      </div>
  );
};

export default HomePageLayout;