import styles from "./shopping-list-container.module.css";
import Button from "../../../../shared/components/ui/button/button.tsx";
import InputField from "../../../../shared/components/form/input-field/input-field.tsx";
import useSelectedListContext from "../../hooks/use-selected-list-context.ts";
import DeleteButton from "../../../../shared/components/ui/delete-button/delete-button.tsx";
import useList from "../../hooks/use-list.ts";
import {useEffect, useState} from "react";

const ShoppingListContainer = () => {
  const [selectedListId] = useSelectedListContext();
  const {data: selectedList, isLoading, error} = useList(selectedListId);
  const [listName, setListName] = useState<string>("");

  useEffect(() => {
    if (!isLoading && !error && selectedList) {
      setListName(selectedList.name);
    }
  }, [selectedList, error, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
      <div className={styles["page-content"]}>
        <div className={styles["header-bar"]}>
          <div className={styles["title-field"]}>
            <InputField
                value={listName}
                variant={"transparent"}
                size={"large"}
                onChange={e => setListName(e.target.value)}
                onBlur={() => console.log("blur")}
            />
          </div>
          <DeleteButton onClick={() => console.log("delete")} />
        </div>
        <ul className={styles["shopping-list"]}>
          items go here
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

export default ShoppingListContainer;