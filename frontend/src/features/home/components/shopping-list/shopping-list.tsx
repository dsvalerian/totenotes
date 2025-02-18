import styles from "./shopping-list.module.css";
import Button from "../../../../shared/components/ui/button/button.tsx";
import {addItem, fetchItems, ShoppingItemModel, ShoppingListModel} from "../../api/queries.ts";
import {useMutation, useQuery} from "@tanstack/react-query";
import ShoppingItem from "../shopping-item/shopping-item.tsx";
import {ReactElement} from "react";

interface ShoppingListProps {
  list: ShoppingListModel;
}

const ShoppingList = ({list}: ShoppingListProps) => {
  const addItemMutation = useMutation({
    mutationFn: (name: string) => addItem(list.id, name)
  });

  const {status, data: items} = useQuery<ShoppingItemModel[]>({
    queryKey: [`items-${list.id}`],
    queryFn: () => fetchItems(list.id),
  });

  let shoppingListItems: ReactElement[] = [];
  if (status === "success") {
    shoppingListItems = items?.map((item: ShoppingItemModel) =>
        <ShoppingItem key={item.id} name={item.name} quantity={item.quantity} quantityUnit={item.quantityUnit} />
    );
  }

  return (
      <div className={styles["page-content"]}>
        <h1 className={styles["page-title"]}>{list.name}</h1>
        <ul className={styles["shopping-list"]}>
          {shoppingListItems}
        </ul>
        <div className={styles["button-wrapper"]}>
          <Button
              label={"New Item"}
              onClick={() => addItemMutation.mutate("New Item")}
          />
        </div>
      </div>

  );
};

export default ShoppingList;