"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { useRegisterUserMutation } from "@/redux/Api/userApi";

// In SyncUser.js
export default function SyncUser() {
    const { user, isSignedIn } = useUser();
    const dispatch = useDispatch();
    const [registerUser] = useRegisterUserMutation();

    useEffect(() => {
        const syncUser = async () => {
            if (isSignedIn && user) {
                try {
                    // Validate we have required data
                    if (!user.id || !user.emailAddresses?.[0]?.emailAddress) {
                        throw new Error("Missing required user data from Clerk");
                    }

                    const userData = {
                        
                        username: user.username || user.emailAddresses[0].emailAddress.split("@")[0],
                        email: user.emailAddresses[0].emailAddress,
                        photo: user.imageUrl,
                    };

                    const response = await registerUser(userData).unwrap();
                    dispatch(setUser(response));
                    
                } catch (error) {
                    console.error("User synchronization failed:", error);
                    // Add error handling (e.g., show toast notification)
                }
            }
        };

        syncUser();
    }, [isSignedIn, user, registerUser, dispatch]);
    
    return null;
}