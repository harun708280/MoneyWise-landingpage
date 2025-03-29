import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateSavingMutation } from "@/redux/Api/savingApi";

const TnxAddModal = ({ isOpen, setIsOpen, id }) => {
  const [updateSaving, { isLoading: isUpdating }] = useUpdateSavingMutation();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  console.log(id);

  const onSubmit = async (data) => {
    try {
      if (!id) {
        toast.error("Saving goal ID is missing.");
        return;
      }
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
      <Dialog
        as="div"
        className="relative z-30 text-gray-700"
        onClose={() => setIsOpen(false)}
      >
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
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add Transaction
                </Dialog.Title>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                  <div className="mb-4">
                    <label
                      htmlFor="amount"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Amount
                    </label>
                    <Controller
                      name="amount"
                      control={control}
                      rules={{ required: "Amount is required", pattern: /^[0-9]+$/ }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="number"
                          value={field.value ?? ""}
                          className="w-full p-2 border rounded-md"
                        />
                      )}
                    />
                    {errors.amount && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.amount.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="date"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
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
                    {errors.date && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.date.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="bg-gray-200 px-4 py-2 rounded-md text-gray-900 hover:bg-gray-300"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
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
