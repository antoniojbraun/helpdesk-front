import {
  NextAuthMiddlewareOptions,
  NextRequestWithAuth,
  withAuth,
} from "next-auth/middleware";

import { NextResponse } from "next/server";

export const isExpired = (expirationDate: string): boolean => {
  const now = new Date();
  const expiration = new Date(expirationDate);
  return now > expiration;
};

const middleware = (request: NextRequestWithAuth) => {
  // console.log("[MIDDLEWARE_NEXTAUTH_TOKEN]: ", request.nextauth.token);

  let userRole = JSON.stringify(request.nextauth.token?.role);

  const isAdmin = userRole === "2";
  const isSupport = userRole === "1";
  const isUser = userRole === "0";

  const isPrivateRoutes = request.nextUrl.pathname.startsWith("/dashboard");

  const isDefaultUrl =
    request.nextUrl.pathname == "/dashboard" ||
    request.nextUrl.pathname == "/dashboard/403";
  const isUserRoutes = request.nextUrl.pathname.startsWith("/dashboard/user");
  const isSupportRoutes =
    request.nextUrl.pathname.startsWith("/dashboard/support");

  let hasAccess = false;
  if (isPrivateRoutes) {
    if (isAdmin) {
      hasAccess = true;
    } else if ((isUser && isUserRoutes) || isDefaultUrl) {
      hasAccess = true;
    } else if ((isSupport && isSupportRoutes) || isDefaultUrl) {
      hasAccess = true;
    }
  }

  if (!hasAccess)
    return NextResponse.rewrite(new URL("/dashboard/403", request.url));
};

const callbackOptions: NextAuthMiddlewareOptions = {};

export default withAuth(middleware, callbackOptions);
export const config = {
  matcher: ["/dashboard/:path*", "/"],
};
