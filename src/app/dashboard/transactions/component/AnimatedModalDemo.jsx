"use client";
import React from "react";
import { BadgeDollarSignIcon, PlusCircle } from "lucide-react";
import { Modal, ModalBody, ModalContent, ModalTrigger } from "@/components/ui/animated-modal";
import AddTransaction from "../add/page";

export function AnimatedModalDemo() {
  return (
    <div className=" ">
      <Modal style={{ backgroundColor: 'white' }}>
        <ModalTrigger className="bg-gradient-to-r  from-blue-900 to-blue-500 cursor-pointer dark:text-black text-white flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500  rounded-md flex">
            <PlusCircle className="mr-2" /> Add condition
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            <BadgeDollarSignIcon />
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent className="bg-white"> 
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Add New Transaction <span className="px-1 py-0.5 rounded-md bg-gray-100 ">Bali</span> now! ✈️
            </h4>
            <AddTransaction />
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}