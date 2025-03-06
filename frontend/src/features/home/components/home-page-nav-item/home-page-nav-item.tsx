import styles from "./home-page-nav-item.module.css";
import useSelectedListContext from "../../hooks/use-selected-list-context.ts";
import {ListMetadata} from "../../hooks/use-lists.ts";

interface NavItemProps {
  list: ListMetadata
}

const HomePageNavItem = ({list}: NavItemProps) => {
  const [selectedListId, setSelectedListId] = useSelectedListContext();

  const isSelected = selectedListId && selectedListId === list.id;

  return (
      <li
          className={`${styles["nav-item"]} ${isSelected && styles["selected"]}`}
          onClick={() => setSelectedListId(list.id)}
      >
        <div className={styles["list-label"]}>
          {list.name}
        </div>
      </li>
  );
};

export default HomePageNavItem;