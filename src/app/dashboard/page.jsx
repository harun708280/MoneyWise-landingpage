"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Page from "./component/Dashboard";
import Loader from "@/components/global/Loader";

const MainDashboard = () => {
    const { userId, isLoaded } = useAuth(); // Clerk auth state
    const router = useRouter();
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        if (isLoaded) {
            if (!userId) {
                router.push("/sign-in"); 
            } else {
                setTimeout(() => { 
                    setLoading(false);
                }, 2000);
            }
        }
    }, [userId, isLoaded, router]);

    if (loading) {
        return <Loader/>; 
    }

    return (
        <div>
            <Page />
        </div>
    );
};

export default MainDashboard;
