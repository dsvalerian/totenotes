import styles from "./home-page-nav.module.css";
import NavItem from "../nav-item/nav-item.tsx";
import Button from "../../../../shared/components/ui/button/button.tsx";
import {ReactElement, useEffect} from "react";
import useShoppingLists from "../../hooks/use-shopping-lists.ts";
import useAddShoppingList from "../../hooks/use-add-shopping-list.ts";
import useSelectedShoppingListContext from "../../contexts/use-selected-shopping-list-context.ts";

type HomePageNavProps = {
  title: string,
  user: string,
};

const HomePageNav = ({title, user}: HomePageNavProps) => {
  const [selectedShoppingList, setSelectedShoppingList] = useSelectedShoppingListContext();
  const {status, data: lists} = useShoppingLists();
  const addListMutation = useAddShoppingList("New List");

  useEffect(() => {
    if (status === "success" && lists && lists.length > 0) {
      setSelectedShoppingList(lists[0]);
      console.log("selecting list", lists[0]);
    }
  }, [status, lists, setSelectedShoppingList]);

  let navItems: ReactElement[] = [];
  if (status === "success") {
    navItems = lists.map(list =>
        <NavItem
            key={list.id}
            label={list.name}
            selected={list.id === selectedShoppingList.id}
            onClick={() => setSelectedShoppingList(list)}
        />
    );
  }

  return (
      <nav className={styles["nav"]}>
        <p className={styles["header"]}>{user}</p>
        <h2 className={styles["title"]}>{title}</h2>
        <ul className={styles["item-list"]}>
          {navItems}
        </ul>
        <div className={styles["button"]}>
          <Button
              label={"New List"}
              onClick={addListMutation.mutate}
          />
        </div>
      </nav>
  );
};

export default HomePageNav;