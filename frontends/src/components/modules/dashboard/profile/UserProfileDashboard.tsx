"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Upload } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContexts";
import { updateProfile } from "@/services/auth";
import { toast } from "sonner";

type FormValues = {
  name: string;
  phone: string;
  address: string;
};

const UserProfileDashboard = () => {
  const { user } = useUser();
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
      });
      setImagePreview(user.image || null);
    }
  }, [user, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(user?.image || null);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      if (image) formData.append("image", image);

      const result = await updateProfile(formData);
      if (result?.success) {
        toast.success(result.message);
        form.reset(data);
        setImage(null);
      } else {
        toast.error(result?.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6 md:py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-10">User Profile Dashboard</h1>

      <Card className="mb-10 shadow-lg rounded-xl">
        <CardContent className="flex flex-col sm:flex-row items-center gap-6 p-6">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32">
            <Image
              src={imagePreview || "https://github.com/shadcn.png"}
              alt="User Avatar"
              width={128}
              height={128}
              className="rounded-full object-cover border-2 border-red-500 w-full h-full"
              priority
            />
          </div>
          <div className="text-center sm:text-left space-y-2">
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-600"><strong>Email:</strong> {user.email}</p>
            <p className="text-sm text-gray-600"><strong>Phone:</strong> {user.phone || "Not provided"}</p>
            <p className="text-sm text-gray-600"><strong>Account Type:</strong> {user.accountType}</p>
            <p className="text-sm text-gray-600"><strong>Address:</strong> {user.address || "Not provided"}</p>
            {user.updatedAt && (
              <p className="text-xs text-gray-500">Last updated: {new Date(user.updatedAt).toLocaleDateString()}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="flex gap-2 justify-center mb-6 flex-wrap">
          <TabsTrigger value="settings">Profile Settings</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <Card className="shadow-md rounded-xl">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6">Update Profile</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter your full address"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <FormLabel>Profile Image</FormLabel>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {imagePreview && (
                        <div className="relative w-24 h-24 sm:w-32 sm:h-32">
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            width={128}
                            height={128}
                            className="object-cover rounded-md border w-full h-full"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute -top-2 -right-2 bg-white shadow-sm rounded-full"
                            aria-label="Remove image"
                          >
                            <X className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      )}
                      <div>
                        <label
                          htmlFor="imageUpload"
                          className="cursor-pointer border-dashed border px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm inline-flex items-center gap-2"
                        >
                          <Upload className="w-4 h-4" />
                          {imagePreview ? "Change Image" : "Upload Image"}
                        </label>
                        <Input
                          id="imageUpload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Recommended: 500x500px, JPG/PNG
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
                    >
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card className="p-6">
            <p className="text-gray-600 text-sm">Recent activity feature coming soon...</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfileDashboard;
