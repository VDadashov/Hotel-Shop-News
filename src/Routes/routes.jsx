import SiteRoot from "../pages/site/SiteRoot";
import Home from "../pages/site/home";
import ContactUs from "../pages/site/ContactUs";
import AboutUs from "../pages/site/AboutUs";
import ErrorPage from "../pages/site/error";
import ProductPage from "../pages/site/ProductPage";

const ROUTES = [
  {
    path: "/",
    element: <SiteRoot />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "products/*", // ✅ dərin slug dəstəyi
        element: <ProductPage />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
];

export default ROUTES;
