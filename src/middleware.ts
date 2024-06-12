import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = [
  "/", //Define user protected routes
];
export default function middleware(req: any) {
  const cookieStore = cookies();
  const userToken = cookieStore.get("token")?.value;
  if (!userToken && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/login", req.nextUrl.origin); //If user is not logged in or token can't be found, redirect to login.
    return NextResponse.redirect(absoluteURL.toString());
  }
}
