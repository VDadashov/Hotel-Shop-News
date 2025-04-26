import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Row, Col } from "../../../styles/common/GridSystem";
import CategoryAccordion from "../../../components/site/ProductPage/CategoryAccordion";
import SearchAndSort from "../../../components/site/ProductPage/SearchAndSort";
import ProductList from "../../../components/site/ProductPage/ProductList";
import PageBanner from "../../../components/common/PageBanner";

const capitalize = (word) =>
  word.charAt(0).toLocaleUpperCase("az") + word.slice(1).toLocaleLowerCase("az");

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
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get("search") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const title = formatLastTitle(slug);
  const breadcrumb = slug
    ? `Ana səhifə > Məhsullar > ${formatBreadcrumb(slug)}`
    : `Ana səhifə > Məhsullar`;

  return (
    <>
      <PageBanner title={title} breadcrumb={breadcrumb} />

      <Row r_gap="2rem" margin="2rem 0">
        <Col xs={12} md={3} lg={3} xl={3} xxl={3} style={{ padding: "1rem" }}>
          <CategoryAccordion onCategoryChange={() => setCurrentPage(1)} />
        
        </Col>

        <Col xs={12} md={9} lg={9} xl={9} xxl={9} style={{ padding: "1rem" }}>
          <SearchAndSort
            query={searchQuery}
            onQueryChange={(q) => {
              setSearchQuery(q);
              setCurrentPage(1);
            }}
            sort={sortOrder}
            onSortChange={(s) => {
              setSortOrder(s);
              setCurrentPage(1);
            }}
          />
          <ProductList
            searchQuery={searchQuery}
            sort={sortOrder}
            page={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </Col>
      </Row>
    </>
  );
};

export default ProductPage;
