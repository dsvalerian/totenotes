import {PropsWithChildren, useState} from "react";
import SelectedListContext from "../contexts/selected-list-context.ts";

const SelectedListProvider = ({children}: PropsWithChildren) => {
  const [selectedListId, setSelectedListId] = useState<number | null>(null);

  return (
      <SelectedListContext.Provider value={[selectedListId, setSelectedListId]}>
        {children}
      </SelectedListContext.Provider>
  );
};

export default SelectedListProvider;