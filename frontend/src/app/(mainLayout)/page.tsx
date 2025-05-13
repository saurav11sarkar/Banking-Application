"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContexts";

import React from "react";

const HomePage = () => {
  const { user } = useUser();
  console.log(user);
  return (
    <div>
      <h2>Home Page</h2>
      <Button>Click me {user?.email}</Button>
      <h2>{user?.name}</h2>
    </div>
  );
};

export default HomePage;
