import styles from "./home-page-nav.module.css";
import HomePageNavItem from "../home-page-nav-item/home-page-nav-item.tsx";
import Button from "../../../../shared/components/ui/button/button.tsx";
import {ReactElement} from "react";
import useAuthContext from "../../../../shared/hooks/use-auth-context.ts";
import useLists from "../../hooks/use-lists.ts";

const HomePageNav = () => {
  const {getLists, createList} = useLists();
  const {user, logout} = useAuthContext();

  let navItems: ReactElement[] = [];
  if (getLists.status === "success") {
    navItems = getLists.data.map(list =>
        <HomePageNavItem
            key={"home-page-nav-item=" + list.id}
            list={list}
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
              onClick={() => createList.mutate({name: "New List"})}
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