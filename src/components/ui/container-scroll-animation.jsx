"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, useSpring } from "motion/react";

export const ContainerScroll = ({
  titleComponent,
  children,
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useSpring(useTransform(scrollYProgress, [0, 1], [20, 0]), {
    stiffness: 100, // Adjust stiffness for smoother animation
    damping: 30, // Adjust damping for smoother animation
  });
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], scaleDimensions()), {
    stiffness: 100,
    damping: 30,
  });
  const translate = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div
      className=" flex items-center justify-center relative p-2 "
      ref={containerRef}
    >
      <div
        className="py-10 md:py-30 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-7xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({ rotate, scale, children }) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
      }}
      className="max-w-7xl  "
    >
      <div className=" h-full w-full  overflow-hidden ">{children}</div>
    </motion.div>
  );
};