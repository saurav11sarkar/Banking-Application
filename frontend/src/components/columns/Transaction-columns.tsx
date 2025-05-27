import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
  id: string;
  date: string;
  name?: string;
  email: string;
  transaction_id: string;
  amount: number;
  source: "order" | "claimed" | "unclaimed";
};

export const transactionColumns: ColumnDef<Payment>[] = [
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
