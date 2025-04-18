import { RouterProvider, createBrowserRouter } from "react-router-dom"; 
import ROUTES from "./Routes/routes";
import MainContext from "./context/index";
import { useState } from "react";
import React from "react";
import "./index.css";
import { CartProvider } from "./providers/CartProvider";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("false");
  const [data, setdata] = useState([]);

  const router = createBrowserRouter(ROUTES);

  return (
    <MainContext.Provider value={{ data, setdata, loading, setLoading, error, setError }}>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </MainContext.Provider>
  );
}

export default App;
