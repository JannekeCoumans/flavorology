import { StorageHandler } from 'config/C4';

const AddToShoppingList = (recipe) => {
    const currentShoppingList = StorageHandler.get("shoppinglist") || [];
    currentShoppingList.push(recipe);
    StorageHandler.set("shoppinglist", currentShoppingList);
};

export default AddToShoppingList;