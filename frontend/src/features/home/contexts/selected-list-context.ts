import {createContext} from "react";

type SelectedListContextType = [number | null, (listId: number | null) => void];

const SelectedListContext = createContext<SelectedListContextType | null>(null);

export default SelectedListContext;