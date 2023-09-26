import { APIHandler, StorageHandler } from "config/C4";

const CheckShoppingList = async (itemId) => {
  const userId = StorageHandler.get("user");
  const shoppingList = await APIHandler.getShoppingList(userId);
  let itemIsOnList = false;
  if (shoppingList && shoppingList.list) {
    const list = shoppingList.list;
    if (list && list.length > 0) {
      const listIds = list.map((item) => item.recipeId);
      if (listIds.includes(itemId)) {
        itemIsOnList = true;
      } else {
        itemIsOnList = false;
      }
    }
  }

  return itemIsOnList;
};

export default CheckShoppingList;
