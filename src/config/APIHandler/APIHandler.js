let APIHandler;

const firebaseUrl =
  "https://flavorology-c3a7d-default-rtdb.europe-west1.firebasedatabase.app";

export default APIHandler = {
  makeRequest: (request, settings) =>
    fetch(request, settings)
      .then((results) => {
        return results.json();
      })
      .catch((err) => {
        console.log(err);
      }),

  // USERS
  addUser: (user) => {
    const request = `${firebaseUrl}/users.json`;
    const settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    return APIHandler.makeRequest(request, settings);
  },

  getUserInfo: (id) => {
    const request = `${firebaseUrl}/users/${id}/info.json`;
    return APIHandler.makeRequest(request);
  },

  editUserInfo: (id, userInfo) => {
    const request = `${firebaseUrl}/users/${id}/info.json`;
    const settings = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    };
    return APIHandler.makeRequest(request, settings);
  },

  getAllUsers: () => {
    const request = `${firebaseUrl}/users.json`;
    return APIHandler.makeRequest(request);
  },

  checkEmail: async (email) => {
    const request = `${firebaseUrl}/users.json`;
    return (
      Object.entries(await APIHandler.makeRequest(request)).filter(
        (item) => item[1].info.email === email
      ).length > 0
    );
  },

  checkUserName: async (userName) => {
    const request = `${firebaseUrl}/users.json`;
    return (
      Object.entries(await APIHandler.makeRequest(request)).filter(
        (item) => item[1].info.userName.toLowerCase() === userName.toLowerCase()
      ).length > 0
    );
  },

  getUserId: async (userName) => {
    const request = `${firebaseUrl}/users.json`;
    const user = Object.entries(await APIHandler.makeRequest(request)).filter(
      (item) => item[1].info.userName === userName
    );
    if (user.length > 0) {
      return user[0][0];
    }
    return null;
  },

  checkPassword: async (id, password) => {
    const request = `${firebaseUrl}/users/${id}/info.json`;
    const user = await APIHandler.makeRequest(request);
    if (user) {
      return user.password === password;
    }
  },

  // RECIPES
  getAllRecipes: (id) => {
    const request = `${firebaseUrl}/users/${id}/recipes.json`;
    return APIHandler.makeRequest(request);
  },

  addRecipe: (userId, recipe) => {
    const request = `${firebaseUrl}/users/${userId}/recipes.json`;
    const settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    };
    return APIHandler.makeRequest(request, settings);
  },

  getRecipe: (userId, recipeId) => {
    const request = `${firebaseUrl}/users/${userId}/recipes/${recipeId}.json`;
    return APIHandler.makeRequest(request);
  },

  editRecipe: (userId, recipeId, recipe) => {
    const request = `${firebaseUrl}/users/${userId}/recipes/${recipeId}.json`;
    const settings = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    };
    return APIHandler.makeRequest(request, settings);
  },

  deleteRecipe: async (userId, recipeId) => {
    const request = `${firebaseUrl}/users/${userId}/recipes/${recipeId}.json`;
    const settings = {
      method: "DELETE",
    };
    return APIHandler.makeRequest(request, settings);
  },

  // FAVORITES
  getAllFavorites: (userId) => {
    const request = `${firebaseUrl}/users/${userId}/favorites.json`;
    return APIHandler.makeRequest(request);
  },

  checkFavorite: async (userId, id) => {
    const request = `${firebaseUrl}/users/${userId}/favorites.json`;
    const result = await APIHandler.makeRequest(request);
    if (result) {
      return Object.values(result).includes(id);
    }
  },

  addFavorite: async (userId, id) => {
    const request = `${firebaseUrl}/users/${userId}/favorites.json`;
    const settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    };
    return APIHandler.makeRequest(request, settings);
  },

  removeFavorite: async (userId, id) => {
    const getAllFavorites = `${firebaseUrl}/users/${userId}/favorites.json`;
    const result = await APIHandler.makeRequest(getAllFavorites);
    const indexToRemove = Object.values(result).findIndex(
      (item) => item === id
    );
    const itemKey = Object.keys(result)[indexToRemove];
    const request = `${firebaseUrl}/users/${userId}/favorites/${itemKey}.json`;
    const settings = {
      method: "DELETE",
    };
    return APIHandler.makeRequest(request, settings);
  },

  // INGREDIENTS
  getAllIngredients: async (userId) => {
    const request = `${firebaseUrl}/users/${userId}/recipes.json`;
    const allIngredientArrays = Object.values(
      await APIHandler.makeRequest(request)
    ).map((recipe) => {
      if (recipe.ingredients) {
        return recipe.ingredients;
      }
      return false;
    });
    const ingredients = [];
    if (allIngredientArrays === true) {
      allIngredientArrays.map((item) =>
        item.forEach((ingredient) => {
          if (!ingredients.includes(ingredient.ingredientName.toLowerCase())) {
            ingredients.push(ingredient.ingredientName.toLowerCase());
          }
        })
      );
    }
    return ingredients;
  },

  // SHOPPINGLIST
  getShoppingList: (userId) => {
    const request = `${firebaseUrl}/users/${userId}/shoppinglist.json`;
    return APIHandler.makeRequest(request);
  },

  addToShoppingList: async (userId, shoppingList) => {
    const request = `${firebaseUrl}/users/${userId}/shoppinglist.json`;
    const settings = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(shoppingList),
    };
    return APIHandler.makeRequest(request, settings);
  },

  deleteShoppingList: async (userId) => {
    const request = `${firebaseUrl}/users/${userId}/shoppinglist.json`;
    const settings = {
      method: "DELETE",
    };
    return APIHandler.makeRequest(request, settings);
  },

  removeRecipeFromShoppingList: async (userId, recipeId) => {
    const getAllRecipesOnShoppingList = `${firebaseUrl}/users/${userId}/shoppinglist.json`;
    const result = await APIHandler.makeRequest(getAllRecipesOnShoppingList);
    const indexToRemove = result.list.findIndex(
      (item) => item.recipeId === recipeId
    );

    result.list.splice(indexToRemove, 1);

    const request = `${firebaseUrl}/users/${userId}/shoppinglist.json`;
    const settings = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    };
    return APIHandler.makeRequest(request, settings);
  },
};
