"use client";

import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import AtmCardModel from "./AtmCardModel";
import { createATMCard, getAccountNumber, getATMCard } from "@/services/amount";
import { toast } from "sonner";

interface IsetAccountNumber {
  _id: string;
  total_balance: number;
}

const AtmCard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [accountNumber, setAccountNumber] = useState<IsetAccountNumber | null>(
    null
  );
  const [cardLoader, setCardLoader] = useState(false);

  const form = useForm({
    defaultValues: {
      account: "",
      cardType: "",
      pin: "",
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
  }, [form.reset, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await createATMCard(data);

    if (res?.success) {
      toast.success(res?.message);
      setCardLoader((prev) => !prev);
      form.reset();
    } else {
      toast.error(res?.message);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-2xl max-w-6xl mx-auto my-8">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
        Create Your ATM Card
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Account Number Field */}
          <FormField
            control={form.control}
            name="account"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Account Number</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter account number"
                    className="focus:ring-2 focus:ring-red-500 text-xs"
                    {...field}
                    value={accountNumber ? `${accountNumber._id} ` : ""}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Card Type Select */}
          <FormField
            control={form.control}
            name="cardType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Card Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full focus:ring-2 focus:ring-red-500">
                      <SelectValue placeholder="Choose a Card Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic Card</SelectItem>
                      <SelectItem value="classic">Classic Card</SelectItem>
                      <SelectItem value="platinum">Platinum Card</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PIN Field */}
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">PIN</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="pr-10"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••"
                      {...field}
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 h-auto"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="flex items-end">
            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white text-base py-2 rounded-lg"
            >
              Create Card
            </Button>
          </div>
        </form>
      </Form>

      {/* Card Preview */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-gray-700  text-center">
          Card Preview
        </h3>
        <div className="flex justify-center items-center">
          <AtmCardModel cardLoader={cardLoader} setCardLoader={setCardLoader} />
        </div>
      </div>
    </div>
  );
};

export default AtmCard;
