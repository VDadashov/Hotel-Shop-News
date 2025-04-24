import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PageBanner from "../../../components/common/PageBanner";
import BaseApi from "../../../utils/api/baseApi";


const TITLES = {
  "gizlilik-siyaseti": "Gizlilik Siyasəti",
  "istifade-sertleri": "İstifadə Şərtləri",
  "qaytarilma-sertleri": "Qaytarılma Şərtləri"
};

const PolicyPage = ({ type }) => {
  const [content, setContent] = useState("");


  useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await fetch(`${BaseApi}/settings/${type}`);
        console.log(res,`${BaseApi}/settings/${type}`);
        const data = await res.json();
        
        setContent(data?.value || "<p>Məzmun tapılmadı.</p>");
      } catch (err) {
        setContent("<p>Xəta baş verdi.</p>",err);
      }
    };

    fetchData();
  }, [type]);

  return (
    <>
      <PageBanner title={TITLES[type]} breadcrumb={`Ana səhifə / ${TITLES[type]}`} />
      <ContentWrapper dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
};

export default PolicyPage;

// Styled Components
const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: Arial, sans-serif;

  p {
    font-size: 1rem;
    line-height: 1.8;
    color: #333;
    margin-bottom: 1rem;
  }
`;
