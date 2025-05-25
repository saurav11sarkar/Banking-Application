// app/dashboard/page.tsx or a React component

"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const UserProfileDashboard = () => {
  const [user] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+880 123-456-7890",
    role: "User",
    avatar: "https://i.pravatar.cc/150?img=32",
    joined: "January 2024",
  });

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        User Profile Dashboard
      </h1>

      {/* Profile Card */}
      <Card className="mb-10">
        <CardContent className="flex flex-col sm:flex-row items-center gap-6 p-6">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover border-2 border-red-500"
          />
          <div>
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-500">📞 {user.phone}</p>
            <p className="text-sm text-gray-500">🎓 Role: {user.role}</p>
            <p className="text-sm text-gray-500">🗓 Joined: {user.joined}</p>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Details */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="flex justify-center mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Overview</h3>
              <p className="text-gray-600">This section gives a general summary of your profile.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-semibold mb-4">Update Info</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input placeholder="Full Name" defaultValue={user.name} />
                <Input placeholder="Email Address" defaultValue={user.email} />
                <Input placeholder="Phone" defaultValue={user.phone} />
                <Input placeholder="Role" defaultValue={user.role} />
              </div>
              <Button className="mt-4 bg-red-600 hover:bg-red-700">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>Logged in from Chrome on Windows 10</li>
                <li>Changed profile picture</li>
                <li>Updated PIN for ATM card</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfileDashboard;
