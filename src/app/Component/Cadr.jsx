import { useTransform } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";

const Card = ({ i, icon, number, info, progress, range, targetScale, title }) => {
  const containerRef = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={containerRef} className="sticky top-[20%]">
      <div
        className="flex flex-col relative lg:flex-row items-center gap-8 lg:gap-12 h-auto lg:h-[70vh] overflow-hidden rounded-lg border border-white/10 bg-gray-950 px-4 md:px-6 lg:px-8 py-8 lg:py-[50px]"
        style={{
          scale,
          top: `calc(10vh + ${i * 35}px)`,
        }}
      >
        {/* Image section */}
        <div className="relative z-10 flex items-center justify-center w-full lg:w-1/2 h-[200px] md:h-[300px]">
          <Image
            src={icon}
            alt={`Icon ${i}`}
            width={400}
            height={400}
            className="object-contain w-full h-full max-w-[300px] md:max-w-[400px]"
          />
        </div>

        {/* Text content */}
        <div className="relative z-10 flex flex-col w-full lg:w-1/2 mt-6 lg:mt-0">
          <h1 className="text-[96px] md:text-[140px] lg:text-[200px] font-bold font-sans bg-gradient-to-b from-gray-300 to-gray-900 bg-clip-text text-transparent">
            {number}
          </h1>
          <div className="mt-4">
            <h3 className="text-xl md:text-2xl font-medium">{title}</h3>
            <p className="mt-2 text-start text-muted-foreground text-sm md:text-base">
              {info}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
