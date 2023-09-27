const FormatRecipeUrl = (userId, recipeName, recipeId) => {
  console.log(userId, recipeName, recipeId);
  let updatedRecipeName = recipeName;
  let trimmedRecipeName = updatedRecipeName.trim();
  let formattedRecipeName = trimmedRecipeName.replace(/\s+/g, "-");
  formattedRecipeName = formattedRecipeName.toLowerCase();
  formattedRecipeName = formattedRecipeName.replace(/[,]/g, "");

  return formattedRecipeName + "/" + userId + "/" + recipeId;
};

export default FormatRecipeUrl;
