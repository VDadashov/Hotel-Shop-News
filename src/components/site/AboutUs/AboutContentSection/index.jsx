import React from "react";
import styled from "styled-components";
import theme from "../../../../styles/common/theme";

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
  padding: 80px ${theme.spacing.sm};
  background: ${theme.colors.white};
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
  color: ${theme.colors.darkText};
`;

const Paragraph = styled.p`
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.icon};
  line-height: 1.8;
  margin-bottom: ${theme.spacing.md};

  strong {
    color: ${theme.colors.text};
    font-weight: 600;
  }

  .highlight {
    color: ${theme.colors.sale};
    font-weight: 600;
  }
`;
