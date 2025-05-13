"use client";
import { Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="animate-spin h-10 w-10" />
      <h2 className="text-2xl font-bold">Loading...</h2>
    </div>
  );
};

export default Loader;
