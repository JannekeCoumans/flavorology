import { StorageHandler } from "config/C4";

const AddToShoppingList = (recipe) => {
  const currentShoppingList = StorageHandler.get("shoppinglist") || [];
  currentShoppingList.push(recipe);
  const date = new Date();
  // let currentDay = String(date.getDate()).padStart(2, "0");
  // let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
  // let currentYear = date.getFullYear();
  // let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

  StorageHandler.set("lastModifiedShoppingList", date);
  StorageHandler.set("shoppinglist", currentShoppingList);
};

export default AddToShoppingList;
