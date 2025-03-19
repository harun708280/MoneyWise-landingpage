"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { useRegisterUserMutation } from "@/redux/Api/userApi";

export default function SyncUser() {
  const { user, isSignedIn } = useUser(); 
  const dispatch = useDispatch();
  const [registerUser, { isSuccess, data }] = useRegisterUserMutation();

  
  const [hasRegistered, setHasRegistered] = useState(false);

  useEffect(() => {
    const syncUser = async () => {
      if (isSignedIn && user && !hasRegistered) {
        try {
          const response = await registerUser({
            
            username: user.username || user.emailAddresses[0]?.emailAddress.split("@")[0], 
            email: user.emailAddresses[0]?.emailAddress, 
            photo: user.imageUrl, 
          });

          console.log("User registration response:", response);

          if (response.data) {
            dispatch(setUser(response.data)); 
            setHasRegistered(true); 
          }
        } catch (error) {
          console.error("Error registering user:", error);
        }
      }
    };

    syncUser();
  }, [isSignedIn, user, registerUser, dispatch, hasRegistered]); 

  return null;
}
