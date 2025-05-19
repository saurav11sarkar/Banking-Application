import React from "react";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-500 w-16 h-16" />
        </div>
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your transaction has been completed
          successfully.
        </p>
        <Link
          href="/amount"
          className="inline-block px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
        >
          Go to page
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
