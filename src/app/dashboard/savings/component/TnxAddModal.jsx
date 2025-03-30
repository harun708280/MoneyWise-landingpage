import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateSavingMutation } from "@/redux/Api/savingApi";
import { X } from "lucide-react"; // Import Lucide's X icon

const TnxAddModal = ({ isOpen, setIsOpen, id, targetAmount }) => {
  const [updateSaving, { isLoading: isUpdating }] = useUpdateSavingMutation();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const [amountError, setAmountError] = useState(false);
  const amountValue = watch("amount", "");

  const onSubmit = async (data) => {
    if (parseFloat(data.amount) > targetAmount) {
      setAmountError(true);
      return;
    }
    setAmountError(false);

    try {
      await updateSaving({ id, ...data });
      toast.success("Transaction added successfully!");
      reset();
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating saving goal:", error);
      toast.error("Failed to update saving goal. Please try again.");
    }
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-30 text-gray-700" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="absolute top-4 right-4">
                  {/* Close Button (X icon) */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <X size={24} />
                  </button>
                </div>
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Add Transaction
                </Dialog.Title>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                  {/* Amount Field */}
                  <div className="mb-4">
                    <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
                      Amount
                    </label>
                    <Controller
                      name="amount"
                      control={control}
                      rules={{
                        required: "Amount is required",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Invalid amount",
                        },
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="number"
                          className={`w-full p-2 border rounded-md focus:outline-none transition ${
                            amountError ? "border-red-500" : "border-gray-300"
                          }`}
                          value={field.value ?? ""}
                          onChange={(e) => {
                            field.onChange(e);
                            setAmountError(parseFloat(e.target.value) > targetAmount);
                          }}
                        />
                      )}
                    />
                    {/* Blinking Error Message */}
                    {amountError && (
                      <p className="text-red-500 text-xs mt-1 animate-fade">
                        ⚠ Amount exceeds target limit!
                      </p>
                    )}
                  </div>

                  {/* Date Field */}
                  <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
                      Date
                    </label>
                    <Controller
                      name="date"
                      control={control}
                      rules={{ required: "Date is required" }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="date"
                          value={field.value ?? ""}
                          className="w-full p-2 border rounded-md"
                        />
                      )}
                    />
                    {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                  </div>

                  {/* Buttons */}
                  <div className="mt-4 flex justify-end">
                    <button
                      type="submit"
                      disabled={isUpdating}
                      className={`bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700 ${
                        isUpdating ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isUpdating ? "Adding..." : "Add"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TnxAddModal;
