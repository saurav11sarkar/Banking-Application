"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

export const register = async (data: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    (await cookies()).set("token", result.data.token);
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const login = async (data: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    // console.log(result)
    (await cookies()).set("token", result.data);
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const res = (await cookies()).get("token")?.value;
    const decoded = jwtDecode(res as string);
    console.log(decoded);
    return decoded;
  } catch (error: any) {
    return Error(error);
  }
};

export const profile = async () => {
  try {
    const token = (await cookies()).get("token")?.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          revalidate: 0,
        },
      }
    );
    const result = await res.json();
    console.log(result);
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const logout = async () => {
  (await cookies()).delete("token");
};
