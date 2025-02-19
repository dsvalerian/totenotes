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

// MOCK DATA, will be replaced by DB calls
const lists: (ShoppingListModel & {items: ShoppingItemModel[]})[] = [
  {
    id: 1,
    name: "Groceries",
    items: [
      {id: 1, name: "Cereal", quantity: 1},
      {id: 2, name: "Sugar", quantity: 2, quantityUnit: "lb"},
      {id: 3, name: "Milk", quantity: 10, quantityUnit: "gallon"},
    ]
  },
  {
    id: 2,
    name: "Amazon",
    items: [
      {id: 4, name: "Can opener", quantity: 1},
      {id: 5, name: "Notebook", quantity: 1},
      {id: 6, name: "Pencil", quantity: 5},
      {id: 7, name: "Eraser", quantity: 2},
    ]
  },
  {
    id: 3,
    name: "Pharmacy",
    items: [
      {id: 8, name: "Mouthwash", quantity: 1},
      {id: 9, name: "Bandaids", quantity: 1, quantityUnit: "pack"},
    ]
  },
  {
    id: 4,
    name: "Convenience",
    items: [
      {id: 10, name: "Red bull", quantity: 2},
      {id: 11, name: "Cookies", quantity: 1, quantityUnit: "sleeve"},
    ]
  },
];

export const fetchLists = async (): Promise<ShoppingListModel[]> => {
  console.log("Fetching lists");

  return lists
    .sort((a, b) => b.id - a.id)
    .map(list => ({
      id: list.id,
      name: list.name,
    }));
};

export const fetchItems = async (listId: number): Promise<ShoppingItemModel[]> => {
  console.log("Fetching items for list id", listId);

  return lists.find(list => list.id === listId)?.items || [];
};

export const addList = async (name: string): Promise<ShoppingListModel> => {
  console.log("Adding new list");

  const highestId = lists.reduce((acc: number, currentList) => {
    return currentList.id > acc ? currentList.id : acc;
  }, 0);

  const newList: ShoppingListModel = {
    id: highestId + 1,
    name: name
  };

  lists.push({...newList, items: []});
  return newList;
};

export const updateList = async (list: ShoppingListModel): Promise<ShoppingListModel> => {
  console.log("Updating list", list);

  const listToUpdate = lists.find(currentList => currentList.id === list.id);
  if (listToUpdate) {
    listToUpdate.name = list.name;
  }

  return list;
};

export const addItem = async (listId: number, name: string): Promise<ShoppingItemModel | null> => {
  console.log("Adding new item");

  const list = lists.find(list => list.id === listId);
  if (!list) {
    return null;
  }

  const highestItemId = lists
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

  const itemToUpdate = lists
      .flatMap(currentList => currentList.items)
      .find(currentItem => currentItem.id === item.id);
  if (itemToUpdate) {
    itemToUpdate.name = item.name;
    itemToUpdate.quantity = item.quantity;
    itemToUpdate.quantityUnit = item.quantityUnit;
  }

  return item;
};