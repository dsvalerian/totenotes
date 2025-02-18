import styles from "./home-page-nav.module.css";
import NavItem from "../nav-item/nav-item.tsx";
import Button from "../../../../shared/components/ui/button/button.tsx";
import {ShoppingListModel} from "../../api/queries.ts";

type HomePageNavProps = {
  title: string,
  user: string,
  lists: ShoppingListModel[],
  selectedList: ShoppingListModel,
  onSelectedList: (list: ShoppingListModel) => void,
  onNewList: (name: string) => void,
};

const HomePageNav = ({title, user, lists, selectedList, onSelectedList, onNewList}: HomePageNavProps) => {
  const navItems = lists.map(list =>
    <NavItem
        key={list.id}
        label={list.name}
        selected={list.id === selectedList.id}
        onClick={() => onSelectedList(list)}
    />
  );

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
              onClick={() => onNewList("New List")}
          />
        </div>
      </nav>
  );
};

export default HomePageNav;