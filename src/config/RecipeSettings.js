const RecipeSettings = {
  ingredientType: [
    {
      shortName: "vegetable",
      longName: "Groenten of Fruit",
    },
    {
      shortName: "sauce",
      longName: "Sauzen of Oliën",
    },
    {
      shortName: "spices",
      longName: "Kruiden",
    },
    {
      shortName: "meat",
      longName: "Vlees(vervangers)",
    },
    {
      shortName: "dairy",
      longName: "Zuivelproducten",
    },
    {
      shortName: "doughware",
      longName: "Deegwaren",
    },
    {
      shortName: "bread",
      longName: "Brood",
    },
    {
      shortName: "else",
      longName: "Overig",
    },
  ],
  quantityTypes: [
    {
      shortName: "piece",
      longName: "stuks",
    },
    {
      shortName: "gram",
      longName: "gram",
    },
    {
      shortName: "mililiter",
      longName: "mililiter",
    },
    {
      shortName: "teaspoon",
      longName: "theelepel",
    },
    {
      shortName: "tablespoon",
      longName: "eetlepel",
    },
  ],
  kitchenTypes: [
    {
      shortName: "french",
      longName: "Frans",
    },
    {
      shortName: "italian",
      longName: "Italiaans",
    },
    {
      shortName: "thai",
      longName: "Thais",
    },
    {
      shortName: "chinese",
      longName: "Chinees",
    },
    {
      shortName: "mexican",
      longName: "Mexicaans",
    },
    {
      shortName: 'indian',
      longName: "Indiaas",
    },
    {
      shortName: 'marrocan',
      longName: "Marokkaans",
    },
    {
      shortName: "else",
      longName: "Overig"
    }
  ],
  dishTypes: [
    {
      shortName: "meat",
      longName: "Vleesgerecht",
    },
    {
      shortName: "fish",
      longName: "Visgerecht",
    },
    {
      shortName: "vegetarian",
      longName: "Vegetarisch gerecht",
    },
    {
      shortName: "vegan",
      longName: "Veganistisch gerecht",
    },
    {
      shortName: "else",
      longName: "Overig"
    }
  ],
  shoppingListOrder: [
    'vegetable', 'meat', 'bread', 'sauce', 'spices', 'doughware', 'dairy', 'else'
  ],
};

export default RecipeSettings;
