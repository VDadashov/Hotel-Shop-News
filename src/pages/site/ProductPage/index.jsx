import React from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "../../../styles/common/GridSystem";
import CategoryAccordion from "../../../components/site/ProductPage/CategoryAccordion";
import SearchAndSort from "../../../components/site/ProductPage/SearchAndSort";
import ProductList from "../../../components/site/ProductPage/ProductList";
import PageBanner from "../../../components/common/PageBanner";

// Baş hərfi böyük, sonrası kiçik – azərbaycan dilinə uyğun
const capitalize = (word) => {
  return word.charAt(0).toLocaleUpperCase("az") + word.slice(1).toLocaleLowerCase("az");
};

// Breadcrumb üçün formatlanan tam yol
const formatBreadcrumb = (slug) => {
  if (!slug) return "";

  return decodeURIComponent(slug)
    .split("/")
    .map((part) =>
      part
        .replace(/-/g, " ")
        .split(" ")
        .map(capitalize)
        .join(" ")
    )
    .join(" / ");
};

// Title üçün yalnız son slug hissəsi
const formatLastTitle = (slug) => {
  if (!slug) return "Məhsullar";
  const parts = decodeURIComponent(slug).split("/");
  const last = parts[parts.length - 1];
  return last
    .replace(/-/g, " ")
    .split(" ")
    .map(capitalize)
    .join(" ");
};

const ProductPage = () => {
  const { "*": slug } = useParams();
  const title = formatLastTitle(slug); // ✅ yalnız son hissə
  const breadcrumb = slug
    ? `Ana səhifə > Məhsullar > ${formatBreadcrumb(slug)}`
    : `Ana səhifə > Məhsullar`;

  return (
    <>
      <PageBanner title={title} breadcrumb={breadcrumb} />

      <Row r_gap="2rem" margin="2rem 0">
        <Col xs={12} md={3} lg={3} xl={3} xxl={3} style={{ padding: "1rem" }}>
          <CategoryAccordion />
        </Col>
        <Col xs={12} md={9} lg={9} xl={9} xxl={9} style={{ padding: "1rem" }}>
          <SearchAndSort />
          <ProductList />
        </Col>
      </Row>
    </>
  );
};

export default ProductPage;
