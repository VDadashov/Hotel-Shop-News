import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { Row, Col } from "../../../styles/common/GridSystem";
import CategoryAccordion from "../../../components/site/ProductPage/CategoryAccordion";
import SearchAndSort from "../../../components/site/ProductPage/SearchAndSort";
import ProductList from "../../../components/site/ProductPage/ProductList";
import PageBanner from "../../../components/common/PageBanner";
import theme from "../../../styles/common/theme";

const capitalize = (word) =>
  word.charAt(0).toLocaleUpperCase("az") +
  word.slice(1).toLocaleLowerCase("az");

const formatBreadcrumb = (slug) =>
  slug
    ? decodeURIComponent(slug)
        .split("/")
        .map((part) =>
          part.replace(/-/g, " ").split(" ").map(capitalize).join(" "),
        )
        .join(" / ")
    : "";

const formatLastTitle = (slug) => {
  if (!slug) return "Məhsullar";
  const parts = decodeURIComponent(slug).split("/");
  return parts[parts.length - 1]
    .replace(/-/g, " ")
    .split(" ")
    .map(capitalize)
    .join(" ");
};

const ProductPage = () => {
  const { t } = useTranslation();
  const params = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const slug = params["*"] || params.slug || "";
  const pathSlug = location.pathname.replace(/^\/products\/?/, "");
  const resolvedSlug = pathSlug || slug;

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("searchQuery") || "",
  );

  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [activeCategoryTitle, setActiveCategoryTitle] = useState(null);

  const derivedTitle = formatLastTitle(resolvedSlug);
  const productsLabel = t("pageTitles.products");
  const homeLabel = t("header.home");
  const pageTitle = resolvedSlug
    ? derivedTitle
    : activeCategoryTitle || derivedTitle;
  const breadcrumb = resolvedSlug
    ? `${homeLabel} > ${productsLabel} > ${formatBreadcrumb(resolvedSlug)}`
    : `${homeLabel} > ${productsLabel}`;

  useEffect(() => {
    if (resolvedSlug) {
      setActiveCategoryTitle(derivedTitle);
    } else {
      setActiveCategoryTitle(null);
    }
  }, [resolvedSlug, derivedTitle]);

  useEffect(() => {
    document.title = pageTitle
      ? `${pageTitle} | ${productsLabel}`
      : productsLabel;
  }, [pageTitle, productsLabel]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSortChange = (sort) => {
    setSortOrder(sort);
    setCurrentPage(1);
  };

  return (
    <>
      <PageBanner title={pageTitle} breadcrumb={breadcrumb} />
      <Container>
        <Row
          $r_gap="2rem"
          $c_gap="20px"
          $justify="flex-start"
          $align="flex-start"
        >
          <Col $xs={12} $md={3} $lg={3} $xl={3} $xxl={3}>
            <CategoryAccordion
              onCategoryChange={(title) => {
                setCurrentPage(1);
                setActiveCategoryTitle(title || null);
              }}
            />
          </Col>
          <Col $xs={12} $md={9} $lg={9} $xl={9} $xxl={9}>
            <SearchAndSort
              query={searchQuery}
              setLoading={setLoading}
              loading={loading}
              onQueryChange={handleSearchChange}
              sort={sortOrder}
              onSortChange={handleSortChange}
            />
            <ProductList
              setLoading={setLoading}
              searchQuery={searchQuery}
              sort={sortOrder}
              page={currentPage}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductPage;

const Container = styled.div`
  max-width: 1380px;
  margin: 0 auto;
  padding: 40px ${theme.spacing.md};

  @media (max-width: 768px) {
    padding: 20px ${theme.spacing.sm};
  }
`;
