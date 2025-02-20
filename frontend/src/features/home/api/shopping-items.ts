import store from "./mock.ts";

export interface ShoppingItemModel {
  id: number,
  name: string,
  quantity: number,
  quantityUnit?: string
}

export interface ShoppingListModel {
  id: number,
  name: string,
}

export const fetchItems = async (listId: number): Promise<ShoppingItemModel[]> => {
  console.log("Fetching items");

  return store.find(list => list.id === listId)?.items || [];
};

export const addItem = async (listId: number, name: string): Promise<ShoppingItemModel | null> => {
  console.log("Adding new item");

  const list = store.find(list => list.id === listId);
  if (!list) {
    return null;
  }

  const highestItemId = store
      .flatMap(list => list.items)
      .reduce((acc, currentItem) => currentItem.id > acc ? currentItem.id : acc, 0);

  const newItem: ShoppingItemModel = {
    id: highestItemId + 1,
    name: name,
    quantity: 1,
  };

  list.items.push(newItem);
  return newItem;
};

export const updateItem = async (item: ShoppingItemModel): Promise<ShoppingItemModel> => {
  console.log("Updating item", item);

  const itemToUpdate = store
      .flatMap(currentList => currentList.items)
      .find(currentItem => currentItem.id === item.id);
  if (itemToUpdate) {
    itemToUpdate.name = item.name;
    itemToUpdate.quantity = item.quantity;
    itemToUpdate.quantityUnit = item.quantityUnit;
  }

  return item;
};