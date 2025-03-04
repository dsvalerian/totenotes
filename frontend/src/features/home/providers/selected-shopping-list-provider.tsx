import {PropsWithChildren, useState} from "react";
import {ShoppingListModel} from "../api/items-queries.ts";
import SelectedShoppingListContext from "../contexts/selected-shopping-list-context.ts";

const SelectedShoppingListProvider = ({children}: PropsWithChildren) => {
  const [selectedShoppingList, setSelectedShoppingList] = useState<ShoppingListModel>({id: -1, name: ""});

  return (
      <SelectedShoppingListContext.Provider value={[selectedShoppingList, setSelectedShoppingList]}>
        {children}
      </SelectedShoppingListContext.Provider>
  );
};

export default SelectedShoppingListProvider;