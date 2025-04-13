'use client';
import { Badge } from '@/components/ui/badge';
import SectionBadge from '@/components/ui/section-badge';
import Image from 'next/image';
import React from 'react';
import Marquee from 'react-fast-marquee';

const Company = () => {
  const logos = [
    '/logo1.svg',
    '/logo2.svg',
    '/logo3.svg',
    '/logo4.svg',
    '/logo5.svg',
    '/logo6.svg',
  ];

  return (
    <div className="md:pb-20">
      <div className="text-center mb-10">
        <SectionBadge title="TRUSTED COMPANY" />
      </div>
      <div className="w-full overflow-hidden">
        <Marquee speed={50} gradient={true} gradientColor={[0, 0, 0]}>
          {logos.map((logo, index) => (
            <div key={index} className="mx-4 md:mx-14 flex items-center justify-center"> {/* Updated class */}
              <Image
                width={150} // Reduced width for smaller screens
                height={40} // Reduced height for smaller screens
                src={logo}
                alt={`Logo ${index + 1}`}
                className="h-8 md:h-12 grayscale opacity-75" // Adjusted height
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Company;