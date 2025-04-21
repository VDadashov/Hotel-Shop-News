import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PageBanner from "../../../components/common/PageBanner";
import BaseApi from "../../../utils/api/baseApi";

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch(`${BaseApi}/faqs`);
        const data = await res.json();
        setFaqs(data || []);
      } catch (err) {
        console.error("FAQ sorğusu uğursuz oldu:", err);
      }
    };

    fetchFaqs();
  }, []);

  const toggleIndex = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <PageBanner title="FAQ" breadcrumb="Ana səhifə / FAQ" />
      <FaqWrapper>
        {faqs.map((item, index) => (
          <FaqItem key={index}>
            <Question onClick={() => toggleIndex(index)}>
              {item.question}
              <span>{activeIndex === index ? "−" : "+"}</span>
            </Question>
            <Answer expanded={activeIndex === index}>
              <p>{item.answer}</p>
            </Answer>
          </FaqItem>
        ))}
      </FaqWrapper>
    </>
  );
};

export default Faq;
const FaqWrapper = styled.div`
  max-width: 800px;
  margin: 60px auto;
  padding: 0 20px;
  font-family: Arial, sans-serif;
`;

const FaqItem = styled.div`
  border-bottom: 1px solid #ddd;
  margin-bottom: 25px;
  overflow: hidden;
`;

const Question = styled.div`
  cursor: pointer;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 18px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9f9f9;
  border-radius: 6px;
  transition: background 0.3s ease;

  &:hover {
    background: #f1f1f1;
  }

  span {
    font-size: 1.3rem;
    font-weight: 400;
    color: #888;
  }
`;

const Answer = styled.div`
  transform-origin: top;
  transform: ${({ expanded }) => (expanded ? "scaleY(1)" : "scaleY(0)")};
  opacity: ${({ expanded }) => (expanded ? "1" : "0")};
  transition: transform 0.35s ease, opacity 0.35s ease;
  overflow: hidden;
  padding: ${({ expanded }) => (expanded ? "15px 16px" : "0 16px")};
  pointer-events: ${({ expanded }) => (expanded ? "auto" : "none")};

  p {
    margin: 0;
    font-size: 0.95rem;
    color: #444;
    line-height: 1.7;
    font-family: Arial, sans-serif;
  }
`;
