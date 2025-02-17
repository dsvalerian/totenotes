import styles from "./shopping-list.module.css";
import Button from "../../../../shared/components/ui/button/button.tsx";
import {ShoppingItemModel} from "../../api/queries.ts";
import ShoppingItem from "../shopping-item/shopping-item.tsx";

interface ShoppingListProps {
  items: ShoppingItemModel[];
}

const ShoppingList = ({items}: ShoppingListProps) => {
  const shoppingListItems = items.map((item: ShoppingItemModel) =>
    <ShoppingItem key={item.id} name={item.name} quantity={item.quantity} quantityUnit={item.quantityUnit} />
  );

  return (
      <ul className={styles['shopping-list']}>
        {shoppingListItems}
        <div className={styles['button-wrapper']}>
          <Button label={'New Item'} onClick={() => console.log("clicked")}/>
        </div>
      </ul>
  );
};

export default ShoppingList;