import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { currentUser } from "./lib/helpers/getTokenData";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/signin" || path === "/signup";

  const token = request.cookies.get("token")?.value || "";

  if (path !== "/" && isPublicPath && token) {
    return NextResponse.redirect(new URL("/app/dashboard", request.url));
  }
  if (path !== "/" && !isPublicPath && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/signin", "/signup", "/workspace", "/app/:path*"],
};
