'use client'
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

const UserSavingsForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const categories = [
    'Emergency Fund',
    'Travel',
    'Education',
    'Home/Car',
    'Others',
  ];

  const onSubmit = (data) => {
    console.log(data);
    alert('Savings goal added!');
    
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add Savings Goal</h2>

      <div className="mb-4">
        <label htmlFor="accountName" className="block text-gray-700 text-sm font-bold mb-2">Account Name</label>
        <Controller
          name="accountName"
          control={control}
          rules={{ required: 'Enter an account name' }}
          render={({ field }) => (
            <input {...field} type="text" className="w-full p-2 border rounded-md" />
          )}
        />
        {errors.accountName && <p className="text-red-500 text-xs mt-1">{errors.accountName.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Savings Category:</label>
        <Controller
          name="category"
          control={control}
          rules={{ required: 'Select a category' }}
          render={({ field }) => (
            <select {...field} className="w-full p-2 border rounded-md">
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          )}
        />
        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="targetAmount" className="block text-gray-700 text-sm font-bold mb-2">Target Amount:</label>
        <Controller
          name="targetAmount"
          control={control}
          rules={{ required: 'Enter a target amount', pattern: /^[0-9]+$/ }}
          render={({ field }) => (
            <input {...field} type="number" className="w-full p-2 border rounded-md" />
          )}
        />
        {errors.targetAmount && <p className="text-red-500 text-xs mt-1">{errors.targetAmount.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="reason" className="block text-gray-700 text-sm font-bold mb-2">Reason:</label>
        <Controller
          name="reason"
          control={control}
          rules={{ required: 'Enter a reason' }}
          render={({ field }) => (
            <textarea {...field} className="w-full p-2 border rounded-md" />
          )}
        />
        {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="startDate" className="block text-gray-700 text-sm font-bold mb-2">Start Date:</label>
        <Controller
          name="startDate"
          control={control}
          rules={{ required: 'Select a start date' }}
          render={({ field }) => (
            <input {...field} type="date" className="w-full p-2 border rounded-md" />
          )}
        />
        {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="endDate" className="block text-gray-700 text-sm font-bold mb-2">End Date:</label>
        <Controller
          name="endDate"
          control={control}
          rules={{ required: 'Select an end date' }}
          render={({ field }) => (
            <input {...field} type="date" className="w-full p-2 border rounded-md" />
          )}
        />
        {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="recurring" className="block text-gray-700 text-sm font-bold mb-2">Recurring Savings:</label>
        <Controller
          name="recurring"
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full p-2 border rounded-md">
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
        className="w-full mb-4 bg-gradient-to-r from-blue-900 to-blue-500 text-white font-bold py-2 px-4 rounded-md"
      >
        Add Goal
      </button>
    </form>
  );
};

export default UserSavingsForm;