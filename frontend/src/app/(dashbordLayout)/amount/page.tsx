

import AddAmount from "@/components/modules/dashboard/services/AddAmount";
import { Badge } from "@/components/ui/badge";
import { getAccount } from "@/services/amount";

import React from "react";

const AmountPage = async () => {
  const response = await getAccount();

  return (
 
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10">
            Welcome, <span className="text-red-600">Saurav Sarkar</span>
          </h1>
          <div className="w-full sm:w-2/3 lg:w-1/3 border border-gray-300 rounded-xl p-6 bg-white shadow-sm flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold text-gray-800">Amount</h2>
              <p className="text-sm text-gray-500">
                Total amount:
                <Badge variant="outline" className="ml-2 bg-green-500 text-white">
                  ₹ {response.data?.total_balance || 0}/-
                </Badge>
              </p>
            </div>
            <AddAmount />
          </div>
        </div>
      </div>
    
  );
};

export default AmountPage;
