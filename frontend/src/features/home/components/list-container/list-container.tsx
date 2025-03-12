import styles from "./list-container.module.css";
import Button from "../../../../shared/components/ui/button/button.tsx";
import InputField from "../../../../shared/components/form/input-field/input-field.tsx";
import useSelectedListContext from "../../hooks/use-selected-list-context.ts";
import DeleteButton from "../../../../shared/components/ui/delete-button/delete-button.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import ListItem from "../list-item/list-item.tsx";
import useList from "../../hooks/use-list.ts";
import {ItemCreate} from "../../hooks/use-item.ts";

const NEW_ITEM: ItemCreate = {
  name: "New Item",
};

const ListContainer = () => {
  const [selectedListId, setSelectedListId] = useSelectedListContext();
  const {getList, updateList, deleteList, createItem} = useList(selectedListId);
  const [listName, setListName] = useState<string>("");
  const [isUserEditing, setIsUserEditing] = useState(false);

  // Set the initial name to that of the selected list.
  useEffect(() => {
    if (getList?.status === "success" && !isUserEditing) {
      setListName(getList.data.name);
    }
  }, [getList, isUserEditing]);

  if (getList.status === "pending" || !getList) {
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

  const handleDeleteList = async () => {
    deleteList.mutate(undefined, {
      onSuccess: () => {
        setSelectedListId(null);
      }
    });
  };

  const itemElements = getList.data.items
      .sort((a, b) => a.id - b.id)
      .map(item => <ListItem key={"list-item-" + item.id} item={item} />);

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
          {itemElements}
        </ul>
        <div className={styles["button-wrapper"]}>
          <Button
              label={"New Item"}
              onClick={() => createItem.mutate(NEW_ITEM)}
          />
        </div>
      </div>

  );
};

export default ListContainer;