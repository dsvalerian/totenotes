import {useContext} from "react";
import SelectedListContext from "../contexts/selected-list-context.ts";

const useSelectedListContext = () => {
  const context = useContext(SelectedListContext);
  if (!context) {
    throw new Error("context must be used within the appropriate provider");
  }

  return context;
};

export default useSelectedListContext;