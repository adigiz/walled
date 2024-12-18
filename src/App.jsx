import { useState } from "react";
import { Route, Routes } from "react-router";
import { ThemeContextProvider } from "./contexts/ThemeContext";

import Hero from "./components/Hero";
import PrivateLayout from "./layouts/PrivateLayout.jsx";
import Login from "./pages/Login.jsx";
import Transfer from "./pages/Transfer.jsx";
import NotFound from "./pages/NotFound.jsx";
import PublicLayout from "./layouts/PublicLayout.jsx";
import Register from "./pages/Register.jsx";
import Topup from "./pages/Topup.jsx";

function App() {
  const [themeMode, setThemeMode] = useState("light");

  const lightTheme = () => {
    document.body.classList.remove("dark");
    setThemeMode("light");
  };

  const darkTheme = () => {
    document.body.classList.toggle("dark");
    setThemeMode("dark");
  };

  return (
    <main>
      <ThemeContextProvider value={{ themeMode, darkTheme, lightTheme }}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<PrivateLayout />}>
            <Route path="/dashboard" element={<Hero />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/topup" element={<Topup />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeContextProvider>
    </main>
  );
}

export default App;
