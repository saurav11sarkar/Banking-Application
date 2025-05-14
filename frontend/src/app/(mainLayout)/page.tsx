"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContexts";

import React from "react";

const HomePage = () => {
  const { user } = useUser();

  return (
    <div>
      <h2>Home Page</h2>
      <Button>Click me {user?.email}</Button>
    </div>
  );
};

export default HomePage;
