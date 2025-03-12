import styles from "./list-item.module.css";
import InputField from "../../../../shared/components/form/input-field/input-field.tsx";
import {useState} from "react";
import useItem, {Item} from "../../hooks/use-item.ts";
import DeleteButton from "../../../../shared/components/ui/delete-button/delete-button.tsx";
import Checkbox from "../../../../shared/components/form/checkbox/checkbox.tsx";

interface ListItemProps {
  item: Item
}

const ListItem = ({item}: ListItemProps) => {
  const [name, setName] = useState(item.name);
  const {updateItem, deleteItem} = useItem(item.list_id, item.id);

  return (
      <li className={styles["list-item"]}>
        <div className={styles["checkbox"]}>
          <Checkbox
              id={"checkbox-" + item.id}
              scale={1.5}
              checked={item.checked}
              onClick={() => updateItem.mutate({name: name, checked: !item.checked})}
          />
        </div>
        <div className={styles["name-field"]}>
          <InputField
              value={name}
              onChange={e => setName(e.target.value)}
              variant={"transparent"}
              onBlur={() => updateItem.mutate({name: name, checked: false})}
          />
        </div>
        <DeleteButton
            onClick={deleteItem.mutate}
        />
      </li>
  );
};

export default ListItem;