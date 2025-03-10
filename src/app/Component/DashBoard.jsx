import { BorderBeam } from "@/components/magicui/border-beam";
import Image from "next/image";
import React from "react";

const DashBoard = () => {
  return (
    <div className="relative flex justify-center items-center py-10 md:py-20 w-full">
      {/* Background Blur Effect */}
      <div className="absolute top-1/2 left-1/2 -z-10 w-3/4 h-3/4 -translate-x-1/2 -translate-y-1/2 blur-[10rem] gradient opacity-50"></div>

      {/* Image Container */}
      <div className="p-4  bg-opacity-50 backdrop-blur-3xl rounded-2xl shadow-xl">
        <Image
          src="/dashBoard.png"
          alt="Dashboard Banner"
          width={1200}
          height={800}
          className="rounded-lg  shadow-2xl mx-auto"
        />

        {/* BorderBeam Effect */}
        <BorderBeam size={250} duration={12} delay={9} />
      </div>
    </div>
  );
};

export default DashBoard;
