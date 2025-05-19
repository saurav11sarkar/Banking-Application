"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const addAmount = async (data: FieldValues) => {
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/order/addAmount`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const response = await res.json();
  return response;
};
