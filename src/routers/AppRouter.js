import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  AddRecipeView,
  Nav,
  HomeView,
  RecipeOverview,
  RecipesView,
  ScrollToTop,
  ShoppingListView,
  ComingSoon,
  FavoritesView,
  AccountView,
  StorageHandler,
  LoginView,
  LoginRequiredView,
  ScrollToTopButton,
} from "../config/C4";

const checkLoggedIn = (callback) => {
  const user = StorageHandler.get("user");
  if (user) callback(true);
  else callback(false);
};

const AppRouter = () => {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    if (loggedIn === null) checkLoggedIn(setLoggedIn);
  }, [loggedIn]);

  const loggedInIsTrue = (bool) => {
    setLoggedIn(bool);
  };

  return (
    <Router>
      <ScrollToTop />
      {loggedIn && <Nav />}
      <div id="top" className={loggedIn ? "viewContainer" : ""}>
        {loggedIn && <ScrollToTopButton scrollToElement="top" />}
        <Routes>
          {loggedIn ? (
            <>
              <Route path="/" element={<HomeView />} />
              <Route path="/recepten" element={<RecipesView />} />
              <Route path="/recept-toevoegen" element={<AddRecipeView />} />
              <Route path="/recept/:id/:id/:id" element={<RecipeOverview />} />
              <Route
                path="/boodschappenlijstje"
                element={<ShoppingListView />}
              />
              <Route path="/onlangs-toegevoegd" element={<ComingSoon />} />
              <Route path="/uitproberen" element={<ComingSoon />} />
              <Route path="/favorieten" element={<FavoritesView />} />
              <Route path="/account" element={<AccountView />} />
            </>
          ) : (
            <>
              <Route
                path="/"
                element={<LoginView loggedInIsTrue={loggedInIsTrue} />}
              />
              {window.location.pathname !== "/" && (
                <Route path="*" element={<LoginRequiredView />} />
              )}
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
