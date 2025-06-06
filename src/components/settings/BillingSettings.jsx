// components/settings/BillingSettings.jsx
import React from "react";

export default function BillingSettings() {
  const userPlan = "Pro";
  const nextBillingDate = "July 15, 2025";
  const paymentMethod = "Visa •••• 4242";

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        Billing
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xl">
        Manage your plan, payment method, and invoices.
      </p>

      <div className="bg-white dark:bg-background-card border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Current Plan
            </div>
            <div className="text-base font-medium text-gray-800 dark:text-white">
              {userPlan}
            </div>
          </div>
          <button className="text-sm font-medium text-rose-500 hover:underline">
            Change Plan
          </button>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Next Billing Date
            </div>
            <div className="text-base text-gray-800 dark:text-white">
              {nextBillingDate}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Payment Method
            </div>
            <div className="text-base text-gray-800 dark:text-white">
              {paymentMethod}
            </div>
          </div>
          <button className="text-sm font-medium text-rose-500 hover:underline">
            Update
          </button>
        </div>

        <div>
          <button className="text-sm font-medium text-rose-500 hover:underline">
            View Invoices
          </button>
        </div>
      </div>
    </div>
  );
}
