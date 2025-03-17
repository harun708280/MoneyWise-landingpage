import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div
      className="flex justify-center items-center h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/login-bg.jpg')", backgroundColor: "rgba(0, 0, 0, 0.6)", backgroundBlendMode: "darken" }}
    >
      <div className="bg-gray-200 rounded-xl">
        <SignIn 
          redirectUrl="/dashboard" // ✅ লগ ইন হলে Dashboard-এ যাবে
          signUpUrl="/sign-up" // ✅ Sign-up বাটন ক্লিক করলে /sign-up এ যাবে
          appearance={{
            layout: "fullscreen",
            elements: {
              formButtonPrimary: "!bg-blue-500 !hover:bg-blue-600 !text-white font-bold !py-2 px-6 rounded-lg !border-none !shadow-md 1transition-all !duration-300",
              footer: "!hidden", // 🔥 Clerk Footer Hide করা হলো
              termsPage: "!hidden",
            },
            
          }}
        />
        <div className="flex gap-2 py-2  justify-center text-center">
          <p className="text-gray-700">Don’t have an account?
          
          </p><Link href='/sign-up' className="font-semibold text-black hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
