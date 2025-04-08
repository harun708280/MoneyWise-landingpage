"use client";
import React from "react";
import { BadgeDollarSignIcon, PlusCircle } from "lucide-react";
import { Modal, ModalBody, ModalContent, ModalTrigger } from "@/components/ui/animated-modal";
import AddTransaction from "../add/page";
import { usePathname } from 'next/navigation';

export function AnimatedModalDemo() {
  const pathname = usePathname();
  const isAccountsPage = pathname === '/dashboard/accounts';

  return (
    <div className=" ">
      <Modal style={{ backgroundColor: 'white' }}>
        <ModalTrigger className={`${isAccountsPage ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-gradient-to-r from-blue-900 to-blue-500 text-white'} cursor-pointer dark:text-black flex justify-center group/modal-btn`}>
          <span className={`${isAccountsPage ? '' : 'group-hover/modal-btn:translate-x-40'} text-center transition duration-500 rounded-md flex`}>
            <PlusCircle className="mr-2" /> {isAccountsPage ? 'Deposit' : 'Add condition'}
          </span>
          {!isAccountsPage && (
            <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
              <BadgeDollarSignIcon />
            </div>
          )}
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