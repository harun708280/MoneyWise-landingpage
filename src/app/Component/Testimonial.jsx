'use client'

import Container from "@/components/global/container";
import SectionBadge from "@/components/ui/section-badge";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import React from "react";

const testimonials = [
  { email: "alex.johnson@example.com", description: "WorkWave keeps everything organized and efficient. Task management has never been easier!" },
  { email: "sophia.roberts@email.com", description: "Absolutely love the UI and functionality. It makes tracking tasks a breeze!" },
  { email: "matthew.sanders@company.com", description: "Our team productivity increased by 40% after switching to WorkWave. Highly recommend!" },
  { email: "olivia.patterson@business.org", description: "The real-time notifications help me stay on top of my deadlines. Fantastic tool!" },
  { email: "liam.harrison@startup.io", description: "I’ve tried multiple task managers, but this one is by far the most user-friendly and powerful." },
  { email: "emma.carter@agency.com", description: "Collaboration has become effortless with this app. A must-have for teams!" },
  { email: "alex.johnson@example.com", description: "WorkWave keeps everything organized and efficient. Task management has never been easier!" },
  { email: "sophia.roberts@email.com", description: "Absolutely love the UI and functionality. It makes tracking tasks a breeze!" },
  { email: "matthew.sanders@company.com", description: "Our team productivity increased by 40% after switching to WorkWave. Highly recommend!" },
  { email: "olivia.patterson@business.org", description: "The real-time notifications help me stay on top of my deadlines. Fantastic tool!" },
  { email: "liam.harrison@startup.io", description: "I’ve tried multiple task managers, but this one is by far the most user-friendly and powerful." },
  { email: "emma.carter@agency.com", description: "Collaboration has become effortless with this app. A must-have for teams!" },
  { email: "alex.johnson@example.com", description: "WorkWave keeps everything organized and efficient. Task management has never been easier!" },
  { email: "sophia.roberts@email.com", description: "Absolutely love the UI and functionality. It makes tracking tasks a breeze!" },
  { email: "matthew.sanders@company.com", description: "Our team productivity increased by 40% after switching to WorkWave. Highly recommend!" },
  { email: "olivia.patterson@business.org", description: "The real-time notifications help me stay on top of my deadlines. Fantastic tool!" },
  { email: "liam.harrison@startup.io", description: "I’ve tried multiple task managers, but this one is by far the most user-friendly and powerful." },
  { email: "emma.carter@agency.com", description: "Collaboration has become effortless with this app. A must-have for teams!" },
  { email: "alex.johnson@example.com", description: "WorkWave keeps everything organized and efficient. Task management has never been easier!" },
  { email: "sophia.roberts@email.com", description: "Absolutely love the UI and functionality. It makes tracking tasks a breeze!" },
  { email: "matthew.sanders@company.com", description: "Our team productivity increased by 40% after switching to WorkWave. Highly recommend!" },
  { email: "olivia.patterson@business.org", description: "The real-time notifications help me stay on top of my deadlines. Fantastic tool!" },
  { email: "liam.harrison@startup.io", description: "I’ve tried multiple task managers, but this one is by far the most user-friendly and powerful." },
  { email: "emma.carter@agency.com", description: "Collaboration has become effortless with this app. A must-have for teams!" },
];

const columns = [
  { id: 1, duration: 40, ani: "-40%" }, 
  { id: 2, duration: 50, ani: "-20%" },
  { id: 3, duration: 30, ani: "20%" }
];

const Testimonial = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 md:py-16 relative">
         <div className="hidden lg:block absolute bottom-0 -left-1/4 bg-blue-500 w-72 h-72 rounded-full -z-10 blur-[14rem]"></div>
         <div className="hidden lg:block absolute top-[20%] -right-1/4 bg-blue-500 w-72 h-72 rounded-full -z-10 blur-[14rem]"></div>
      {/* Section Header */}
      <Container>
        <div className="max-w-2xl mx-auto text-start md:text-center">
          <SectionBadge title="Testimonials" />
          <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold mt-4">
            What People Are Saying
          </h2>
          <p className="text-muted-foreground mt-4">
            See how WorkWave is empowering teams. Here’s what our users are saying.
          </p>
        </div>
      </Container>

      {/* Testimonials Scrolling Section */}
     <Container>
     <div className="max-w-7xl mx-auto mt-16 bg-opacity-50 backdrop-blur-3xl p-4  rounded-2xl">
        <div
          style={{
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)",
          }}
          className="overflow-hidden flex flex-col md:flex-row items-center justify-center gap-6 h-[600px]"
        >
          {columns.map(({ id, duration, ani }) => (
            <motion.div
              key={id}
              animate={{ translateY: ani }} // ✅ Fixed issue here!
              transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
              className="flex flex-col gap-6"
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className=" backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/10 hover:shadow-blue-500/20 transition-all duration-300 6 max-w-sm w-full ">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-200 p-3 rounded-full">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-lg font-semibold text-gray-200">{testimonial.email}</p>
                  </div>
                  <p className="text-gray-300 mt-4 text-sm">{testimonial.description}</p>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
     </Container>
    </div>
  );
};

export default Testimonial;
