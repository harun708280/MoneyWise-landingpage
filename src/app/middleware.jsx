import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/sign-in(.*)", "/sign-up(.*)"], // Sign-in এবং Sign-up Middleware থেকে বের করা
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"], // সব রুট Middleware ফিল্টার করবে
};
