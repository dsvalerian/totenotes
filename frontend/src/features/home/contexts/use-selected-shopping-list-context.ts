import {createContext, useContext} from "react";
import {ShoppingListModel} from "../api/items-queries.ts";

type SelectedShoppingListContextInterface = [ShoppingListModel, (list: ShoppingListModel) => void];

export const SelectedShoppingListContext = createContext<SelectedShoppingListContextInterface | undefined>(undefined);

const useSelectedShoppingListContext = () => {
  const context = useContext(SelectedShoppingListContext);
  if (!context) {
    throw new Error("useSelectedShoppingListContext must be used within the appropriate provider");
  }

  return context;
};

export default useSelectedShoppingListContext;