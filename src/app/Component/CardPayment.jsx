import React from "react";
import { CreditCard, History, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Container from "@/components/global/container";
import SectionBadge from "@/components/ui/section-badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const CardPayment = () => {
  return (
    <section className="relative">
         <div className="hidden lg:block absolute top-[50%] -right-1/4 bg-blue-500 w-72 h-72 rounded-full -z-10 blur-[14rem]"></div>
        
      <Container className="max-w-7xl md:py-20">
        <Container>
          <div className=" text-start md:text-center justify-center items-center md:py-20">
          <SectionBadge title="Card Payments" />
          <h2 className="text-2xl md:text-3xl lg:text-4xl mt-6 font-semibold text-white">
          Take Control of Your Finances
          </h2>
          </div>
        </Container>

        <div className="flex flex-col md:flex-row items-center  gap-12">
          {/* Text Content */}
          <div className="md:w-1/2 space-y-3 md:space-y-6">
          <h2 className="md:text-xl text-lg lg:text-xl mt-6 font-semibold text-white">
            Manage Your Transactions with Ease
          </h2>
            <p className="text-gray-300  ">
              Simplify your payments and gain valuable insights into your
              spending. Our platform allows you to securely pay with your card
              and effortlessly track your transaction history.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-300">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                <span>Secure card payments</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                <span>Detailed transaction history</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                <span>Easy expense tracking</span>
              </li>
            </ul>
            <Link href='sign-in'>
            <Button
              variant="default"
              className="bg-gradient-to-r from-blue-900 to-blue-500 text-white"
            >
              Learn More
            </Button>
            </Link>
          </div>

          {/* Image */}
          <div className="md:w-1/2">
            <div className="relative w-full max-w-xl mx-auto">
              <Image
                src="/cart.jpg"
                alt="Card Payment and History"
                width={600}
                height={600}
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CardPayment;
