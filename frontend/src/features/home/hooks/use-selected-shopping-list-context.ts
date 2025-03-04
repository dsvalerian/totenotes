import {useContext} from "react";
import SelectedShoppingListContext from "../contexts/selected-shopping-list-context.ts";

const useSelectedShoppingListContext = () => {
  const context = useContext(SelectedShoppingListContext);
  if (!context) {
    throw new Error("useSelectedShoppingListContext must be used within the appropriate provider");
  }

  return context;
};

export default useSelectedShoppingListContext;