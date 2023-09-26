import { APIHandler, StorageHandler } from "config/C4";

const AddToShoppingList = async (recipe) => {
  const emptyShoppingList = {
    list: [],
    lastModified: "",
  };
  const userId = StorageHandler.get("user");
  const date = new Date();

  let shoppingList = await APIHandler.getShoppingList(userId);

  if (!shoppingList || (!shoppingList.list && shoppingList.lastModified)) {
    shoppingList = emptyShoppingList;
  }

  const list = Object.values(shoppingList)[0].list || shoppingList.list;

  const edittedShoppingList = {
    list: [],
    lastModified: "",
  };

  edittedShoppingList.list = [...list];
  edittedShoppingList.lastModified = date;
  edittedShoppingList.list.push(recipe);

  await APIHandler.addToShoppingList(userId, edittedShoppingList);
};

export default AddToShoppingList;
