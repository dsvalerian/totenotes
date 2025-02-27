export interface ShoppingItemModel {
  id: number,
  name: string,
  quantity: number,
  quantityUnit?: string
}

export interface ShoppingListModel {
  id: number,
  name: string,
  items?: ShoppingItemModel[]
}

export const createItemQuery = async (listId: number, name: string): Promise<ShoppingItemModel | null> => {
  const response = await fetch("/api/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({listId: listId, name: name})
  });

  if (!response.ok) {
    const error = await response.json();
    throw {message: error.error};
  }

  return await response.json();
};

export const updateItemQuery = async (item: ShoppingItemModel): Promise<ShoppingItemModel> => {
  const response = await fetch("/api/items", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(item)
  });

  if (!response.ok) {
    const error = await response.json();
    throw {message: error.error};
  }

  return await response.json();
};

export const deleteItemQuery = async (id: number): Promise<null> => {
  const response = await fetch(`/api/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw {message: error.error};
  }

  return await response.json();
};