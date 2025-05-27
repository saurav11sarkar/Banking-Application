"use client";
import { Button } from "@/components/ui/button";
import { clientFixDeposit } from "@/services/amount";
import { IFixDeposit } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface Props {
  dipositData: IFixDeposit;
}

const FixDepositCard = ({ dipositData }: Props) => {
  const router = useRouter();
  const handleClineId = async (id: string) => {
    const res = await clientFixDeposit(id);
    if (res.success) {
      toast.success(res.message);
      router.refresh();
    } else {
      toast.error(res.message);
    }
  };
  return (
    <div className="w-full p-6 bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-gray-800">
          {dipositData?.apply_for}
        </h2>
        <p className="text-sm text-gray-500">
          created: {dipositData?.createdAt.split("T")[0]}
        </p>

        {/* Example deposit info */}
        <div className="mt-4 space-y-1">
          <p className="text-sm">
            <span className="font-medium text-gray-600">Amount:</span> ₹
            {dipositData?.amount}
          </p>
          {/* <p className="text-sm">
            <span className="font-medium text-gray-600">Duration:</span>{" "}
            {dipositData?.duration} Months
          </p> */}
          <p className="text-sm">
            <span className="font-medium text-gray-600">Interest:</span>{" "}
            {dipositData?.interestRate}% p.a.
          </p>
          <p className="text-sm">
            <span className="font-medium text-gray-600">Interest Amount:</span>{" "}
            ₹{dipositData?.total_amount}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <Button
            onClick={()=>handleClineId(dipositData?._id)}
            variant="outline"
            className="w-full"
          >
            Claim
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FixDepositCard;
