import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import PageBanner from "../../../components/common/PageBanner";
import AboutContentSection from "../../../components/site/AboutUs/AboutContentSection";
const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t("header.about")}</title>
      </Helmet>
      <PageBanner title="Haqqımızda" breadcrumb="Home  / Haqqımızda" />
      <AboutContentSection />
    </>
  );
};

export default AboutUs;
