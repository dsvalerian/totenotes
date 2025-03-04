import styles from "./home-page-nav.module.css";
import HomePageNavItem from "../home-page-nav-item/home-page-nav-item.tsx";
import Button from "../../../../shared/components/ui/button/button.tsx";
import {ReactElement, useEffect} from "react";
import useShoppingLists from "../../hooks/use-shopping-lists.ts";
import useAddShoppingList from "../../hooks/use-add-shopping-list.ts";
import useSelectedShoppingListContext from "../../hooks/use-selected-shopping-list-context.ts";
import useAuthContext from "../../../../shared/hooks/use-auth-context.ts";

const HomePageNav = () => {
  const [selectedShoppingList, setSelectedShoppingList] = useSelectedShoppingListContext();
  const {status: shoppingListStatus, data: lists} = useShoppingLists();
  const addListMutation = useAddShoppingList("New List");
  const {user, logout} = useAuthContext();

  useEffect(() => {
    if (shoppingListStatus === "success" && lists && lists.length > 0) {
      setSelectedShoppingList(lists[0]);
    }
  }, [shoppingListStatus, lists, setSelectedShoppingList]);

  let navItems: ReactElement[] = [];
  if (shoppingListStatus === "success") {
    navItems = lists.map(list =>
        <HomePageNavItem
            key={list.id}
            label={list.name}
            selected={list.id === selectedShoppingList.id}
            onClick={() => setSelectedShoppingList(list)}
        />
    );
  }

  return (
      <nav className={styles["nav"]}>
        <p className={styles["header"]}>{user?.email || "Loading..."}</p>
        <h2 className={styles["title"]}>{"Shopping Lists"}</h2>
        <div className={styles["button"]}>
          <Button
              label={"New List"}
              onClick={addListMutation.mutate}
          />
        </div>
        <ul className={styles["item-list"]}>
          {navItems}
        </ul>
        <div className={styles["button"]}>
          <Button
              label={"Logout"}
              onClick={logout}
              variant="outline"
          />
        </div>
      </nav>
  );
};

export default HomePageNav;