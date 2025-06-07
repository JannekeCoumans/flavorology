import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";
import Dashboard from "./Dashboard";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    supabase.auth.onAuthStateChange((_event, session) =>
      setUser(session?.user ?? null)
    );
  }, []);

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> |{" "}
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link> |{" "}
            <Link to="/profile">Profiel</Link> |{" "}
            <button onClick={() => supabase.auth.signOut()}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<h1>Welkom bij Mijn Recepten App</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
