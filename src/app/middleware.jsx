import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Ei route gula public — mane login na korleo jete parbe
const isPublicRoute = createRouteMatcher([
  '/',               // Home page
  '/sign-in(.*)',    // Sign in page
  '/sign-up(.*)',    // Sign up page
])

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    // Public na hole, mane onno kono page hole — login check korbe
    return auth().protect();
  }
});

export const config = {
  matcher: [
    // Static file, next.js internal route chara sob kichu ke protect korbo
    '/((?!_next|.*\\..*).*)',
    '/(api|trpc)(.*)', // API route gulo always match korbe
  ],
};
