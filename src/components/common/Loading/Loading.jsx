import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #ffffff;
  z-index: 9999;
`;

const Wrapper = styled.div`
  width: 500px;
  height: 500px;
  margin: auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: 900px) {
    width: 300px;
    height: 300px;
  }
`;

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const AnimatedPath = styled.path`
  transform-origin: center center;
`;

const TextWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;

  @media (max-width: 900px) {
    display: none;
  }
`;

const Text = styled.div`
  text-align: center;
  white-space: pre-line;
  line-height: 1;
  opacity: 0;
  filter: blur(10px);
  transform: scale(0.8);

  span {
    display: block;
  }

  .hotel {
    font-family: "Poppins", sans-serif;
    font-size: 170px;
    font-weight: 700;
    color: #2d6a4f;
  }

  .shop {
    margin-left: -30px;
    font-family: "Quicksand", sans-serif;
    font-size: 150px;
    font-weight: 700;
    color: #2d6a4f;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const CircularText = styled.svg`
  position: absolute;
  top: -265px;
  left: 42px;
  width: 850px;
  height: 850px;

  @media (max-width: 900px) {
    width: 400px;
    height: 400px;
    top: -180px;
    left: 50%;
    transform: translateX(-50%);
    display: none;
  }
`;

const LoadingLogo = () => {
  const greenCircleSvgRef = useRef();
  const orangeCircleSvgRef = useRef();
  const beigeCircleSvgRef = useRef();
  const greenRealRef = useRef();
  const orangeRealRef = useRef();
  const beigeRealRef = useRef();
  const textRef = useRef();
  const circularTextRef = useRef();
  const wrapperRef = useRef();

  const circlePath = "M250,250 m-15,0 a15,15 0 1,0 30,0 a15,15 0 1,0 -30,0";
  const greenRealPath = "M150 60 Q150 40, 210 35 Q340 30, 345 50 L340 230 Q350 240, 240 210 Q180 185, 160 170 Q145 165, 150 60 Z";
  const orangeRealPath = "M150 430 C150 430, 200 450, 225 430 L300 260 Q290 240, 230 220 Q210 215, 155 202 C135 215, 150 340, 150 430 Z";
  const beigeRealPath = "M265 440 Q315 460, 345 430 Q360 300, 340 250 Q335 225, 300 300 Q243 420, 265 440 Z";

  useEffect(() => {
    const isDesktop = window.innerWidth > 900;

    if (isDesktop) {
      // DESKTOP ANİMASİYASI
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.inOut" } });

      tl.fromTo(greenCircleSvgRef.current, { y: -99, opacity: 1 }, { y: 0, opacity: 0, duration: 1 }, 0)
        .fromTo(orangeCircleSvgRef.current, { x: -70, y: 70, opacity: 1 }, { x: 0, y: 0, opacity: 0, duration: 1 }, 0)
        .fromTo(beigeCircleSvgRef.current, { x: 70, y: 70, opacity: 1 }, { x: 0, y: 0, opacity: 0, duration: 1 }, 0)

        .fromTo(
          [greenRealRef.current, orangeRealRef.current, beigeRealRef.current],
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1 },
          1
        )

        .to(
          [greenRealRef.current, orangeRealRef.current, beigeRealRef.current],
          { xPercent: -65, duration: 1 },
          2
        )

        .to(textRef.current, {
          scale: 1,
          filter: "blur(0px)",
          opacity: 1,
          duration: 1,
        }, ">")

        .fromTo(circularTextRef.current,
          { opacity: 0, rotate: -15 },
          { opacity: 1, rotate: 8, duration: 1 },
          ">"
        )

        .to(circularTextRef.current, { scale: 1.05, duration: 0.4, yoyo: true, repeat: 1 }, ">")
        .to(circularTextRef.current, { opacity: 0, duration: 0.6 }, ">")
        .to(textRef.current, { opacity: 0, duration: 0.6 }, "<")

        .to(
          [greenRealRef.current, orangeRealRef.current, beigeRealRef.current],
          { xPercent: 0, duration: 0.6 },
          ">"
        )

        .to(
          [greenRealRef.current, orangeRealRef.current, beigeRealRef.current],
          { scale: 0.8, opacity: 0, duration: 0.6 },
          ">"
        );

      // Wrapper böyüyüb-kiçilsin
      gsap.to(wrapperRef.current, {
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

    } else {
      // MOBİL ANİMASİYASI
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.inOut" } });

      tl.fromTo(greenCircleSvgRef.current, { y: -50, opacity: 1 }, { y: 0, opacity: 0, duration: 1 }, 0)
        .fromTo(orangeCircleSvgRef.current, { x: -30, y: 30, opacity: 1 }, { x: 0, y: 0, opacity: 0, duration: 1 }, 0)
        .fromTo(beigeCircleSvgRef.current, { x: 30, y: 30, opacity: 1 }, { x: 0, y: 0, opacity: 0, duration: 1 }, 0)

        .fromTo(
          [greenRealRef.current, orangeRealRef.current, beigeRealRef.current],
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1 },
          1
        )

        .to(
          [greenRealRef.current, orangeRealRef.current, beigeRealRef.current],
          { scale: 0.8, opacity: 0, duration: 0.6 },
          ">"
        );
    }
  }, []);

  return (
    <Container>
      <Wrapper ref={wrapperRef}>
        <Svg viewBox="0 0 500 500" ref={greenCircleSvgRef}>
          <AnimatedPath d={circlePath} fill="#78b49c" />
        </Svg>
        <Svg viewBox="0 0 500 500" ref={orangeCircleSvgRef}>
          <AnimatedPath d={circlePath} fill="#f29b7e" />
        </Svg>
        <Svg viewBox="0 0 500 500" ref={beigeCircleSvgRef}>
          <AnimatedPath d={circlePath} fill="#f1d6a2" />
        </Svg>
        <Svg viewBox="0 0 500 500" ref={greenRealRef}>
          <AnimatedPath d={greenRealPath} fill="#78b49c" />
        </Svg>
        <Svg viewBox="0 0 500 500" ref={orangeRealRef}>
          <AnimatedPath d={orangeRealPath} fill="#f29b7e" />
        </Svg>
        <Svg viewBox="0 0 500 500" ref={beigeRealRef}>
          <AnimatedPath d={beigeRealPath} fill="#f1d6a2" />
        </Svg>

        <TextWrapper>
          <Text ref={textRef}>
            <span className="hotel">hotel</span>
            <span className="shop">shop</span>
          </Text>
        </TextWrapper>

        <CircularText ref={circularTextRef} viewBox="0 0 500 500">
          <defs>
            <path id="circlePath" d="M 250,250 m-82,0 a 82,82 0 1,1 164,0 a 82,82 0 1,1 -164,0" />
          </defs>
          <text
            fill="#f29b7e"
            fontSize="20"
            fontFamily="Poppins, sans-serif"
            fontWeight="600"
            letterSpacing="8px"
            transform="rotate(8 250 250)"
          >
            <textPath href="#circlePath" startOffset="3%" textLength="76%">
              hotel spa hospital supplies
            </textPath>
          </text>
        </CircularText>
      </Wrapper>
    </Container>
  );
};

export default LoadingLogo;
