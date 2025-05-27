import React from "react";
import { XCircle } from "lucide-react";
import Link from "next/link";

const FailPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
        <div className="flex justify-center mb-6">
          <XCircle className="text-red-500 w-16 h-16" />
        </div>
        <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h1>
        <p className="text-gray-600 mb-6">
          Oops! Something went wrong with your transaction. Please try again or contact support.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/amount"
            className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
          >
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FailPage;
