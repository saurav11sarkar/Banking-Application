"use client";
import LoaderPage from "@/components/reuseable/Loader";
import { useUser } from "@/contexts/UserContexts";
import React from "react";

const Dashboard = () => {
  const { user } = useUser();
  return (
    <div>
      {user ? (
        <div>
          <h1>Dashboard</h1>
        </div>
      ) : (
        <div>
          <LoaderPage />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
