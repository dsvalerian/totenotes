import {ShoppingListModel} from "./shopping-items.ts";
import store from "./mock.ts";

export const fetchLists = async (): Promise<ShoppingListModel[]> => {
  console.log("Fetching lists");

  return store
  .sort((a, b) => b.id - a.id)
  .map(list => ({
    id: list.id,
    name: list.name,
  }));
};

export const addList = async (name: string): Promise<ShoppingListModel> => {
  console.log("Adding new list");

  const highestId = store.reduce((acc: number, currentList) => {
    return currentList.id > acc ? currentList.id : acc;
  }, 0);

  const newList: ShoppingListModel = {
    id: highestId + 1,
    name: name
  };

  store.push({...newList, items: []});
  return newList;
};

export const updateList = async (list: ShoppingListModel): Promise<ShoppingListModel> => {
  console.log("Updating list", list);

  const listToUpdate = store.find(currentList => currentList.id === list.id);
  if (listToUpdate) {
    listToUpdate.name = list.name;
  }

  return list;
};