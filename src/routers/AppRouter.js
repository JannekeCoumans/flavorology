import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  AddRecipeView,
  Nav,
  HomeView,
  RecipeOverview,
  RecipesView,
  ScrollToTop,
} from "../config/C4";

const AppRouter = () => {
  return (
    <Router>
      <ScrollToTop />
      <Nav />
      <Switch>
        <Route path="/" exact component={HomeView} />
        <Route path="/recepten" exact component={RecipesView} />
        <Route path="/recept-toevoegen" exact component={AddRecipeView} />
        <Route path="/recept/:id" exact component={RecipeOverview} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
