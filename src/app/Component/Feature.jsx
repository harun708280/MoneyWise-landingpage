import Container from "@/components/global/container";
import SectionBadge from "@/components/ui/section-badge";
import Image from "next/image";
import React from "react";

const Feature = () => {
  return (
    <div className="max-w-7xl py-10 md:py-16 relative">
      <div className="hidden lg:block absolute bottom-0 -left-1/4 bg-blue-500 w-72 h-72 rounded-full -z-10 blur-[14rem]"></div>
      <div className="hidden lg:block absolute top-[20%] -right-1/4 bg-blue-500 w-72 h-72 rounded-full -z-10 blur-[14rem]"></div>
        
      <Container>
        <div className="text-start md:text-center mb-12">
          <SectionBadge title="FEATURES" />
          <h2 className="text-xl md:text-3xl font-bold text-white mt-4">
            Money Wise Financial Features
          </h2>
          <p className="text-gray-400 mt-2">
            Unlock the full potential of your finances with advanced AI
            solutions.
          </p>
        </div>

         <Container>
         <div className="grid grid-cols-1 md:grid-cols-12  gap-8">
          {/* Income Tracking Card */}
          <div className=" col-span-6 bg-blue-600/6 flex flex-col  justify-between relative overflow-hidden border border-white/10 rounded-lg  p-4 text-white shadow-lg">
            <div className="bg-gray-950 shadow-lg rounded-md p-5">
              <div className="flex items-center mb-6   border border-white/10 rounded-lg  p-4">
                <div className="border border-white/10 rounded-xl p-3 mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Income Tracking</h3>
              </div>

              <div className="flex items-center mb-6  border border-white/10 rounded-lg  p-4">
                <div className="border border-white/10 rounded-xl p-3 mr-4">
                
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.293a1 1 0 00.707-.293l.707-.707A1 1 0 0110.293 6H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Expense Tracking</h3>
              </div>

              <div className="flex items-center mb-6  border border-white/10 rounded-lg  p-4">
                <div className="border border-white/10 rounded-xl p-3 mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.055 2.828.16M12 2C9.5 2 7.18 3.375 5.364 5.766m9.272 11.018C15.3 17.597 13.65 19 12 19c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m-8.178 2h15.916a2 2 0 002-2v-10a2 2 0 00-2-2H5.082a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Savings Analysis</h3>
              </div>

              <div className="mt-8">
                <h2 className="text-xl md:text-2xl font-bold mb-4">
                  Money Wise Financial Features
                </h2>
                <p className="text-gray-300">
                  Unlock the full potential of your finances with advanced AI
                  solutions.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl col-span-6 p-4 border border-white/10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 z-0">
              <Image
                src="/featurebg.png"
                alt="Feature Background"
                layout="fill"
                objectFit="cover"
                className="opacity-20"
              />
            </div>
            <div className="relative z-10  w-full h-[80%]">
              <Image
                src="/feature1.svg"
                alt="Income Tracking"
                layout="fill"
                className="rounded-xl mb-4 "
              />
            </div>
            <div className="relative z-10 ">
              <h3 className="text-xl font-semibold text-white mb-2">
                Income Tracking
              </h3>
              <p className="text-gray-400">
                Track all your income sources and analyze trends.
              </p>
            </div>
          </div>

          {/* Expense Tracking Card */}
        </div>
         </Container>

        {/* Savings Analysis Card */}
      <Container>
      <div className="grid grid-cols-1 md:grid-cols-12  gap-8 mt-12">
          <div className="rounded-2xl border border-white/10 col-span-4 p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image
                src="/featurebg.png"
                alt="Feature Background"
                layout="fill"
                objectFit="cover"
                className="opacity-20"
              />
            </div>
            <div className="relative z-10">
              <Image
                src="/feature2.svg"
                alt="Savings Analysis"
                width={500}
                height={300}
                className="rounded-xl mb-4"
              />
              <h3 className="text-xl font-semibold text-white mb-2">
                Savings Analysis
              </h3>
              <p className="text-gray-400">
                Analyze your savings patterns and set savings goals.
              </p>
            </div>
          </div>

          {/* Wallet Management Card */}
          
          <div className="rounded-2xl border border-white/10 col-span-4 p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image
                src="/featurebg.png"
                alt="Feature Background"
                layout="fill"
                objectFit="cover"
                className="opacity-20"
              />
            </div>
            <div className="relative z-10">
              <Image
                src="feature3.svg"
                alt="Wallet Management"
                width={500}
                height={300}
                className="rounded-xl mb-4"
              />
              <h3 className="text-xl font-semibold text-white mb-2">
              Smart Data Visualization
              </h3>
              <p className="text-gray-400">
              Automate repetitive and time-consuming tasks with our AI-powered workflow automation
              </p>
            </div>
            
          </div>
          <div className="rounded-2xl col-span-4 p-6 border border-white/10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image
                src="/featurebg.png"
                alt="Feature Background"
                layout="fill"
                objectFit="cover"
                className="opacity-20"
              />
            </div>
            <div className="relative z-10">
              <Image
                src="feature4.svg"
                alt="Wallet Management"
                width={500}
                height={300}
                className="rounded-xl mb-4"
              />
              <h3 className="text-xl font-semibold text-white mb-2">
                Wallet Management
              </h3>
              <p className="text-gray-400">
                Manage multiple wallets and track balances in one place.
              </p>
            </div>
            
          </div>
        </div>
      </Container>

        {/* Budget Planning Card */}
      </Container>
    </div>
  );
};

export default Feature;
