'use client'

import React from 'react'
import { HelpCircle, User } from 'lucide-react'

const FaqSection = () => {
  const faqItems = [
    {
      question: 'How can I add a new expense in Money Wise?',
      answer:
        "Go to the 'Expenses' tab, click on 'Add Expense', fill in the amount, category, and note, then save it.",
    },
    {
      question: 'How do I track my monthly income?',
      answer:
        "Under the 'Income' section, click 'Add Income', input your source and amount, and submit.",
    },
    {
      question: 'Can I set a budget for specific categories?',
      answer:
        "Yes, go to the 'Budgets' section, choose a category like 'Food' or 'Transport', and set your budget limit.",
    },
    {
      question: 'Where can I see my savings progress?',
      answer:
        "Check the 'Savings Goals' tab — it shows your goal, how much you've saved, and how far you are.",
    },
    {
      question: 'Is my data safe and private?',
      answer:
        "Absolutely! All your financial data is securely stored and only accessible to you.",
    },
  ]



  return (
    <div className="bg-blue-600/6 py-12 rounded-md max-w-4xl mx-auto">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-blue-600 mb-8 text-center">
          <HelpCircle className="inline-block mr-2" /> Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <div key={index} className="space-y-2">
              {/* Question - left side */}
              <div className="flex justify-end">
                <div className="bg-blue-500 flex  text-white px-4 py-2 rounded-lg max-w-md shadow">
                <div className="bg-blue-500 rounded-full h-8 w-8 flex items-center justify-center mr-4">
                    <HelpCircle className="h-5 w-5 text-white" />
                  </div>  {item.question}
                </div>
              </div>
              {/* Answer - right side */}
              <div className="flex justify-start ">
                <div className="bg-gray-200 flex  gap-3  text-gray-800 px-4 py-2 rounded-lg max-w-[80%] shadow">
                <div className="bg-purple-600 rounded-full h-8 w-8 flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                   {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FaqSection
