"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";
import { BotIcon, ChevronRight, ArrowDownCircleIcon, MessageCircle, Send, X } from "lucide-react";
import Image from "next/image";
import Hero from "./Component/Hero";
import Process from "./Component/Process";
import Feature from "./Component/Feature";
import PricingSection from "./Component/Priceing";
import Testimonial from "./Component/Testimonial";
import Launch from "./Component/Launch";
import Security from "./Component/Security";
import CardPayment from "./Component/CardPayment";
import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  useEffect(() => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({ top: targetElement.offsetTop, behavior: "smooth" });
        }
      });
    });
  }, []);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showChatIcon, setShowChatIcon] = useState(false);
  const chatIconRef = useRef(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    error,
  } = useChat({ api: "/api/gemini" });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowChatIcon(true);
      } else {
        setShowChatIcon(false);
        setIsChatOpen(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <section className="w-full mt-16 relative flex items-center justify-center flex-col px-4 md:px-0 py-8">
      <div className="absolute bg-gray-950 inset-0 linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10 h-[150vh]" />

      <div id="home" className="relative">
        <div className="flex flex-col items-center justify-center pt-14 h-full">
          <button className="flex items-center gap-2 px-6 py-2 rounded-full lowercase relative overflow-hidden border border-gray-700 backdrop-blur-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-yellow-500/50">
            <Image src={"/sparkles-dark.svg"} height={16} width={16} alt="icon" />
            <span className="text-white font-medium uppercase">Explore the V-2.0</span>
            <ChevronRight className="w-4 h-4 text-white" />
            <BorderBeam size={40} initialOffset={20} className="from-transparent via-yellow-500 to-transparent" transition={{ type: "spring", stiffness: 60, damping: 20 }} />
          </button>
        </div>
        <div className="relative max-w-7xl w-11/12 md:w-full mx-auto">
          <Hero />
        </div>
      </div>

      <div id="features">
        <Feature />
        <Process />
      </div>
      <div id="security">
        <CardPayment />
        <Security />
      </div>
      <div id="pricing">
        <PricingSection />
      </div>
      <div id="support">
        <Testimonial />
        <Launch />
      </div>

      <AnimatePresence>
        {showChatIcon && (
          <motion.div
            ref={chatIconRef}
            className="fixed bottom-4 right-4 z-50"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.2 }}
          >
            <Button onClick={toggleChat} size="icon" className="bg-blue-500 size-12 text-white rounded-full shadow-lg transition duration-300">
              {!isChatOpen ? <MessageCircle className="size-9" /> : <ArrowDownCircleIcon className="size-9" />}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className="fixed bottom-[70px] w-full md:right-2 lg:right-4 rounded-lg p-4 md:w-[500px] z-50"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.2 }}
          >
            <div className="border-2 rounded-lg bg-white">
              <div className="flex items-center justify-between bg-blue-50 border-b px-4 py-2 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-500 text-white p-2 mt-2 rounded-full">
                    <BotIcon className="size-5" />
                  </div>
                  <div className="text-base sm:text-lg font-semibold text-blue-700">
                    Money Wise AI Assistant
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={toggleChat}>
                  <X className="size-5 text-gray-600 hover:text-red-500 transition" />
                </Button>
              </div>

              <CardContent className="mt-2">
                <ScrollArea className="h-[350px] pr-4">
                  <div>
                    <div className="p-2 mb-2 flex gap-2 rounded-md max-w-xs bg-gray-100 text-black">
                      <Avatar>
                        <AvatarImage src="/icon.png" alt="AI" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      {"Welcome to Money Wise! I'm your virtual assistant. Let me know how I can support your financial journey."}
                    </div>

                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-2`}
                      >
                        <div
                          className={`p-2 rounded-md max-w-xs flex gap-2 ${
                            message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-black"
                          }`}
                        >
                          <Avatar>
                            <AvatarImage src={message.role === "user" ? "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740" : "/icon.png"} />
                            <AvatarFallback>{message.role === "user" ? "You" : "AI"}</AvatarFallback>
                          </Avatar>
                          <div>
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                code({ node, inline, className, children, ...props }) {
                                  return inline ? (
                                    <code className="bg-gray-200 rounded-md px-1 py-0.5" {...props}>{children}</code>
                                  ) : (
                                    <pre className="bg-gray-200 rounded-md p-4 overflow-auto">
                                      <code className={className} {...props}>{children}</code>
                                    </pre>
                                  );
                                },
                                ul: ({ children }) => <ul className="list-disc pl-5">{children}</ul>,
                                ol: ({ children }) => <ol className="list-decimal pl-5">{children}</ol>,
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500" onClick={stop}>Loading...</p>
                      </div>
                    )}
                    {error && (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-red-500">{typeof error === "string" ? error : JSON.stringify(error)}</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="mt-2 mb-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                  className="flex w-full items-center space-x-2"
                >
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                    className="flex-1 text-black"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    size="icon"
                    className="bg-blue-500 text-white rounded-md size-9 hover:bg-blue-600 transition duration-300"
                  >
                    <Send className="size-5" />
                  </Button>
                </form>
              </CardFooter>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
