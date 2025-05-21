"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const FixDepositCard = () => {
  return (
    <div className="w-full p-6 bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-gray-800">Fixed Deposit</h2>
        <p className="text-sm text-gray-500">Last updated: 2025-05-20</p>

        {/* Example deposit info */}
        <div className="mt-4 space-y-1">
          <p className="text-sm">
            <span className="font-medium text-gray-600">Amount:</span> ₹50,000
          </p>
          <p className="text-sm">
            <span className="font-medium text-gray-600">Duration:</span> 12
            Months
          </p>
          <p className="text-sm">
            <span className="font-medium text-gray-600">Interest:</span> 6.5%
            p.a.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <Button variant="outline" className="w-full">
            Claim
          </Button>
         
        </div>
      </div>
    </div>
  );
};

export default FixDepositCard;
