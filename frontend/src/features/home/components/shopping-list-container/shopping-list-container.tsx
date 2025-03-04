import styles from "./shopping-list-container.module.css";
import Button from "../../../../shared/components/ui/button/button.tsx";
import {ShoppingItemModel} from "../../api/items-queries.ts";
import ShoppingListItem from "../shopping-item/shopping-list-item.tsx";
import {ReactElement, useEffect, useState} from "react";
import InputField from "../../../../shared/components/form/input-field/input-field.tsx";
import useSelectedShoppingListContext from "../../hooks/use-selected-shopping-list-context.ts";
import useUpdateShoppingList from "../../hooks/use-update-shopping-list.ts";
import useAddShoppingItem from "../../hooks/use-add-shopping-item.ts";
import useShoppingList from "../../hooks/use-shopping-list.ts";
import DeleteButton from "../../../../shared/components/ui/delete-button/delete-button.tsx";
import useDeleteList from "../../hooks/use-delete-list.ts";

const ShoppingListContainer = () => {
  const [selectedShoppingList] = useSelectedShoppingListContext();
  const {status, data: shoppingListDetails} = useShoppingList(selectedShoppingList.id);
  const [name, setName] = useState(selectedShoppingList.name);
  const updateListMutation = useUpdateShoppingList({...selectedShoppingList, name: name});
  const deleteListMutation = useDeleteList(selectedShoppingList.id);
  const addItemMutation = useAddShoppingItem(selectedShoppingList.id, "New Item");

  let shoppingListItems: ReactElement[] = [];

  useEffect(() => {
    if (selectedShoppingList) {
      setName(selectedShoppingList.name);
    }
  }, [selectedShoppingList]);

  if (status === "success" && shoppingListDetails.items) {
    shoppingListItems = shoppingListDetails.items.map((item: ShoppingItemModel) =>
        <ShoppingListItem key={item.id} listId={selectedShoppingList.id} item={item} />,
    );
  }

  return (
      <div className={styles["page-content"]}>
        <div className={styles["header-bar"]}>
          <div className={styles["title-field"]}>
            <InputField
                value={name}
                variant={"transparent"}
                size={"large"}
                onChange={e => setName(e.target.value)}
                onBlur={updateListMutation.mutate}
            />
          </div>
          <DeleteButton onClick={deleteListMutation.mutate} />
        </div>
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

export default ShoppingListContainer;