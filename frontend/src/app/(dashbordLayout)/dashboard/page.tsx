import DashboardCard from "@/components/modules/dashboard/DashboardCard";
import { IDashboardData } from "@/types";
import { CircleDollarSign, CreditCard, HandCoins, IdCard } from "lucide-react";
import React from "react";

const Dashboard = () => {
  const dashboardData: IDashboardData[] = [
    {
      title: "Amount",
      icon: <CircleDollarSign className="w-6 h-6 text-yellow-500" />,
      value: 45,
      link: "/amount",
    },
    {
      title: "Fixed Deposit",
      icon: <HandCoins className="w-6 h-6 text-rose-500" />,
      value: 40,
      link: "/fixed-deposit",
    },
    {
      title: "ATM Card",
      icon: <IdCard className="w-6 h-6 text-indigo-500" />,
      value: 2,
      link: "/atm-card",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10">
          Welcome, <span className="text-red-600">Saurav Sarkar</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardData.map((currentData, index) => (
            <DashboardCard key={index} data={currentData} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
