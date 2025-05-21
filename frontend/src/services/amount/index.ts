"use server";

import { revalidateTag } from "next/cache";
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
  revalidateTag("account");

  const response = await res.json();
  return response;
};

export const getAccount = async () => {
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/account`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["account"],
    },
  });

  const response = await res.json();
  return response;
};

export const allOrdersTransaction = async () => {
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/account/all-orders`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["account"],
      },
    }
  );

  const response = await res.json();
  return response;
};

export const getAccountNumber = async () => {
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/account/account-number`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["account"],
      },
    }
  );

  const response = await res.json();
  return response;
};

export const createFixDeposit = async (data: FieldValues) => {
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/fix-deposit/create`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  revalidateTag("account");

  const response = await res.json();
  return response;
};
