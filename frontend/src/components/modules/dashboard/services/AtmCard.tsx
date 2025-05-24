"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
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
import AtmCardModel from "./AtmCardModel";
import { Button } from "@/components/ui/button";

type FormValues = {
  cardType: string;
};

const AtmCard = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      cardType: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Selected Card Type:", data);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        ATM Card Preferences
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row items-center sm:justify-between gap-4"
        >
          <FormField
            control={form.control}
            name="cardType"
            render={({ field }) => (
              <FormItem className="w-full ">
                
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a Card Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic Card</SelectItem>
                      <SelectItem value="classic">Classic Card</SelectItem>
                      <SelectItem value="platinum">Platinum Card</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                {/* <FormDescription /> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 bg-red-600 hover:bg-red-700 text-white"
          >
            Add Card
          </Button>
        </form>
      </Form>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2  gap-4 justify-center">
        <AtmCardModel />
      </div>
    </div>
  );
};

export default AtmCard;
