import SiteRoot from "../pages/site/SiteRoot";
import Home from "../pages/site/home";
import ContactUs from "../pages/site/ContactUs";
import AboutUs from "../pages/site/AboutUs";
import ErrorPage from "../pages/site/error";
import ProductPage from "../pages/site/ProductPage";
import Faq from "../pages/site/FAQ";
import PolicyPage from "../pages/site/PolicyPage";
import FeedbackProduct from "../pages/site/FeedbackProduct";
import DetailsPage from "../pages/site/DetailsPage";
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
        path: "products/*", 
        element: <ProductPage />,
      },
      {
        path: "products/:id",
        element:<DetailsPage/>
      },
      {
        path:"/faq",
        element:<Faq/>
      },
      {
        path: "/privacy",
        element: <PolicyPage type="gizlilik-siyaseti" />
      },
      {
        path: "/terms",
        element: <PolicyPage type="istifade-sertleri" />
      },
      {
        path: "/returns",
        element: <PolicyPage type="qaytarilma-sertleri" />
      }
,      
      {
        path: "*",
        element: <ErrorPage />,
      },
      {
        path: "feedbackproduct/:ids",
        element: <FeedbackProduct />
      }
      
    ],
  },
];

export default ROUTES;
