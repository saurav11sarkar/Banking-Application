import Navbar from "@/components/shared/Navbar";
import Provider from "@/provider/Provider";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;
