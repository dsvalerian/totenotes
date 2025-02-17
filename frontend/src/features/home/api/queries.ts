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

const lists: (ShoppingListModel & {items: ShoppingItemModel[]})[] = [
  {
    id: 1,
    name: "Groceries",
    items: [
      {id: 1, name: "Cereal", quantity: 1},
      {id: 2, name: "Sugar", quantity: 2, quantityUnit: "lb"},
      {id: 3, name: "Milk", quantity: 1, quantityUnit: "gallon"},
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
  return lists.map(list => ({
    id: list.id,
    name: list.name,
  }));
};

export const fetchItems = async (id: number): Promise<ShoppingItemModel[]> => {
  return lists.find(list => list.id === id)?.items || [];
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