import { useTransform } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";

const Card = ({ i, icon, number, info, progress, range, targetScale, title }) => {
  const containerRef = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={containerRef} className="sticky top-[10%]">
     <div className="">
     <div
        className=" flex items-center gap-12 h-[70vh] overflow-hidden rounded-lg border border-white/10 bg-gray-950 px-4 md:px-6 lg:px-8 lg:py-[50px]"
        style={{
          scale,
          top: `calc(10vh + ${i * 35}px)`,
        }}
      >
        {/* Blur color background inside the relative container */}
        

        <div className="relative z-10 flex h-[300px] w-[50%] items-center justify-center">
          <Image
            src={icon}
            alt={`Icon ${i}`}
            width={400}
            height={400}
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="relative z-10 flex flex-col h-[500px] w-[50%]">
          <h1 className="mt-6 font-sans text-[200px] font-bold bg-gradient-to-b from-gray-300 to-gray-900 bg-clip-text text-transparent">
            {number}
          </h1>
          <div className="absolute top-[55%]">
            <h3 className="mt-2 text-2xl font-medium">{title}</h3>
            <p className="mt-2 text-start text-muted-foreground">
              {info}
            </p>
          </div>
        </div>
      </div>
     </div>
    </div>
  );
};

export default Card;
