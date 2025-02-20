import styles from "./shopping-list.module.css";
import Button from "../../../../shared/components/ui/button/button.tsx";
import {ShoppingItemModel} from "../../api/shopping-items.ts";
import ShoppingItem from "../shopping-item/shopping-item.tsx";
import {ReactElement, useEffect, useState} from "react";
import InputField from "../../../../shared/components/form/input-field/input-field.tsx";
import useSelectedShoppingListContext from "../../contexts/use-selected-shopping-list-context.ts";
import useShoppingItems from "../../hooks/use-shopping-items.ts";
import useUpdateShoppingList from "../../hooks/use-update-shopping-list.ts";
import useAddShoppingItem from "../../hooks/use-add-shopping-item.ts";

const ShoppingList = () => {
  const [selectedShoppingList] = useSelectedShoppingListContext();
  const {status, data: items} = useShoppingItems(selectedShoppingList.id);
  const [name, setName] = useState(selectedShoppingList.name);
  const updateListMutation = useUpdateShoppingList({...selectedShoppingList, name: name});
  const addItemMutation = useAddShoppingItem(selectedShoppingList.id, "New Item");

  let shoppingListItems: ReactElement[] = [];

  useEffect(() => {
    if (selectedShoppingList) {
      setName(selectedShoppingList.name);
    }
  }, [selectedShoppingList]);

  if (status === "success" && items && items.length > 0) {
    shoppingListItems = items?.map((item: ShoppingItemModel) =>
        <ShoppingItem key={item.id} listId={selectedShoppingList.id} item={item} />,
    );
  }

  return (
      <div className={styles["page-content"]}>
        <InputField
            value={name}
            variant={"transparent"}
            size={"large"}
            onChange={e => setName(e.target.value)}
            onBlur={updateListMutation.mutate}
        />
        <ul className={styles["shopping-list"]}>
          {shoppingListItems}
        </ul>
        <div className={styles["button-wrapper"]}>
          <Button
              label={"New Item"}
              onClick={addItemMutation.mutate}
          />
        </div>
      </div>

  );
};

export default ShoppingList;