"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { addAmount } from "@/services/amount";
import { CircleDollarSign, Loader2, Plus } from "lucide-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const AddAmount = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm({ mode: "onChange" });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await addAmount(data); // convert to number
      if (res?.success) {
        // toast.success(res.message);
        window.location.href = res.data.url;
        // reset();
      } else {
        toast.error(res.message || "Failed to process payment.");
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="gap-2 "
        >
          <Plus className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Amount</DialogTitle>
          <DialogDescription className="sr-only">
            Add an amount and click the button to submit.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center gap-3"
        >
          <div className="flex items-center gap-2 w-full relative">
            <span className="absolute left-3 text-gray-500">
              <CircleDollarSign className="w-4 h-4" />
            </span>
            <Input
              placeholder="Enter Amount"
              type="number"
              min={1}
              {...register("amount", {
                required: true,
                min: { value: 1, message: "Amount must be at least 1" },
              })}
              className="pl-8 w-full"
            />
          </div>

          <Button
            disabled={!isValid || !isDirty}
            type="submit"
            className="shrink-0"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              "Add"
            )}
          </Button>
        </form>

        {errors.amount && (
          <p className="text-sm text-red-500 ">
            {errors.amount.message as string}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddAmount;
