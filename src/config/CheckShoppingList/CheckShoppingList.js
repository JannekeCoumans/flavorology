import { StorageHandler } from 'config/C4';

const CheckShoppingList = (itemId) => {
  const list = StorageHandler.get('shoppinglist');
  if (list && list.length > 0) {
    const listIds = list.map(item => item.recipeId);
    return listIds.includes(itemId);
  }
}

export default CheckShoppingList;