let APIHandler;

const firebaseUrl = 'https://flavorology-c3a7d-default-rtdb.europe-west1.firebasedatabase.app';

export default APIHandler = {
  makeRequest: (request, settings) =>
    fetch(request, settings)
      .then((results) => {
        return results.json();
      })
      .catch((err) => {
        console.log(err);
      }),

  getAllRecipes: () => {
    const request = `${firebaseUrl}/recipes.json`;
    return APIHandler.makeRequest(request);
  },
  
  addRecipe: (recipe) => {
    const request = `${firebaseUrl}/recipes.json`;
    const settings = { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify(recipe), }
    return APIHandler.makeRequest(request, settings);
  },

  getRecipe: (id) => {
    const request = `${firebaseUrl}/recipes/${id}.json`;
    return APIHandler.makeRequest(request);
  }

//   editRecipe, deleteRecipe
};
