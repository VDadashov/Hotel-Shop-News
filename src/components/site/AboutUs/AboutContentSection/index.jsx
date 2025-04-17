import React from "react";
import styled from "styled-components";

const AboutContentSection = () => {
  return (
    <Wrapper>
      <Content>
        <Title>Haqqımızda</Title>
        <Paragraph>
          <strong>HotelShop</strong> şirkəti 2004 – cü ildən Azərbaycanda
          fəaliyyət göstərir. Şirkətin fəaliyyət növünə aid olan sahələr
          <strong> Otellər, Spalar, Hospitallar, Restoranlar </strong>
          və istirahət mərkəzlərini əhatə edir.
        </Paragraph>

        <Paragraph>
          Şirkətin sizə təklif etdiyi bütün məhsullar Türkiyə, Rusiya,
          İndoneziya, Cənubi Koreya və Avropa dövlətlərində istehsal olunur.{" "}
          <span className="highlight">HotelShop</span> fəaliyyət göstərdiyi
          illər ərzində Azərbaycan Otelçiliyində istifadə olunan otel
          ləvazimatlarında bir çox dəyişikliklər etmiş və yeni məhsullar
          gətirmişdir. Öz məhsullarının keyfiyyəti və qiymətləri ilə hər zaman
          müştərilərini razı salan şirkət eyni zamanda xidmətinin yüksək
          səviyyədə təşkil olunmağı ilə də digərlindən seçilmişdir.
        </Paragraph>

        <Paragraph>
          Artıq 17 ildir Azərbaycanda Otelçilik və Turizm sektoru üçün xidmət
          göstərən <span className="highlight">HotelShop</span> öz inkişafı ilə
          birlikdə Azərbaycan Turizm sektorunun inkişafını düşünərək bu yolda
          irəliləməkdədir.
        </Paragraph>
      </Content>
    </Wrapper>
  );
};

export default AboutContentSection;
const Wrapper = styled.section`
  padding: 80px 20px;
  background: #fff;
`;

const Content = styled.div`
  max-width: 860px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 30px;
  color: #111;
`;

const Paragraph = styled.p`
  font-size: 16px;
  color: #444;
  line-height: 1.8;
  margin-bottom: 20px;

  strong {
    color: #2d2d2d;
    font-weight: 600;
  }

  .highlight {
    color: #cba589;
    font-weight: 600;
  }
`;
