"use client";
import { IDashboardData } from "@/types";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const DashboardCard = ({ data }: { data: IDashboardData }) => {
  const [isShow, setIsShow] = useState(false);

  const toggleShow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsShow(!isShow);
  };

  return (
    <Link href={data.link}>
      <div className="flex items-center justify-between gap-4 p-5 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition duration-300">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-indigo-50 text-indigo-600">
          {data.icon}
        </div>

        <div className="flex-1 text-right">
          <p className="text-sm text-gray-500">{data.title}</p>
          <div className="flex items-center justify-end mt-1 space-x-2">
            <h2 className="text-2xl font-semibold text-gray-800">
              {isShow ? `₹${data.value}` : ``.padStart(data.value.toString().length, "*")}
            </h2>
            <button
              onClick={toggleShow}
              className="text-indigo-900 hover:text-indigo-800 transition"
              aria-label={isShow ? "Hide amount" : "Show amount"}
            >
              {isShow ? (
                <EyeOffIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DashboardCard;
