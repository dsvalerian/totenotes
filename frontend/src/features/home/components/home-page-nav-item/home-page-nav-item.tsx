import styles from "./home-page-nav-item.module.css";
import useSelectedListContext from "../../hooks/use-selected-list-context.ts";
import useList from "../../hooks/use-list.ts";

interface NavItemProps {
  listId: number
}

const HomePageNavItem = ({listId}: NavItemProps) => {
  const [selectedListId, setSelectedListId] = useSelectedListContext();
  const {data: list, isLoading, error} = useList(listId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const isSelected = selectedListId && selectedListId === listId;

  return (
      <li
          className={`${styles["nav-item"]} ${isSelected && styles["selected"]}`}
          onClick={() => setSelectedListId(listId)}
      >
        <div className={styles["list-label"]}>
          {list?.name}
        </div>
      </li>
  );
};

export default HomePageNavItem;