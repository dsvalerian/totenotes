import styles from "./shopping-list-item.module.css";
import InputField from "../../../../shared/components/form/input-field/input-field.tsx";
import {useState} from "react";
import Button from "../../../../shared/components/ui/button/button.tsx";
import Item from "../../types/item.ts";

interface ShoppingItemProps {
  item: Item
}

const ShoppingListItem = ({item}: ShoppingItemProps) => {
  const [name, setName] = useState(item.name);

  return (
      <li className={styles["shopping-item"]}>
        <div className={styles["name-field"]}>
          <InputField
              value={name}
              onChange={e => setName(e.target.value)}
              variant={"transparent"}
              onBlur={() => console.log("blur")}
          />
        </div>
        <div>
          <Button label={"Delete"} onClick={() => console.log("delete item")} />
        </div>
      </li>
  );
};

export default ShoppingListItem;