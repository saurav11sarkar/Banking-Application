import UserProfileDashboard from "@/components/modules/dashboard/profile/UserProfileDashboard";
import React from "react";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8 p-4">
        <UserProfileDashboard />
      </div>
    </div>
  );
};

export default ProfilePage;
