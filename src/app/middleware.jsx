import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/"], // শুধু home public
});

export const config = {
  matcher: ["/((?!_next|.*\\..*|api).*)"],
};
