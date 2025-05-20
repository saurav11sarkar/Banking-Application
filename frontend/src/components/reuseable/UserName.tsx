"use client";
import { useUser } from "@/contexts/UserContexts";
import React from "react";

const UserName = () => {
  const { user } = useUser();
  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10">
        Welcome, <span className="text-red-600">{user?.name}</span>
      </h1>
    </div>
  );
};

export default UserName;
