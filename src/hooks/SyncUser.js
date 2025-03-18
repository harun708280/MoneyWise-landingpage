"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useDispatch } from "react-redux";
import { logoutUser, setUser } from "@/redux/userSlice";

export default function SyncUser() {
  const { user, isSignedIn } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSignedIn && user) {
      dispatch(
        setUser({
          id: user.id,
          username: user.username || user.emailAddresses[0]?.emailAddress.split("@")[0],
          email: user.emailAddresses[0]?.emailAddress,
          photo: user.imageUrl,
        })
      );
    } else {
      dispatch(logoutUser()); 
    }
  }, [isSignedIn, user, dispatch]);

  return null;
}
