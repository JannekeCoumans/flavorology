import { StorageHandler } from "config/C4";

const ShoppinglistIsFilled = () => {
  const list = StorageHandler.get("shoppinglist");
  if (list && list.length > 0) {
    const lastModified = new Date(
      StorageHandler.get("lastModifiedShoppingList")
    );

    if (lastModified) {
      const date = new Date();

      const differenceInTime =
        Math.abs(date.getTime() - lastModified.getTime()) / 3600000;

      if (differenceInTime > 48) {
        StorageHandler.remove("shoppinglist");
        StorageHandler.remove("lastModifiedShoppingList");
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  } else {
    return false;
  }
};

export default ShoppinglistIsFilled;
