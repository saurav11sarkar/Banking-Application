"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { createFixDeposit, getAccountNumber } from "@/services/amount";
import { toast } from "sonner";

interface IsetAccountNumber {
  _id: string;
  total_balance: number;
}

const AddFixDeposit = () => {
  const [accountNumber, setAccountNumber] = useState<IsetAccountNumber | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FieldValues>({
    defaultValues: {
      account: "",
      apply_for: "",
      amount: "",
    },
  });

  const { setValue } = form;

  useEffect(() => {
    const handleAccountNumber = async () => {
      try {
        const response = await getAccountNumber();
        const accountData: IsetAccountNumber = response?.data;
        setAccountNumber(accountData);
        setValue("account", accountData?._id);
      } catch (error) {
        console.error("Failed to get account number", error);
      }
    };
    handleAccountNumber();
  }, [form.reset, setValue, isOpen]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const amount = parseInt(data?.amount);
    // const duration = parseInt(data.duration);
    const res = await createFixDeposit({ ...data, amount });

    if (res?.success) {
      toast.success(res.message);
      form.reset();
      setAccountNumber(null);
      setIsOpen(!isOpen);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          className="w-full flex items-center justify-center gap-2 text-red-500 border-red-300 border-2 hover:bg-red-50 transition rounded-xl py-3 px-4 font-medium"
        >
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">Add New Fixed Deposit</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Add New Fixed Deposit
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Earn 0.1% daily interest with CBI Bank.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="account"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={
                          accountNumber
                            ? `${
                                accountNumber._id
                              } - ₹${accountNumber.total_balance.toFixed(2)}/-`
                            : ""
                        }
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="apply_for"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apply Purpose</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter purpose" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        placeholder="Enter amount"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-red-700 hover:bg-red-800 text-white my-4"
              >
                Add Fixed Deposit
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFixDeposit;
