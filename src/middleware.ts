import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyemail";
  const token = req.cookies.get("nexttoken")?.value || "";
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", req.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
}

export const config = {
  matcher: [
    "/",
    "/profile",
    "/profile/:id*",
    "/login",
    "/signup",
    "/dashboard",
    "/verifyemail",
  ],
};
