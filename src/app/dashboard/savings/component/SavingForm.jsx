'use client';
import { useGetUserByEmailQuery } from '@/redux/Api/userApi';
import { useUser } from '@clerk/nextjs';
import React, { useState, useEffect, Fragment } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Loading from '../../transactions/loading';
import { useUserSavingMutation } from '@/redux/Api/savingApi';
import { toast } from 'sonner';
import { Dialog, Transition } from '@headlessui/react';

const UserSavingsForm = ({isOpen, setIsOpen}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const { user, isSignedIn } = useUser();
  const userEmail = user?.emailAddresses?.[0]?.emailAddress || null;

  const [userData, setUserData] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isUserError, setIsUserError] = useState(false);
  

  const {
    data: userDataQuery,
    isLoading: isUserDataLoading,
    isError: isUserDataError,
  } = useGetUserByEmailQuery(userEmail, {
    skip: !userEmail,
  });

  const [
    userSaving,
    { isLoading: isSavingLoading, isSuccess, isError: isSavingError, error },
  ] = useUserSavingMutation();

  useEffect(() => {
    if (userDataQuery) {
      setUserData(userDataQuery);
      setIsUserLoading(false);
      setIsUserError(false);
    } else if (isUserDataError) {
      setIsUserLoading(false);
      setIsUserError(true);
    } else if (!userEmail) {
      setIsUserLoading(false);
      setIsUserError(false);
    }
  }, [userDataQuery, isUserDataError, userEmail]);

  if (!isSignedIn || isUserLoading) {
    return <Loading />;
  }

  if (isUserError) {
    return <p className="text-red-500">Error fetching user data.</p>;
  }

  const categories = [
    'Emergency Fund',
    'Travel',
    'Education',
    'Home/Car',
    'Others',
  ];

  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmit = async (data) => {
    const savingData = {
      userId: userDataQuery._id,
      accountName: data.accountName,
      category: data.category,
      targetAmount: data.targetAmount,
      reason: data.reason,
      startDate: data.startDate,
      endDate: data.endDate,
      recurring: data.recurring,
    };

    try {
      const response = await userSaving(savingData);
      if (response?.data) {
        toast.success('Saving goal added successfully!');
        reset();
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Error submitting saving goal:', error);
      toast.error('Error submitting saving goal. Please try again.');
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
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
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl  p-6 text-left align-middle shadow-xl transition-all">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-xl text-gray-700 mx-auto p-6 bg-white rounded-md shadow-md"
                >
                  <h2 className="text-2xl text-gray-800 font-semibold mb-4 text-center">
                    Add Savings Goal
                  </h2>

                  <div className="mb-4">
                    <label
                      htmlFor="accountName"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Account Name
                    </label>
                    <Controller
                      name="accountName"
                      control={control}
                      rules={{ required: 'Enter an account name' }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="w-full p-2 border rounded-md"
                        />
                      )}
                    />
                    {errors.accountName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.accountName.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="category"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Savings Category:
                    </label>
                    <Controller
                      name="category"
                      control={control}
                      rules={{ required: 'Select a category' }}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="">Select Category</option>
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    {errors.category && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.category.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="targetAmount"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Target Amount:
                    </label>
                    <Controller
                      name="targetAmount"
                      control={control}
                      rules={{ required: 'Enter a target amount', pattern: /^[0-9]+$/ }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="number"
                          className="w-full p-2 border rounded-md"
                        />
                      )}
                    />
                    {errors.targetAmount && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.targetAmount.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="reason"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Reason:
                    </label>
                    <Controller
                      name="reason"
                      control={control}
                      rules={{ required: 'Enter a reason' }}
                      render={({ field }) => (
                        <textarea
                          {...field}
                          className="w-full p-2 border rounded-md"
                        />
                      )}
                    />
                    {errors.reason && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.reason.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="startDate"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Start Date:
                    </label>
                    <Controller
                      name="startDate"
                      control={control}
                      rules={{ required: 'Select a start date' }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="date"
                          className="w-full p-2 border rounded-md"
                        />
                      )}
                    />
                    {errors.startDate && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.startDate.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="endDate"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      End Date:
                    </label>
                    <Controller
                      name="endDate"
                      control={control}
                      rules={{ required: 'Select an end date' }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="date"
                          className="w-full p-2 border rounded-md"
                        />
                      )}
                    />
                    {errors.endDate && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.endDate.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="recurring"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Recurring Savings:
                    </label>
                    <Controller
                      name="recurring"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="no">No</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      )}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSavingLoading}
                    className={`w-full mb-4 bg-gradient-to-r from-blue-900 to-blue-500 text-white font-bold py-2 px-4 rounded-md ${
                      isSavingLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSavingLoading ? 'Adding Goal...' : 'Add Goal'}
                  </button>
                  {isSavingError && (
                    <p className="text-red-500 text-sm mt-2">
                      Error adding goal. Please try again.
                    </p>
                  )}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UserSavingsForm;