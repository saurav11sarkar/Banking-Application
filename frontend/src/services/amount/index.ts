"use server";

export const addAmount = async (amount: number) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order`, {
      method: "POST",
      body: JSON.stringify({amount}),
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};
