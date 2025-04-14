// "use client";

// import { saveUser } from "@/app/actions/saveUser";
// import { useAuth, useUser } from "@clerk/nextjs";
// import { useEffect } from "react";

// export function SaveUserToDB() {
//   const { isSignedIn } = useAuth();
//   const { user } = useUser();

//   useEffect(async () => {
//     if (isSignedIn && user) {
//       try {
//         const response = await registerUser({
//           username:
//             user.username || user.emailAddresses[0]?.emailAddress.split("@")[0],
//           email: user.emailAddresses[0]?.emailAddress,
//           photo: user.imageUrl,
//         });

//        

        
//       } catch (error) {
//         console.error("Error registering user:", error);
//       }
//     }
//   }, [isSignedIn, user]);
// }
