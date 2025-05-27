import Navbar from "@/components/shared/Navbar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      {/* Padding top to offset the fixed navbar height */}
      <main className="flex-grow pt-20 px-4 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
};

export default MainLayout;
