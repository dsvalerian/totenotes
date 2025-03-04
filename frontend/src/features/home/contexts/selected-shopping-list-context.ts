import {ShoppingListModel} from "../api/items-queries.ts";
import {createContext} from "react";

type SelectedShoppingListContextType = [ShoppingListModel, (list: ShoppingListModel) => void];

const SelectedShoppingListContext = createContext<SelectedShoppingListContextType | undefined>(undefined);

export default SelectedShoppingListContext;