import styles from "./shopping-item.module.css";
import {ShoppingItemModel} from "../../api/shopping-items.ts";
import InputField from "../../../../shared/components/form/input-field/input-field.tsx";
import {useState} from "react";
import useUpdateShoppingItem from "../../hooks/use-update-shopping-item.ts";

interface ShoppingItemProps {
  listId: number,
  item: ShoppingItemModel
}

const ShoppingItem = ({listId, item}: ShoppingItemProps) => {
  const [name, setName] = useState(item.name);
  const updateItemMutation = useUpdateShoppingItem(listId, {...item, name});

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
      </li>
  );
};

export default ShoppingItem;