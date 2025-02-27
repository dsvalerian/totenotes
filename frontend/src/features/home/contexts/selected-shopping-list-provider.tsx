import {SelectedShoppingListContext} from "./use-selected-shopping-list-context.ts";
import {PropsWithChildren, useState} from "react";
import {ShoppingListModel} from "../api/items-queries.ts";

const SelectedShoppingListProvider = ({children}: PropsWithChildren) => {
  const [selectedShoppingList, setSelectedShoppingList] = useState<ShoppingListModel>({id: -1, name: ""});

  return (
      <SelectedShoppingListContext.Provider value={[selectedShoppingList, setSelectedShoppingList]}>
        {children}
      </SelectedShoppingListContext.Provider>
  );
};

export default SelectedShoppingListProvider;