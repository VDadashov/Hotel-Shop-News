import { useEffect } from "react";
import { useLocation, Outlet } from "react-router";
import Header from "../../layout/site/Header";
import Footer from "../../layout/site/Footer";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return null;
};

const SiteRoot = () => {
  return (
    <div>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default SiteRoot;
