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

  addUser: (user) => {
    const request = `${firebaseUrl}/users.json`;
    const settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    return APIHandler.makeRequest(request, settings);
  },
  
  // addUser, editUser, checkUser, getUser

  getAllRecipes: () => {
    const request = `${firebaseUrl}/recipes.json`;
    return APIHandler.makeRequest(request);
  },

  addRecipe: (recipe) => {
    const request = `${firebaseUrl}/recipes.json`;
    const settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    };
    return APIHandler.makeRequest(request, settings);
  },

  getRecipe: (id) => {
    const request = `${firebaseUrl}/recipes/${id}.json`;
    return APIHandler.makeRequest(request);
  },

  editRecipe: (id, recipe) => {
    const request = `${firebaseUrl}/recipes/${id}.json`;
    const settings = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    };
    return APIHandler.makeRequest(request, settings);
  },

  getAllFavorites: () => {
    const request = `${firebaseUrl}/favorites.json`;
    return APIHandler.makeRequest(request);
  },

  checkFavorite: async (id) => {
    const request = `${firebaseUrl}/favorites.json`;
    const result = await APIHandler.makeRequest(request);
    if (result) {
      return Object.values(result).includes(id);
    }
  },

  addFavorite: async (id) => {
    const request = `${firebaseUrl}/favorites.json`;
    const settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    };
    return APIHandler.makeRequest(request, settings);
  },

  removeFavorite: async (id) => {
    const getAllFavorites = `${firebaseUrl}/favorites.json`;
    const result =  await APIHandler.makeRequest(getAllFavorites);
    const indexToRemove = Object.values(result).findIndex(item => item === id);
    const itemKey = Object.keys(result)[indexToRemove];
    const request = `${firebaseUrl}/favorites/${itemKey}.json`;
    const settings = {
      method: "DELETE"
    };
    return APIHandler.makeRequest(request, settings);
  },

  // deleteRecipe,,
};
