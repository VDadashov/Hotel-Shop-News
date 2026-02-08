import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import ContactHero from "../../../components/site/ContactUs/ContactHero";
import ContactFormSection from "../../../components/site/ContactUs/ContactFormSection";
const ContactUs = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("header.contact")}</title>
      </Helmet>
      <ContactHero />
      <ContactFormSection />
    </>
  );
};

export default ContactUs;
