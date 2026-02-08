import SiteRoot from "../pages/site/SiteRoot";
import Home from "../pages/site/Home";
import ContactUs from "../pages/site/ContactUs";
import AboutUs from "../pages/site/AboutUs";
import ErrorPage from "../pages/site/error";
import ProductPage from "../pages/site/ProductPage";
import DetailsPage from "../pages/site/DetailsPage";
import Faq from "../pages/site/FAQ";
import PolicyPage from "../pages/site/PolicyPage";
import FeedbackProduct from "../pages/site/FeedbackProduct";
import TestPage from "../pages/site/Test";
import PromosPage from "../pages/site/Promos";
const ROUTES = [
  {
    path: "/",
    element: <SiteRoot />,
    children: [
      {
        path: "test",
        element: <TestPage />,
      },
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
        path: "promos",
        element: <PromosPage />,
      },
      {
        path: "products",
        element: <ProductPage />,
      },
      {
        path: "products/:id(\\d+)",
        element: <DetailsPage />,
      },
      {
        path: "products/*",
        element: <ProductPage />,
      },
      {
        path: "product/:id",
        element: <DetailsPage />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/privacy",
        element: <PolicyPage type="gizlilik-siyaseti" />,
      },
      {
        path: "/terms",
        element: <PolicyPage type="istifade-sertleri" />,
      },
      {
        path: "/returns",
        element: <PolicyPage type="qaytarilma-sertleri" />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
      {
        path: "feedbackproduct/:token",
        element: <FeedbackProduct />,
      },
    ],
  },
];

export default ROUTES;
