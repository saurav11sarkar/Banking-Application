"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/services/auth";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContexts";

const Loginform = () => {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setIsLoading } = useUser();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      const res = await login(data);
      if (res.success) {
        toast.success(res.message);
        router.push("/");
        router.refresh();
        setIsLoading(false);
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 sm:p-10 bg-white rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="pr-10"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
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

            <Button type="submit" className="w-full">
              {form.formState.isSubmitting ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-950 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Loginform;
