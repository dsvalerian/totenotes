import styles from "./shopping-list-item.module.css";
import {ShoppingItemModel} from "../../api/items-queries.ts";
import InputField from "../../../../shared/components/form/input-field/input-field.tsx";
import {useState} from "react";
import useUpdateShoppingItem from "../../hooks/use-update-shopping-item.ts";
import useDeleteItem from "../../hooks/use-delete-item.ts";
import Button from "../../../../shared/components/ui/button/button.tsx";

interface ShoppingItemProps {
  listId: number,
  item: ShoppingItemModel
}

const ShoppingListItem = ({listId, item}: ShoppingItemProps) => {
  const [name, setName] = useState(item.name);
  const updateItemMutation = useUpdateShoppingItem(listId, {...item, name});
  const deleteItemMutation = useDeleteItem(listId, item.id);

  return (
      <li className={styles["shopping-item"]}>
        <div className={styles["name-field"]}>
          <InputField
              value={name}
              onChange={e => setName(e.target.value)}
              variant={"transparent"}
              onBlur={updateItemMutation.mutate}
          />
        </div>
        <div>
          <Button label={"Delete"} onClick={() => deleteItemMutation.mutate()} />
        </div>
      </li>
  );
};

export default ShoppingListItem;