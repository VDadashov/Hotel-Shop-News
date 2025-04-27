import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../../../styles/common/Buttons";
import MediaApi from "../../../../utils/api/MediaApi";

const PromoCountdownCard = ({
  backgroundImg,
  startDate,
  endDate,
  subtitle,
  title,
  description,
  product
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [validImg, setValidImg] = useState(backgroundImg);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const checkImage = async () => {
      if (!backgroundImg) {
        setValidImg(product?.mainImg || "");
        return;
      }

      try {
        const res = await fetch(MediaApi + backgroundImg, { method: "HEAD" });
        if (!res.ok) {
          setValidImg(product?.mainImg || "");
        } else {
          setValidImg(backgroundImg);
        }
      } catch (err) {
        setValidImg(product?.mainImg || "");
        console.error(err);
      }
    };

    checkImage();
  }, [backgroundImg, product]);

  useEffect(() => {
    if (!startDate || !endDate) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setIsExpired(true);
      return;
    }

    const end = new Date(endDate);

    if (isNaN(end.getTime())) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setIsExpired(true);
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();
      const diff = end.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate, endDate]);

  return (
    <Wrapper>
      <CardWrapper backgroundImg={validImg}>
        <Overlay />
        <Content>
          <SubTitle>{subtitle}</SubTitle>
          <Title>{title}</Title>
          <Description>{description}</Description>

          {/* Timer */}
          <Timer>
            {timeLeft.days > 0 && <span>{timeLeft.days}g:</span>}
            {String(timeLeft.hours).padStart(2, "0")}:
            {String(timeLeft.minutes).padStart(2, "0")}:
            {String(timeLeft.seconds).padStart(2, "0")}
          </Timer>

          {/* Button */}
          <Button
            onClick={() => {
              window.location.href = `/products/${product?.id}`;
            }}
            variant="light"
            disabled={isExpired}
          >
            {isExpired ? "Kampaniya bitdi" : "Shop Now"}
          </Button>
        </Content>
      </CardWrapper>
    </Wrapper>
  );
};

export default PromoCountdownCard;

// === STYLED COMPONENTS ===

const Wrapper = styled.div`
  padding: 20px 30px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const CardWrapper = styled.div`
  position: relative;
  background-image: url(${({ backgroundImg }) => MediaApi + backgroundImg});
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
  font-size: 1.2rem;
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
  font-size: 2rem;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.15);
  padding: 14px 24px;
  border-radius: 10px;
  margin-bottom: 20px;
  letter-spacing: 1px;
`;
