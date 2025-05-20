import DashboardCard from "@/components/modules/dashboard/DashboardCard";
import UserName from "@/components/reuseable/UserName";
import { getAccount } from "@/services/amount";
import { IDashboardData } from "@/types";
import { CircleDollarSign,  HandCoins, IdCard } from "lucide-react";

const Dashboard = async () => {
  const response = await getAccount();

  const dashboardData: IDashboardData[] = [
    {
      title: "Amount",
      icon: <CircleDollarSign className="w-6 h-6 text-yellow-500" />,
      value: response.data?.total_balance || 0,
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
        <UserName />
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
