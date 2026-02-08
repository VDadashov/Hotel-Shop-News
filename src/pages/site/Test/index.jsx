import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import LoadingLogo from "../../../components/common/Loading/Loading";

const TestPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t("pageTitles.test")}</title>
      </Helmet>
      {/* <LoadingLogo /> */}
    </>
  );
};

export default TestPage;
