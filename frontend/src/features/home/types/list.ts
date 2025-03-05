import Item from "./item.ts";

interface List {
  id: number,
  ownerId: number,
  name: string,
  createdAt: Date,
  updatedAt: date,
  items?: Item[]
}

export default List;