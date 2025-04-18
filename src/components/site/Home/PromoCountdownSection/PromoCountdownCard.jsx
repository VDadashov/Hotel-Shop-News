import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../../../styles/common/Buttons";

const PromoCountdownCard = ({
  backgroundImage,
  startTime,
  endTime,
  subtitle,
  title,
  description,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const start = new Date(startTime);
    const end = new Date(endTime);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = end - now;

      if (now < start) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, endTime]);

  return (
    <Wrapper>
    <CardWrapper backgroundImage={backgroundImage}>
      <Overlay />
      <Content>
        <SubTitle>{subtitle}</SubTitle>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Timer>
          {String(timeLeft.hours).padStart(2, "0")}:
          {String(timeLeft.minutes).padStart(2, "0")}:
          {String(timeLeft.seconds).padStart(2, "0")}
        </Timer>
       <Button variant="light">Shop Now</Button>
      </Content>
    </CardWrapper>
    </Wrapper>
  );
};

export default PromoCountdownCard;
const Wrapper = styled.div`
  padding: 20px 30px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

// Styled-components
const CardWrapper = styled.div`
  position: relative;
  background-image: url(${({ backgroundImage }) => backgroundImage});
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  padding: 9rem 2.5rem;
  color: #fff;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 400px;
`;

const SubTitle = styled.p`
  text-transform: uppercase;
  font-size:1.2rem;
  letter-spacing: 1.2px;
  color: #f0f0f0;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #e1e1e1;
  margin-bottom: 25px;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Timer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80%;
  margin: 0 auto;
  font-size: 2rem;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.15);
  padding: 14px 24px;
  border-radius: 10px;
  display: inline-block;
  margin-bottom: 20px;
  letter-spacing: 1px;
`;


