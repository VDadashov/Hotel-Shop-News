import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ROUTES from "./Routes/routes";
import MainContext from "./context/index";
import { useState } from "react";
import React from "react";
import "./index.css";
import { CartProvider } from "./providers/CartProvider";
import { LanguageProvider } from "./context/LanguageContext/index"; // Add this import

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("false");
  const [data, setdata] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const router = createBrowserRouter(ROUTES);

  return (
    <LanguageProvider>
      {" "}
      {/* Add this wrapper */}
      <MainContext.Provider
        value={{
          selectedCategoryId,
          setSelectedCategoryId,
          data,
          setdata,
          loading,
          setLoading,
          error,
          setError,
        }}
      >
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </MainContext.Provider>
    </LanguageProvider>
  );
}

export default App;
