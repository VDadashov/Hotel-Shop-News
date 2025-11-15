// App.jsx (və ya App.js)
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ROUTES from "./Routes/routes";
import MainContext from "./context/index";
import { useState } from "react";
import React from "react";
import "./index.css";

// react-toastify importları
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CartProvider } from "./providers/CartProvider";
import { LanguageProvider } from "./context/LanguageContext/index";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("false");
  const [data, setdata] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const router = createBrowserRouter(ROUTES);

  return (
    <LanguageProvider>
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
          {/* ToastContainer burada yerləşdirilir - app root-da bir dəfə kifayətdir */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
          />

          <RouterProvider router={router} />
        </CartProvider>
      </MainContext.Provider>
    </LanguageProvider>
  );
}

export default App;
