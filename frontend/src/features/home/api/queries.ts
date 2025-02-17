export interface ShoppingItemModel {
  id: number,
  name: string,
  quantity: number,
  quantityUnit?: string
}

export interface ShoppingListModel {
  id: number,
  name: string,
  items: ShoppingItemModel[]
}

const lists: ShoppingListModel[] = [
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

export const fetchLists = async () => {
  return lists;
};

export const addList = async (name: string): Promise<ShoppingListModel> => {
  const highestId = lists.reduce((acc: number, currentList) => {
    return currentList.id > acc ? currentList.id : acc;
  }, 0);

  const newList = {
    id: highestId + 1,
    name: name,
    items: []
  };

  lists.push(newList);
  return newList;
};