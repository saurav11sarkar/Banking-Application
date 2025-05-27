import { NextRequest, NextResponse } from "next/server";

import { profile } from "./services/auth";
const publicRoutes = ["/login", "/register"];

const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const { data: userInfo } = await profile();
  // console.log(userInfo);
  if (!userInfo) {
    if (!publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard", "/profile", "/amount", "/fixed-deposit", "/transaction", "/atm-card", "/success/:tran_id", "/fail/:tran_id"],
};

export default middleware;
