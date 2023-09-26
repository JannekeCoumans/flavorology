import { APIHandler, StorageHandler } from "config/C4";

const ShoppinglistIsFilled = async () => {
  const userId = StorageHandler.get("user");
  const shoppingList = await APIHandler.getShoppingList(userId);

  // checken of er uberhaupt een lijstje is
  if (shoppingList && shoppingList.list) {
    const list = shoppingList.list;
    const lastModified = new Date(shoppingList.lastModified) || null;

    // checken of er iets op het lijstje van de ingelogde gebruiker staat
    if (list && list.length > 0) {
      // checken of het lijstje een lastModified-tag heeft.
      if (lastModified) {
        const date = new Date();

        const differenceInTime =
          Math.abs(date.getTime() - lastModified.getTime()) / 3600000;

        // checken of het lijstje niet langer dan 48 uur oud is
        if (differenceInTime > 48) {
          APIHandler.deleteShoppingList(userId);
          return false;
        } else {
          // als het lijstje minder dan 48 uur oud is
          return true;
        }
      } else {
        // als er geen lastModified-tag is
        return true;
      }
    }
  } else {
    // als er niks op het lijstje staat, wordt er false gereturned
    return false;
  }
};

export default ShoppinglistIsFilled;
