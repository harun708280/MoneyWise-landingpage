import { BorderBeam } from "@/components/magicui/border-beam";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import React from "react";

const DashBoard = () => {
  return (
    <div className="relative flex justify-center items-center w-full ">
      {/* Background Blur Effect */}
      <div className="absolute top-1/2 left-1/2 -z-10 w-3/4 h-3/4 -translate-x-1/2 -translate-y-1/2 blur-[10rem] gradient opacity-50"></div>

      {/* Image Container */}
      <ContainerScroll>
        <div className="p-4 w-full max-w-7xl bg-opacity-50 backdrop-blur-3xl rounded-2xl shadow-xl">
          <Image
            src="/mainDash.png"
            alt="Dashboard Banner"
           
            width={1500} 
            height={1000} 
            className="mx-auto rounded-2xl object-cover object-left-top"
          />

          {/* BorderBeam Effect */}
          <BorderBeam size={250} duration={12} delay={9} />
        </div>
      </ContainerScroll>
    </div>
  );
};

export default DashBoard;