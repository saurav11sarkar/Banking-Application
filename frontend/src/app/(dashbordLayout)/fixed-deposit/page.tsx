import AddFixDeposit from "@/components/modules/dashboard/services/AddFixDeposit";
import FixDepositCard from "@/components/modules/dashboard/services/FixDepositCard";
import UserName from "@/components/reuseable/UserName";
import React from "react";

const FixedDepositPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <UserName />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example repeated card; replace with mapped data if available */}
          <FixDepositCard />
          <FixDepositCard />
          

          {/* Add Deposit Button Card */}
          <div className="flex flex-col justify-center items-center border border-dashed border-red-300 bg-white rounded-2xl p-6 shadow-sm hover:shadow transition duration-300">
            <AddFixDeposit />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedDepositPage;
