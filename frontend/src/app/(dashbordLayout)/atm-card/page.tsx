import AtmCard from "@/components/modules/dashboard/services/AtmCard";
import UserName from "@/components/reuseable/UserName";
import React from "react";

const AtmCardPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-sm px-6 py-4">
          <UserName />
        </div>
        <AtmCard />
      </div>
    </div>
  );
};

export default AtmCardPage;
