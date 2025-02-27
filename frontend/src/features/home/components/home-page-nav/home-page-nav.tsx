import styles from "./home-page-nav.module.css";
import NavItem from "../nav-item/nav-item.tsx";
import Button from "../../../../shared/components/ui/button/button.tsx";
import {ReactElement, useEffect} from "react";
import useShoppingLists from "../../hooks/use-shopping-lists.ts";
import useAddShoppingList from "../../hooks/use-add-shopping-list.ts";
import useSelectedShoppingListContext from "../../contexts/use-selected-shopping-list-context.ts";
import useLogoutUser from "../../../auth/hooks/use-logout-user.ts";
import useGetLoggedInUser from "../../../auth/hooks/use-get-logged-in-user.ts";
import {useNavigate} from "react-router-dom";

type HomePageNavProps = {
  title: string,
  user: string,
};

const HomePageNav = ({title, user}: HomePageNavProps) => {
  const [selectedShoppingList, setSelectedShoppingList] = useSelectedShoppingListContext();
  const {status: shoppingListStatus, data: lists} = useShoppingLists();
  const addListMutation = useAddShoppingList("New List");
  const logoutUserMutation = useLogoutUser("/login");
  const {status: loggedInUserStatus, data: loggedInUser} = useGetLoggedInUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUserStatus === "success" && !loggedInUser.ok) {
      navigate("/login");
    }
  }, [loggedInUserStatus, loggedInUser, navigate]);

  useEffect(() => {
    if (shoppingListStatus === "success" && lists && lists.length > 0) {
      setSelectedShoppingList(lists[0]);
    }
  }, [shoppingListStatus, lists, setSelectedShoppingList]);

  let navItems: ReactElement[] = [];
  if (shoppingListStatus === "success") {
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
        <div className={styles["button"]}>
          <Button
              label={"Logout"}
              onClick={logoutUserMutation.mutate}
          />
        </div>
      </nav>
  );
};

export default HomePageNav;