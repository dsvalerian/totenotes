import styles from "./list-container.module.css";
import Button from "../../../../shared/components/ui/button/button.tsx";
import InputField from "../../../../shared/components/form/input-field/input-field.tsx";
import useSelectedListContext from "../../hooks/use-selected-list-context.ts";
import DeleteButton from "../../../../shared/components/ui/delete-button/delete-button.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import ShoppingListItem from "../shopping-item/shopping-list-item.tsx";
import useList from "../../hooks/use-list.ts";

const ListContainer = () => {
  const [selectedListId] = useSelectedListContext();
  const {getList, updateList, deleteList} = useList(selectedListId);
  const [listName, setListName] = useState<string>("");
  const [isUserEditing, setIsUserEditing] = useState(false);

  useEffect(() => {
    if (getList.status === "success" && !isUserEditing) {
      setListName(getList.data.name);
    }
  }, [selectedListId, getList]);

  console.log(getList.status, getList.data);

  if (getList.status === "pending") {
    return <div></div>;
  }

  if (getList.status === "error") {
    return <div>Error: {getList.error.message}</div>;
  }

  const handleEditingName = (e: ChangeEvent<HTMLInputElement>) => {
    setListName(e.target.value);
    setIsUserEditing(true);
  };

  const handleStoppedEditingName = () => {
    updateList.mutate({name: listName});
    setIsUserEditing(false);
  };

  const handleDeleteList = () => {
    deleteList.mutate();
  };

  return (
      <div className={styles["page-content"]}>
        <div className={styles["header-bar"]}>
          <div className={styles["title-field"]}>
            <InputField
                value={listName}
                variant={"transparent"}
                size={"large"}
                onChange={handleEditingName}
                onBlur={handleStoppedEditingName}
            />
          </div>
          <DeleteButton onClick={handleDeleteList} />
        </div>
        <ul className={styles["shopping-list"]}>
          {getList.data.items.map(item => <ShoppingListItem key={"list-item-" + item.id} item={item} />)}
        </ul>
        <div className={styles["button-wrapper"]}>
          <Button
              label={"New Item"}
              onClick={() => console.log("new item button")}
          />
        </div>
      </div>

  );
};

export default ListContainer;