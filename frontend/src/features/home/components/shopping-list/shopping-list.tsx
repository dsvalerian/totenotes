import styles from "./shopping-list.module.css";
import Button from "../../../../shared/components/ui/button/button.tsx";
import {ShoppingListModel} from "../../api/queries.ts";

interface ShoppingListProps {
  list: ShoppingListModel;
}

const ShoppingList = ({list}: ShoppingListProps) => {
  const shoppingListItems = <div></div>;

  return (
      <ul className={styles["shopping-list"]}>
        {shoppingListItems}
        <div className={styles["button-wrapper"]}>
          <Button label={"New Item"} onClick={() => console.log("clicked")}/>
        </div>
      </ul>
  );
};

export default ShoppingList;