import { Modal, ModalBody, ModalContent, ModalTrigger } from '@/components/ui/animated-modal';
import React from 'react';

const UpdateModalDemo = () => {
    return (
        <div className=" ">
        <Modal>
          <ModalTrigger
            className=" bg-blue-700 cursor-pointer dark:text-black text-white flex justify-center group/modal-btn">
            <span
              className="group-hover/modal-btn:translate-x-40 text-center transition duration-500   rounded-md flex">
             Add condition
            </span>
            <div
              className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
              <BadgeDollarSignIcon/>
            </div>
          </ModalTrigger>
          <ModalBody>
            <ModalContent>
              <h4
                className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                Add New Transaction{" "}
                <span
                  className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                  Bali
                </span>{" "}
                now! ✈️
              </h4>
              
                
                 
                    
                  
              
              
              
            </ModalContent>
  
          </ModalBody>
        </Modal>
      </div>
    );
};

export default UpdateModalDemo;