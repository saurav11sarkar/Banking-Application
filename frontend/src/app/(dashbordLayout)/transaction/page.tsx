"use client";

import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { allOrdersTransaction } from "@/services/amount";
import UserName from "@/components/reuseable/UserName";

export type Payment = {
  id: string;
  date: string;
  name?: string;
  email: string;
  transaction_id: string;
  amount: number;
  source: "order" | "claimed" | "unclaimed";
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "date",
    header: "Date & Time",
    cell: ({ row }) => (
      <span className="text-sm text-gray-700">{row.getValue("date")}</span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">{row.getValue("email")}</span>
    ),
  },
  {
    accessorKey: "transaction_id",
    header: "Transaction ID",
    cell: ({ row }) => (
      <span className="text-xs font-mono text-blue-600 break-all">
        {row.getValue("transaction_id")}
      </span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount (₹)",
    cell: ({ row }) => (
      <span className="text-sm font-semibold text-green-700">
        ₹{row.getValue("amount")}
      </span>
    ),
  },
];

const TransactionPage = () => {
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await allOrdersTransaction();

        const orders: Payment[] = response?.data?.orders.map((order: any) => ({
          id: order._id,
          email: order.userId?.email || "N/A",
          transaction_id: order.tranjectionId,
          amount: order.amount,
          date: new Date(order.createdAt).toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
          source: "order",
        }));

        const claimed: Payment[] = response?.data?.fixDeposits?.claimed.map(
          (deposit: any) => ({
            id: deposit._id,
            email: deposit.user?.email || "N/A",
            transaction_id: deposit._id,
            amount: deposit.amount,
            date: new Date(deposit.createdAt).toLocaleString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
            source: "claimed",
          })
        );

        const unclaimed: Payment[] = response?.data?.fixDeposits?.unclaimed.map(
          (deposit: any) => ({
            id: deposit._id,
            email: deposit.user?.email || "N/A",
            transaction_id: deposit._id,
            amount: deposit.amount,
            date: new Date(deposit.createdAt).toLocaleString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
            source: "unclaimed",
          })
        );

        setData([...orders, ...claimed, ...unclaimed]);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchData();
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const getRowColor = (source: Payment["source"]) => {
    switch (source) {
      case "order":
        return "bg-red-50";
      case "claimed":
        return "bg-yellow-50";
      case "unclaimed":
        return "bg-green-50";
      default:
        return "";
    }
  };

  const getTooltipText = (source: Payment["source"]) => {
    switch (source) {
      case "order":
        return "Order Transaction";
      case "claimed":
        return "Claimed Fixed Deposit";
      case "unclaimed":
        return "Unclaimed Fixed Deposit";
      default:
        return "";
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen">
      <UserName />
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Transaction History
        </h2>

        <div className="w-full overflow-x-auto">
          <Table className="min-w-[700px] text-sm">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="bg-gray-100 text-gray-700 font-semibold px-4 py-3 text-left"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => {
                  const source = row.original.source;
                  const tooltip = getTooltipText(source);
                  const bgColor = getRowColor(source);

                  return (
                    <TableRow
                      key={row.id}
                      className={`group transition-all duration-200 hover:bg-opacity-80 ${bgColor}`}
                    >
                      {row.getVisibleCells().map((cell, idx) => (
                        <TableCell key={cell.id} className="px-4 py-3 relative">
                          {idx === 0 && (
                            <div className="absolute -top-6 left-0 hidden group-hover:flex items-center bg-black text-white text-xs rounded px-2 py-1 z-10 shadow">
                              {tooltip}
                            </div>
                          )}
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-gray-500"
                  >
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
