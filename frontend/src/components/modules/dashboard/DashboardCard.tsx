import { IDashboardData } from "@/types";
import Link from "next/link";
import React from "react";

const DashboardCard = ({ data }: { data: IDashboardData }) => {
  return (
    <Link href={data.link}>
      <div className="flex items-center justify-between p-6 rounded-xl shadow hover:shadow-lg transition duration-300 border border-gray-200 bg-white">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
          {data.icon}
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">{data.title}</p>
          <h2 className="text-2xl font-semibold text-gray-800">
            ₹{data.value}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default DashboardCard;
